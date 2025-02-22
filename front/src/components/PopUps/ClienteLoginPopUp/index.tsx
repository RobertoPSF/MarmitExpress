import React, { useState } from 'react';
import PopUpComponent from '../PopUp';
import Button from '../../Button';
import { ContentPopup } from './styles';
import { ClienteLoginForm, ClienteCadastroForm } from '../../Forms';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login_PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para alternar entre login e cadastro

  const handleOpenRegister = () => {
    setIsLoginForm(false); // Altera para o formulário de cadastro
  };

  const handleGoBackToLogin = () => {
    setIsLoginForm(true); // Volta para o formulário de login
  };

  if (!isOpen) {
    return null; // Se o pop-up não estiver aberto, não renderiza nada
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        {isLoginForm ? (
          <>
            <h2>Entre na sua conta</h2>
            <ClienteLoginForm onClose={onClose} />
            <p>ou</p>
            <Button type="white" onClick={handleOpenRegister}>
              Criar uma conta
            </Button>
          </>
        ) : (
          <>
            <h2>Adicione seus dados cadastrais</h2>
            <ClienteCadastroForm onClose={onClose} />
            <p>ou</p>
            <Button type="white" onClick={handleGoBackToLogin}>
              Voltar para o login
            </Button>
          </>
        )}
      </ContentPopup>
    </PopUpComponent>
  );
};

export default Login_PopUp;
