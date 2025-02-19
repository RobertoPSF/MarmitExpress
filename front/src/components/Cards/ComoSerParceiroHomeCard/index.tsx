import { Container, Img, Information } from './styles';

export default function ParceiroHomeCard() {
  return (
    <Container to="/about/parceiro">
      <Img />
      <Information>
        <h2>Como ser Parceiro</h2>
        <p>Não perca tempo, veja nosso guia e trabalhe com entregas!</p>
      </Information>
    </Container>
  );
}
