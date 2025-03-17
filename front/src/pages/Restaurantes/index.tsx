import { useState, useEffect } from 'react';
import SidebarFiltros from '../../components/SideBarRestaurantsFilter';
import CardRestaurante from '../../components/Cards/RestauranteCard';
import { Container, DivRestaurantes } from './styles';
import { NavLink } from 'react-router-dom';
import restaurante from '../../data/restaurantes.json';

const restaurantesMock = restaurante;

interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  chavePix: string;
  itens: { id: string; nome: string; preco: number; quantidade: number }[];
  pedidos: {
    id: string;
    clienteId: string;
    status: string;
    dataHora: string;
    valorTotal: number;
    itens: { produtoId: string; quantidade: number; precoUnitario: number }[];
  }[];
}

export default function Restaurantes() {
  const [filtros, setFiltros] = useState({
    area: '',
    precoMin: 0,
    precoMax: 999,
    cozinha: '',
  });
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simula um delay para carregar os dados (caso necessário)
    setTimeout(() => {
      try {
        setRestaurantes(restaurantesMock); // Agora os dados são passados corretamente
      } catch (err) {
        setError('Erro ao carregar restaurantes');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  // Filtra os restaurantes de acordo com os filtros aplicados
  const filteredRestaurants = restaurantes.filter((r) => {
    return;
    // (!filtros.area || r.endereco.includes(filtros.area)) &&
    //   (!filtros.cozinha || r.descricao.includes(filtros.cozinha)) &&
    //   r.preco >= (filtros.precoMin || 0) &&
    //   r.preco <= (filtros.precoMax || 999);
  });

  if (isLoading)
    return (
      <Container>
        <p style={{ color: 'white' }}>Carregando restaurantes...</p>
      </Container>
    );
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <SidebarFiltros setFiltros={setFiltros} />
      <DivRestaurantes>
        {restaurantes.length > 0 ? (
          restaurantes.map((restaurante) => (
            <NavLink
              style={{ height: '120px' }}
              key={restaurante.id}
              to={`/restaurante/${restaurante.id}/cardapio`}
            >
              <CardRestaurante dados={restaurante} />
            </NavLink>
          ))
        ) : (
          <p>Não existem Restaurantes cadastrados.</p>
        )}
      </DivRestaurantes>
    </Container>
  );
}
