import { NavLink } from 'react-router-dom';
import { Container } from './styles';
import Button from '../../components/Button';

export default function Contato() {
  return (
    <Container>
      <span>
        🔍 Estamos aqui para tirar dúvidas, receber sugestões ou resolver qualquer problema que você tenha com a plataforma.
      </span>

      <h2>● Formas de contato</h2>
      <ul>
        <li>
          <strong>Email:</strong> suporte@marmitexpress.com
        </li>
        <li>
          <strong>WhatsApp:</strong> (11) 91234-5678
        </li>
        <li>
          <strong>Instagram:</strong> <a href="https://instagram.com/projeto-marmitexpress" target="_blank">@projetomarmitexpress</a>
        </li>
      </ul>

      <h2>● Horário de atendimento</h2>
      <p>
        Segunda a sexta, das 9h às 18h. Responderemos o mais rápido possível.
      </p>

      <h2>● Quer ser parceiro?</h2>
      <span>
        💡 Se você tem um restaurante e deseja fazer parte da nossa plataforma, acesse a página de parceria:
      </span>

      <NavLink to={'/auth/parceiro'}>
        <Button type={'orange'}>QUERO SER PARCEIRO</Button>
      </NavLink>
    </Container>
  );
}
