import ParceiroHomeCard from '../../components/Cards/ParceiroHomeCard';
import ComoSerParceiroHomeCard from '../../components/Cards/ComoSerParceiroHomeCard';
import { Container, Content, Hr } from './styles';
import { useEffect, useState } from 'react';

export default function Home() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setHasToken(!!token);
  }, []);

  return (
    <Container>
      <Hr />
      <h1>
        {hasToken
          ? 'Não perca tempo, faça já o seu pedido!'
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
