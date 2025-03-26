import React from 'react';
import PopUpComponent from '../PopUp';
import { ContentPopup } from './styles';
import { AddIngredienteForm } from '../../Forms';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddIngredientePopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Se o pop-up não estiver aberto, não renderiza nada
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <h2>Adicionar Ingrediente</h2>
        <AddIngredienteForm onClose={onClose} />
      </ContentPopup>
    </PopUpComponent>
  );
};

export default AddIngredientePopUp;
