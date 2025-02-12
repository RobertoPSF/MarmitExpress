import { Container, House } from "./styles"
import BlankCard from "../BlankCard"

export default function ParceiroHomeCard() {

  return (
    <BlankCard>
      <Container>
        <House />
        <div className="contente">
          <h2>Página do Parceiro</h2>
          <p>Venha ser nosso parceiro e não perca tempo!</p>
        </div>
      </Container>
    </BlankCard>
  )
}
