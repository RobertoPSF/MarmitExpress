import { Container, Text, InputPhone, ButtonSubumit} from "./styles";


export default function InputContainer() {
  return (
    <>
      <Container>
        <Text>Telefone</Text>
        <InputPhone></InputPhone>
        <ButtonSubumit>Enviar</ButtonSubumit>
      </Container>
    </>
  )
}
