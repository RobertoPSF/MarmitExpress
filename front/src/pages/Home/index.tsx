import ParceiroHomeCard from '../../components/Cards/ParceiroHomeCard';
import ComoSerParceiroHomeCard from '../../components/Cards/ComoSerParceiroHomeCard';
import { Container, Content, Hr } from './styles';

export default function Home() {
  return (
    <Container>
      <Hr />
      <h1>Venha ser nosso parceiro!</h1>
      <Content>
        <ParceiroHomeCard></ParceiroHomeCard>
        <ComoSerParceiroHomeCard></ComoSerParceiroHomeCard>
      </Content>
    </Container>
  );
}
