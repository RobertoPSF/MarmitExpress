import React from 'react';
import PopUpComponent from '../PopUp';
import { ContentPopup } from './styles';
import { OpenLojaForm } from '../../Forms';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditLojaPopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Se o pop-up não estiver aberto, não renderiza nada
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <OpenLojaForm onClose={onClose} />
      </ContentPopup>
    </PopUpComponent>
  );
};

export default EditLojaPopUp;
