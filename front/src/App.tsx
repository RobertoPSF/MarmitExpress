import Footer from "./components/Footer";
import JustifyContainer from "./components/JustifyContainer";
import AppRoutes from "./Routes"
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  background-color: #FAFBFC;
`;

export default function App() {
	return (
		<Div>
			<JustifyContainer>
				<AppRoutes />
			</JustifyContainer>
			<Footer />
		</Div>
	)
}
