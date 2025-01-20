import Header from "../../components/Header";
import { Container, Frase, Logo, TopContainer} from "./styles";

export default function Home() {
	return (
		<>
			<Header />
			<TopContainer>
				<Frase />
			</TopContainer>
			<Container>
				<Logo/>
			</Container>
		</>
	)
}
