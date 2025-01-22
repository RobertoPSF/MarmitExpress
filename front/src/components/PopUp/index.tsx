import React from 'react';
import { PopUpContainer, PopUpContent, CloseButton, StyledIcon } from './styles';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Adicionado: prop children tipada
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, children }) => { // children como prop
  if (!isOpen) {
    return null;
  }

  return (
    <PopUpContainer>
      <PopUpContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <StyledIcon icon={"simple-line-icons:close"} />
        </CloseButton>
        {children} {/* Adicionado: renderiza o conteúdo children */}
      </PopUpContent>
    </PopUpContainer>
  );
};

export default PopUp;