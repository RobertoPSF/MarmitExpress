import { Container, ModalContainer } from './styles';
import Button from '../../components/Button';
import ClienteLoginPopup from '../../components/PopUps/ClienteLoginPopUp';
import { useState } from 'react';

export default function MeusPedidos() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLoginPopup = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      <Container>
        <ModalContainer>
          <h3>Entre na sua conta para acessar</h3>
          <p>
            É necessário que você entre na sua conta para ter acesso aos seus
            pedidos!
          </p>
          <Button
            type="orange"
            children={'Entrar'}
            onClick={toggleLoginPopup}
          />
          {isLoginOpen && (
            <ClienteLoginPopup
              isOpen={isLoginOpen}
              onClose={toggleLoginPopup}
            />
          )}
        </ModalContainer>
      </Container>
    </>
  );
}
