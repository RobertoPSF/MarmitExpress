import { useLocation } from 'react-router-dom';
import { Container, Frase, Logo } from './styles';

export default function TopContainer() {
  const location = useLocation();

  return (
    <Container $isHome={location.pathname === '/'}>
      {location.pathname === '/' ? (
        <>
          <Frase />
          <Logo />
        </>
      ) : null}
      {location.pathname === '/restaurantes' ? <h1>Restaurantes</h1> : null}
      {location.pathname === '/meu-restaurante' ? (
        <h1>Meu Restaurante</h1>
      ) : null}
      {location.pathname === '/meus-pedidos' ? <h1>Meus Pedidos</h1> : null}
      {location.pathname === '/pedidos' ? (
        <h1>Pedidos do Restaurante</h1>
      ) : null}
      {location.pathname === '/contato' ? <h1>Contato</h1> : null}
      {location.pathname === '/sobre' ? <h1>Sobre</h1> : null}
      {location.pathname === '/pagamento' ? <h1>Finalize seu pedido</h1> : null}
      {location.pathname === '/:id/cardapio' ? <h1>Opa</h1> : null}
      {location.pathname === '/auth/parceiro' ? (
        <h1>Página do Parceiro</h1>
      ) : null}
      {location.pathname === '/status' ? (
        <h1>Estatísticas e Status do Site</h1>
      ) : null}
    </Container>
  );
}
