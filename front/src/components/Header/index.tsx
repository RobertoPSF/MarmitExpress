import { useState } from 'react';
import {
  Container,
  LinkComponent,
  Logo,
  StyledIcon,
  PopUpButton,
} from './styles';
import ClienteLoginPopup from '../PopUps/ClienteLoginPopUp';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <Container>
      <LinkComponent to={'/'}>
        <Logo />
        <p>MarmitExpress</p>
      </LinkComponent>

      <LinkComponent to="/restaurantes">
        <StyledIcon
          icon={'material-symbols:store-outline-rounded'}
          style={{ fontSize: 30 }}
        />
        <p>Restaurantes</p>
      </LinkComponent>

      <LinkComponent to="/meus-pedidos">
        <StyledIcon icon={'solar:bag-check-outline'} />
        <p>Meus Pedidos</p>
      </LinkComponent>

      <PopUpButton onClick={toggleLoginPopup}>
        <StyledIcon icon={'ph:user-bold'} />
        <p>Entrar / Cadastrar</p>
      </PopUpButton>

      {isLoginOpen && (
        <ClienteLoginPopup isOpen={isLoginOpen} onClose={toggleLoginPopup} />
      )}
    </Container>
  );
}
