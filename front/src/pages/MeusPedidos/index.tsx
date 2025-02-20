import { Container, ModalContainer } from './styles';
import Button from '../../components/Button';
import ClienteLoginPopup from '../../components/PopUps/ClienteLoginPopUp';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function MeusPedidos() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clienteId, setClienteId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      return;
    }

    setIsAuthenticated(true);

    // Supondo que o token contenha o ID do cliente (pode precisar de decodificação JWT)
    const clienteIdFromToken = obterClienteIdDoToken(token); // Implementação dessa função pode variar
    if (!clienteIdFromToken) {
      console.error('Não foi possível obter o ID do cliente.');
      return;
    }

    setClienteId(clienteIdFromToken);

    fetch(`http://localhost:8080/clientes/${clienteIdFromToken}/pedidos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao obter pedidos');
        }
        return response.json();
      })
      .then((data) => setPedidos(data))
      .catch((error) => {
        console.error('Erro ao obter pedidos:', error);
      });
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
            pedidos.map((pedido) => (
              <div key={pedido.id} style={{ width: '100%' }}>
                <Link
                  style={{ borderRadius: '23px' }}
                  to={`/pedido/${pedido.id}`}
                >
                  <Button type="orange">
                    Pedido #{pedido.id} - {pedido.status} - R${' '}
                    {pedido.valorTotal.toFixed(2)}
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p>Você ainda não tem pedidos.</p>
          )}
        </div>
      )}
    </Container>
  );
}

// Função fictícia para extrair o ID do cliente do token (depende de como o token é estruturado)
function obterClienteIdDoToken(token) {
  try {
    const base64Url = token.split('.')[1]; // Extrai a parte payload do JWT
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(atob(base64)); // Decodifica o JSON
    return decodedData.clienteId; // Retorna o clienteId se existir
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}
