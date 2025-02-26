import { Container } from './styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    // Se chegou aqui, há um token, então faça a requisição dos pedidos
    fetch('http://localhost:8080/pedidos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setPedidos(retorno_convertido))
      .catch((error) => {
        console.error('Erro ao obter pedidos:', error);
      });
  }, [navigate]);

  return (
    <Container>
      <div>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => <div>{pedido}</div>)
        ) : (
          <p>Você ainda não tem pedidos.</p>
        )}
      </div>
    </Container>
  );
}
