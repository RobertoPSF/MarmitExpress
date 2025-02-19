import { Container, Img, Information } from './styles';

export default function ParceiroHomeCard() {
  return (
    <Container to="/auth/parceiro">
      <Img />
      <Information>
        <h2>Página do Parceiro</h2>
        <p>Venha ser nosso parceiro e não perca tempo!</p>
      </Information>
    </Container>
  );
}
