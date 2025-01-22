import { Container, Text, InputPhone, ButtonSubumit} from "./styles";


export default function InputContainer() {
  return (
    <>
      <Container>
        <Text>Telefone</Text>
        <InputPhone placeholder="(81) ____-____"></InputPhone>
        <ButtonSubumit>Enviar</ButtonSubumit>
      </Container>
    </>
  )
}
