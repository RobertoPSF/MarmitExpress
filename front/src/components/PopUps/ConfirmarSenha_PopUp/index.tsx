import PopUpComponent from '../PopUp';
import { ButtonSair, ButtonSubumit, ContentPopup, InputPhone} from './styles';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmarSenha_PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
      <h2>Olá, Fulano!</h2>
      <p>Confirme sua senha para continuar</p>
      <div className="imputDiv">

        <p>Senha</p>
        <InputPhone placeholder='********'/>

      </div>
      <a>Esqueceu a senha?</a>
      <ButtonSair>Sair desta conta</ButtonSair>
      <ButtonSubumit>Confirmar</ButtonSubumit>
      </ContentPopup>
    </PopUpComponent>
  );
};

export default ConfirmarSenha_PopUp;