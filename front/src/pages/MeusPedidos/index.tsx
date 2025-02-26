import { Container } from './styles';
import { useState, useEffect } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';

export default function MeusPedidos() {
  useAuthRedirect();

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    fetch('http://localhost:8080/pedidos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setPedidos(retorno_convertido))
      .catch((error) => {
        console.error('Erro ao obter pedidos:', error);
      });
  }, []);

  return (
    <Container>
      <div>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => <div key={pedido.id}>{pedido.nome}</div>)
        ) : (
          <p>Você ainda não tem pedidos.</p>
        )}
      </div>
    </Container>
  );
}
