import PopUpComponent from '../PopUp';
import { ButtonSubumit, ContentPopup, InputPhone } from './styles';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cadastro_PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
      <h2>Atualize seus dados cadastrais</h2>
      <div className="imputDiv">
        <p>Telefone</p>
        <InputPhone placeholder='(00) 90000-0000'/> 
        <p>Nome</p>
        <InputPhone placeholder='Seu nome'/> 
        <p>Email</p>
        <InputPhone placeholder='user@gmail.com'/> 
        <p>Data de Nascimento</p>
        <InputPhone placeholder='dd/mm/aaaa'/> 
        <p>Gênero</p>
        <InputPhone placeholder='Outro'/> 
      </div>
      <ButtonSubumit>Atualizar cadastro</ButtonSubumit>
      </ContentPopup>
    </PopUpComponent>
  );
};

export default Cadastro_PopUp;