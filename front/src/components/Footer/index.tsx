
import { Container, Link, Logo, LogoContainer, NavLinksContainer } from "./styles"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <NavLinksContainer>
        <LogoContainer>
          <a href="/">
            <Logo />
          </a>
          <p>© {currentYear} MarmitExpress</p>
        </LogoContainer>
        <p>Todos os direitos reservados</p>
        <Link href="/" >Contato</Link>
        <Link href="https://github.com/RobertoPSF/MarmitExpress/" target="_blank">Github</Link>
        <Link href="/" >Sobre</Link>
        <Link href="/" >Status</Link>
      </NavLinksContainer>
    </Container>
  )
}
