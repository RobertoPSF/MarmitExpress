import PopUpComponent from '../PopUp';
import { ButtonSubumit, InputPhone, TelefoneName, Text, Title} from './styles';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetPhonePopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <PopUpComponent onClose={onClose}>
      <Title>Informe o seu número de telefone</Title>
      <Text>É importante caso seja necessário o contato com você, cliente!</Text>
      <TelefoneName>Telefone</TelefoneName>
      <InputPhone placeholder='(00) 90000-0000'/>
      <ButtonSubumit>Confirmar</ButtonSubumit>
    </PopUpComponent>
  );
};

export default GetPhonePopUp;