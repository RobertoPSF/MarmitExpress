import { useState } from 'react';
import {
  Container,
  LinkComponent,
  Logo,
  StyledIcon,
  PopUpButton,
  DropdownMenu,
  DropdownItem,
  DropdownButton,
} from './styles';
import ClienteLoginPopup from '../PopUps/ClienteLoginPopUp';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem('authToken');

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
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

      {token ? ( // Se houver um token, mostra "Minha Conta"
        <div style={{ position: 'relative' }}>
          <PopUpButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <StyledIcon icon={'ph:user-bold'} />
            <p>Minha Conta</p>
          </PopUpButton>

          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownItem to="/perfil">Editar Perfil</DropdownItem>
              <DropdownItem to="/perfil">Trocar Senha</DropdownItem>
              <DropdownButton as="button" onClick={handleLogout}>
                Sair
              </DropdownButton>
            </DropdownMenu>
          )}
        </div>
      ) : (
        <PopUpButton onClick={toggleLoginPopup}>
          <StyledIcon icon={'ph:user-bold'} />
          <p>Entrar / Cadastrar</p>
        </PopUpButton>
      )}

      {isLoginOpen && (
        <ClienteLoginPopup isOpen={isLoginOpen} onClose={toggleLoginPopup} />
      )}
    </Container>
  );
}
