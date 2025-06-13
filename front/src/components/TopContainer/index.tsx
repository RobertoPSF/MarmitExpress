import { useLocation, matchPath, useNavigate } from 'react-router-dom';
import { Container, Frase, Logo, StyledIcon } from './styles';

export default function TopContainer() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isCardapio = matchPath('/restaurante/:id/cardapio', path);
  const isDynamicPage =
    isCardapio ||
    matchPath('/meus-pedidos/:id', path) ||
    matchPath('/pedidos/:id', path) ||
    matchPath('/restaurante/:id', path);

  return (
    <Container $isHome={path === '/'} $isCardapio={!!isCardapio}>
      {path === '/' ? (
        <>
          <Frase />
          <Logo />
        </>
      ) : null}
      {path === '/restaurantes' ? <h1>Restaurantes</h1> : null}
      {path === '/meu-restaurante' ? <h1>Meu Restaurante</h1> : null}
      {path === '/meus-pedidos' ? <h1>Meus Pedidos</h1> : null}
      {path === '/pedidos' ? <h1>Pedidos do Restaurante</h1> : null}
      {path === '/contato' ? <h1>Contato</h1> : null}
      {path === '/about/parceiro' ? <h1>Como ser parceiro</h1> : null}
      {path === '/sobre' ? <h1>Sobre</h1> : null}
      {path === '/pagamento' ? <h1>Finalize seu pedido</h1> : null}
      {path === '/auth/parceiro' ? <h1>Login ou Cadastro do Parceiro</h1> : null}
      {path === '/status' ? <h1>Estatísticas e Status do Site</h1> : null}

      {isDynamicPage && (
        <button onClick={() => navigate(-1)}>
          <StyledIcon icon={'ion:arrow-back'} />
          <h1 style={{ margin: 0 }}>Voltar</h1>
        </button>
      )}
    </Container>
  );
}
