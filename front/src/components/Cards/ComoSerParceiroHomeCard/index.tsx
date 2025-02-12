import { Container, Img } from "./styles"
import BlankCard from "../BlankCard"

export default function ParceiroHomeCard() {

  return (
    <BlankCard>
      <Container>
        <Img />
          <div className="contente">
            <h2>Como ser Parceiro</h2>
            <p>Não perca tempo, veja nosso guia e trabalhe com entregas!</p>
          </div>
      </Container>
    </BlankCard>
  )
}
