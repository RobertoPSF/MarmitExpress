import PopUpComponent from '../PopUp';
import { ButtonEntrar, ContentPopup } from './styles';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcessoNegado_PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <h2>Entre na sua conta para acessar</h2>
        <p>
          É necessário que você entre na sua conta para ter acesso aos seus
          pedidos!
        </p>
        <ButtonEntrar>Entrar</ButtonEntrar>
      </ContentPopup>
    </PopUpComponent>
  );
};

export default AcessoNegado_PopUp;
