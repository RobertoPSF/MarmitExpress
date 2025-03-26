import React from 'react';
import PopUpComponent from '../PopUp';
import { ContentPopup } from './styles';
import { AddMarmitaForm } from '../../Forms';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMarmitaPopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Se o pop-up não estiver aberto, não renderiza nada
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <h2>Adicionar Marmita</h2>
        <AddMarmitaForm onClose={onClose} />
      </ContentPopup>
    </PopUpComponent>
  );
};

export default AddMarmitaPopUp;
