import ParceiroHomeCard from '../../components/Cards/ParceiroHomeCard';
import ComoSerParceiroHomeCard from '../../components/Cards/ComoSerParceiroHomeCard';
import { Container, Content, Hr } from './styles';
import { useEffect, useState } from 'react';

export default function Home() {
  const [hasToken, setHasToken] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role; // Obtém a role do usuário
        setUserRole(role); // Salva a role no estado
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        alert('Erro ao processar login.');
      }
      setHasToken(true);
    }
  }, []);

  return (
    <Container>
      <Hr />
      <h1>
        {hasToken
          ? userRole === 'ROLE_CLIENTE'
            ? 'Não perca tempo, faça já o seu pedido!'
            : userRole === 'ROLE_RESTAURANTE'
              ? 'Não perca tempo, desejamos a vocês ótimas vendas!'
              : 'Venha ser nosso parceiro!'
          : 'Venha ser nosso parceiro!'}
      </h1>
      {!hasToken && (
        <Content>
          <ParceiroHomeCard />
          <ComoSerParceiroHomeCard />
        </Content>
      )}
    </Container>
  );
}
