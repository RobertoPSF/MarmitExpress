import { Container, ModalContainer } from './styles';
import Button from '../../components/Button';
import ClienteLoginPopup from '../../components/PopUps/ClienteLoginPopUp';
import { useEffect, useState } from 'react';

export default function MeusPedidos() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return;
    }

    setIsAuthenticated(true);
  }, []);

  return (
    <Container>
      {!isAuthenticated ? (
        <ModalContainer>
          <h3>Entre na sua conta para acessar</h3>
          <p>
            É necessário que você entre na sua conta para ter acesso aos seus
            pedidos!
          </p>
          <Button type="orange" onClick={() => setIsLoginOpen(true)}>
            Entrar
          </Button>
          {isLoginOpen && (
            <ClienteLoginPopup
              isOpen={isLoginOpen}
              onClose={() => setIsLoginOpen(false)}
            />
          )}
        </ModalContainer>
      ) : (
        <div>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => <div>{pedido}</div>)
          ) : (
            <p>Você ainda não tem pedidos.</p>
          )}
        </div>
      )}
    </Container>
  );
}
