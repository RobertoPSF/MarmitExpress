import { useEffect, useRef, useState } from 'react';
import {
  Container,
  LinkComponent,
  Logo,
  StyledIcon,
  PopUpButton,
  DropdownMenu,
  DropdownButton,
  InvisibleDiv,
} from './styles';
import ClienteLoginPopUp from '../PopUps/ClienteLoginPopUp';
import EditProfilePopUp from '../PopUps/EditProfilePopUp';
import ChangePasswordPopUp from '../PopUps/ChangePasswordPopUp';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem('authToken');

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleLoginPopup = () => setIsLoginOpen(!isLoginOpen);
  const toggleEditProfilePopup = () => setIsEditProfileOpen(!isEditProfileOpen);
  const toggleChangePasswordPopup = () => setIsChangePasswordOpen(!isChangePasswordOpen);

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setUserRole(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <Container>
      <LinkComponent to={'/'}>
        <Logo />
        <p>MarmitExpress</p>
      </LinkComponent>

      {/* Links condicionais com base no role */}
      {token ? (
        userRole === 'ROLE_CLIENTE' ? (
          <>
            <LinkComponent to="/restaurantes">
              <StyledIcon icon={'material-symbols:store-outline-rounded'} style={{ fontSize: 30 }} />
              <p>Restaurantes</p>
            </LinkComponent>
            <LinkComponent to="/meus-pedidos">
              <StyledIcon icon={'solar:bag-check-outline'} />
              <p>Meus Pedidos</p>
            </LinkComponent>
          </>
        ) : userRole === 'ROLE_RESTAURANTE' ? (
          <>
            <LinkComponent to="/meu-restaurante">
              <StyledIcon icon={'material-symbols:store-outline-rounded'} />
              <p>Meu Restaurante</p>
            </LinkComponent>
            <LinkComponent to="/pedidos">
              <StyledIcon icon={'solar:bag-check-outline'} />
              <p>Pedidos</p>
            </LinkComponent>
          </>
        ) : (
          <>
            <LinkComponent to="/restaurantes">
              <StyledIcon icon={'material-symbols:store-outline-rounded'} style={{ fontSize: 30 }} />
              <p>Restaurantes</p>
            </LinkComponent>
            <InvisibleDiv />
          </>
        )
      ) : (
        <>
          <LinkComponent to="/restaurantes">
            <StyledIcon icon={'material-symbols:store-outline-rounded'} style={{ fontSize: 30 }} />
            <p>Restaurantes</p>
          </LinkComponent>
          <InvisibleDiv />
        </>
      )}

      {/* Minha Conta */}
      {token ? (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <PopUpButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <StyledIcon icon={'ph:user-bold'} />
            <p>Minha Conta</p>
          </PopUpButton>

          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownButton as="button" onClick={toggleEditProfilePopup}>Editar Perfil</DropdownButton>
              <DropdownButton as="button" onClick={toggleChangePasswordPopup}>Trocar Senha</DropdownButton>
              <DropdownButton as="button" onClick={handleLogout}>Sair</DropdownButton>
            </DropdownMenu>
          )}
        </div>
      ) : (
        <PopUpButton onClick={toggleLoginPopup}>
          <StyledIcon icon={'ph:user-bold'} />
          <p>Entrar / Cadastrar</p>
        </PopUpButton>
      )}

      {/* Modais */}
      {isLoginOpen && <ClienteLoginPopUp isOpen={isLoginOpen} onClose={toggleLoginPopup} />}
      {isEditProfileOpen && <EditProfilePopUp isOpen={isEditProfileOpen} onClose={toggleEditProfilePopup} />}
      {isChangePasswordOpen && <ChangePasswordPopUp isOpen={isChangePasswordOpen} onClose={toggleChangePasswordPopup} />}
    </Container>
  );
}
