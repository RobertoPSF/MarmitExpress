import { Container } from './styles';
import useAuthRedirect from '../../hooks/useAuthRedirect';

export default function MeuRestaurante() {
  useAuthRedirect();

  return <Container></Container>;
}
