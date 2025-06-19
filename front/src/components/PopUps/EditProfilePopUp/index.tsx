import React from 'react';
import PopUpComponent from '../PopUp';
import { ContentPopup } from './styles';
import { EditProfileForm } from '../../Forms';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfilePopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Se o pop-up não estiver aberto, não renderiza nada
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <h2>Editar Perfil</h2>
        <EditProfileForm onClose={onClose} />
      </ContentPopup>
    </PopUpComponent>
  );
};

export default EditProfilePopUp;
