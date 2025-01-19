import { Container, Frase, Logo, TopContainer} from "./styles";

export default function Home() {
	return (
		<>
			<TopContainer>
				<Frase />
			</TopContainer>
			<Container>
				<Logo/>
			</Container>
		</>
	)
}
