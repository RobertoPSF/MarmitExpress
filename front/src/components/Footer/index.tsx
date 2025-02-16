
import { Container, Link, Logo, LogoContainer, NavLinksContainer } from "./styles"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <NavLinksContainer>
        <LogoContainer>
          <Link href="/">
            <Logo />
          </Link>
          <p>© {currentYear} MarmitExpress</p>
        </LogoContainer>
        <p>Todos os direitos reservados</p>
        <Link href="/contato" >Contato</Link>
        <Link href="https://github.com/RobertoPSF/MarmitExpress/" target="_blank">Github</Link>
        <Link href="/sobre" >Sobre</Link>
        <Link href="/status" >Status</Link>
      </NavLinksContainer>
    </Container>
  )
}
