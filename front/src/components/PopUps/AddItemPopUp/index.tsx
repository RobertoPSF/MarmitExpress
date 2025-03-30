import React from 'react';
import PopUpComponent from '../PopUp';
import { ContentPopup } from './styles';
import { AddItemForm } from '../../Forms';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddItemPopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Se o pop-up não estiver aberto, não renderiza nada
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <h2>Adicionar Item</h2>
        <AddItemForm onClose={onClose} />
      </ContentPopup>
    </PopUpComponent>
  );
};

export default AddItemPopUp;
