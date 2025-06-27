import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Response, StatusColumn } from './styles';

const publicRoutes = [
  { label: 'Health',        path: '/health'        },
  { label: 'Restaurantes',  path: '/restaurantes'  },
  { label: 'Ingredientes',  path: '/ingredientes'  },
  { label: 'Itens',         path: '/itens'         },
  { label: 'Marmitas',      path: '/marmitas'      },
] as const;

type RouteStatus = {
  label: string;
  ok: boolean | null;
  message: string;
};

export default function Status() {
  const [routeStatus, setRouteStatus] = useState<RouteStatus[]>(
    publicRoutes.map(r => ({
      label   : r.label,
      ok      : null,
      message : 'Carregando…',
    })),
  );

  useEffect(() => {
    const baseURL =
      import.meta.env.VITE_API_URL?.toString().replace(/\/$/, '') ||
      'http://localhost:8080';

    Promise.all(
      publicRoutes.map(async (route, idx) => {
        try {
          const res = await axios.get(`${baseURL}${route.path}`, { timeout: 10000 });
          const ok = res.status < 500;

          return {
            idx,
            ok,
            message:
              ok && res.status !== 200
                ? `Sem dados (${res.status})`
                : 'OK',
          };
        } catch (err: any) {
          const isTimeout = err?.code === 'ECONNABORTED';
          return {
            idx,
            ok      : false,
            message : isTimeout ? 'Timeout' : 'Erro',
          };
        }
      }),
    ).then(results =>
      setRouteStatus(prev =>
        prev.map((r, i) => {
          const res = results.find(res => res.idx === i)!;
          return { ...r, ok: res.ok, message: res.message };
        }),
      ),
    );
  }, []);

  return (
    <Container>
      <StatusColumn>
        <span>📍 Status das rotas</span>

        {routeStatus.map(({ label, ok, message }) => (
          <div key={label}>
            ● {label}:{' '}
            <Response $isError={ok === false}>
              {ok === null ? 'Carregando…' : message}
            </Response>
          </div>
        ))}
      </StatusColumn>
    </Container>
  );
}
