import { Container, Frase } from "./styles";
import { useLocation } from "react-router-dom";

export default function TopContainer() {
  const location = useLocation();

  return (
    <Container>
      {location.pathname === "/" ? <Frase /> : null}
    </Container>
  );
}
