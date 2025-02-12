import PopUpComponent from '../PopUp';
import { ButtonCriarConta, ButtonSubumit, ContentPopup, InputPhone} from './styles';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login_PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
      <h2>Entre na sua conta</h2>
      <div className="imputDiv">
        <p>Usuario</p>
        <InputPhone placeholder='username'/>

        <p>Senha</p>
        <InputPhone placeholder='********'/>
      </div>
      <a>Esqueceu a senha?</a>
      <ButtonSubumit>Confirmar</ButtonSubumit>
      <p>ou</p>
      <ButtonCriarConta>Criar uma conta</ButtonCriarConta>
      </ContentPopup>
    </PopUpComponent>
  );
};

export default Login_PopUp;