import Button from '../../components/Button';
import { Container } from './styles';
import { NavLink } from 'react-router-dom';

export default function AboutParceiro() {
  return (
    <Container>
      <h1>Seja um Parceiro!</h1>
      <p>
        Junte-se a nós e aumente suas vendas ao se tornar um parceiro da nossa
        plataforma.
      </p>

      <h2>Como funciona?</h2>
      <ul>
        <li>Cadastre seu restaurante em poucos minutos.</li>
        <li>Adicione seu cardápio e defina seus preços.</li>
        <li>Receba pedidos diretamente pelo nosso sistema.</li>
        <li>Aumente sua visibilidade e conquiste novos clientes!</li>
      </ul>

      <h2>Benefícios</h2>
      <ul>
        <li>Maior alcance para seu restaurante.</li>
        <li>Facilidade na gestão de pedidos.</li>
      </ul>

      <NavLink to={'/auth/parceiro'}>
        <Button type={'orange'}>QUERO SER PARCEIRO</Button>
      </NavLink>
    </Container>
  );
}
