import { useState } from 'react';
import {
  Container,
  LinkComponent,
  Logo,
  LogoContainer,
  StyledIcon,
  TituloLogo,
  PopUpButton,
} from './styles';
import ClienteLoginPopup from '../PopUps/ClienteLoginPopUp'; // Importando a pop-up de login

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <Container>
      <LogoContainer>
        <LinkComponent to={'/'} className="logoContainer">
          <Logo />
          <TituloLogo>MarmitExpress</TituloLogo>
        </LinkComponent>
      </LogoContainer>
      <LinkComponent to="/restaurantes">
        <StyledIcon
          icon={'material-symbols:store-outline-rounded'}
          style={{ fontSize: 30 }}
        />
        Restaurantes
      </LinkComponent>
      <LinkComponent to="/meus-pedidos">
        <StyledIcon icon={'solar:bag-check-outline'} />
        Meus Pedidos
      </LinkComponent>
      <PopUpButton onClick={toggleLoginPopup}>
        <StyledIcon icon={'ph:user-bold'} />
        Entrar / Cadastrar
      </PopUpButton>
      {isLoginOpen && (
        <ClienteLoginPopup isOpen={isLoginOpen} onClose={toggleLoginPopup} />
      )}
    </Container>
  );
}
