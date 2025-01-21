import React from 'react'; 
import { PopUpContainer, PopUpContent, CloseButton, Title, SubTitle} from './styles';
import InputContainer from "./GetPhone_Input"

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => { 
  if (!isOpen) {
    return null;
  }

  return (
    <PopUpContainer onClick={onClose}>
      <PopUpContent onClick={(e) => e.stopPropagation()}>

        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Informe o seu número de telefone</Title>
        <SubTitle>É importante caso seja necessário o contato com você, cliente!</SubTitle>
        <InputContainer />
      </PopUpContent>
    </PopUpContainer>
  );
};

export default PopUp;