import { Container, ModalContainer } from './styles';
import Button from '../../components/Button';
import {
  RestauranteLoginForm,
  RestauranteCadastroForm,
  RestauranteRecuperacaoForm,
} from '../../components/Forms';
import { useState } from 'react';
import useNoAuthRedirect from '../../hooks/useNoAuthRedirect';

export default function Parceiro() {
  useNoAuthRedirect();
  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para alternar entre login e cadastro
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Estado para alternar para recuperação de senha

  const handleOpenRegister = () => {
    setIsLoginForm(false); // Altera para o formulário de cadastro
    setIsForgotPassword(false); // Reseta o estado de recuperação de senha
  };

  const handleGoBackToLogin = () => {
    setIsLoginForm(true); // Volta para o formulário de login
    setIsForgotPassword(false); // Reseta o estado de recuperação de senha
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true); // Altera para o formulário de recuperação de senha
  };

  return (
    <>
      <Container>
        <ModalContainer>
          {isLoginForm ? (
            <>
              <h2>Entre na sua conta</h2>
              {isForgotPassword ? (
              <>
                <RestauranteRecuperacaoForm onClose={handleGoBackToLogin} />
                <Button type="white" onClick={handleGoBackToLogin}>
                  Voltar para o login
                </Button>
              </>
            ) : (
              <>
                <RestauranteLoginForm onForgotPassword={handleForgotPassword} />
                <p>ou</p>
                <Button type="white" onClick={handleOpenRegister}>
                  Quero ser parceiro
                </Button> 
            </>
            )}
          </>
          ) : (
            <>
              <h2>Adicione seus dados cadastrais</h2>
              <RestauranteCadastroForm />
              <p>ou</p>
              <Button type="white" onClick={handleGoBackToLogin}>
                Já sou parceiro
              </Button>
            </>
          )}
        </ModalContainer>
      </Container>
    </>
  );
}
