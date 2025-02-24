import Footer from './components/Footer';
import JustifyContainer from './components/JustifyContainer';
import AppRoutes from './routes/Routes';
import styled from 'styled-components';

const Div = styled.div`
  background-color: #fafbfc;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  min-height: 100vh;
  padding: 0;
`;

export default function App() {
  return (
    <Div>
      <JustifyContainer>
        <AppRoutes />
      </JustifyContainer>
      <Footer />
    </Div>
  );
}
