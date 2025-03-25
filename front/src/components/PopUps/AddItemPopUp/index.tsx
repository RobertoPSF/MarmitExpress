import React from 'react';
import PopUpComponent from '../PopUp';
import { ContentPopup } from './styles';
import AdicionaItemForm from '../../Forms/AdicionaItemForm';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddItemPopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <h2>Adiciona Um Item</h2>
        <AdicionaItemForm onClose={onClose} />
      </ContentPopup>
    </PopUpComponent>
  );
};

export default AddItemPopUp;
