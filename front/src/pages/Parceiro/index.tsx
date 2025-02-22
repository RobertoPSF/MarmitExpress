import { Container, ModalContainer } from './styles';
import Button from '../../components/Button';
import {
  RestauranteLoginForm,
  RestauranteCadastroForm,
} from '../../components/Forms';
import { useState } from 'react';

export default function Parceiro() {
  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para alternar entre login e cadastro

  const handleOpenRegister = () => {
    setIsLoginForm(false); // Altera para o formulário de cadastro
  };

  const handleGoBackToLogin = () => {
    setIsLoginForm(true); // Volta para o formulário de login
  };

  return (
    <>
      <Container>
        <ModalContainer>
          {isLoginForm ? (
            <>
              <h2>Entre na sua conta</h2>
              <RestauranteLoginForm />
              <p>ou</p>
              <Button type="white" onClick={handleOpenRegister}>
                Quero ser parceiro
              </Button>
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
