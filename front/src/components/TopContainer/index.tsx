import { useLocation } from "react-router-dom";
import { Container, Frase, Logo, LogoContainer } from "./styles";

export default function TopContainer() {
  const location = useLocation();

  return (
    <Container isHome={location.pathname === "/"}>
      {location.pathname === "/" ? 
      <>
        <Frase />
        <LogoContainer>
	  			<Logo />
  			</LogoContainer>
      </>
      : null }
      {location.pathname === "/restaurantes" ? <h1>Restaurantes</h1> : null}
      {location.pathname === "/meus-pedidos" ? <h1>Meus Pedidos</h1> : null}
      {location.pathname === "/contato" ? <h1>Contato</h1> : null}
      {location.pathname === "/sobre" ? <h1>Sobre</h1> : null}
      {location.pathname === "/status" ? <h1>Estatísticas e Status do Site</h1> : null}
    </Container>
  );
}
