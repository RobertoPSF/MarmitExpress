import React from 'react';
import PopUpComponent from '../PopUp';
import { ContentPopup } from './styles';
import { ChangePasswordForm } from '../../Forms';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordPopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // Se o pop-up não estiver aberto, não renderiza nada
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <h2>Alterar senha</h2>
        <p>Digite sua nova senha abaixo:</p>
        <ChangePasswordForm onClose={onClose} />
      </ContentPopup>
    </PopUpComponent>
  );
};

export default ChangePasswordPopUp;
