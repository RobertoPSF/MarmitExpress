import { Container, LinkComponent, Logo, LogoContainer, StyledIcon, TituloLogo } from "./styles";

export default function Header() {
  // Função de logout para quando o login estiver funcionando que redireciona para a home
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   window.location.href = '/';
  // };

  return (
    <Container>
      <LogoContainer>
        <LinkComponent to={'/'} className="logoContainer">
          <Logo />
          <TituloLogo>MarmitExpress</TituloLogo>
        </LinkComponent>
      </LogoContainer>
      <LinkComponent to="/restaurantes">
        <StyledIcon icon={"material-symbols:store-outline-rounded"} style={{fontSize:30}}/>
        Restaurantes
      </LinkComponent>
      <LinkComponent to="/meus-pedidos">
        <StyledIcon icon={"solar:bag-check-outline"} />
        Meus Pedidos
      </LinkComponent>
      <LinkComponent to="/auth/cliente">
        <StyledIcon icon={"ph:user-bold"}/>
        Entrar / Cadastrar
      </LinkComponent>
    </Container>
  );
}