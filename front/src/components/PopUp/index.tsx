import React from 'react';
import { PopUpContainer, PopUpContent, CloseButton, StyledIcon } from './styles';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, children }) => { 
  if (!isOpen) {
    return null;
  }

  return (
    <PopUpContainer>
      <PopUpContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <StyledIcon icon={"simple-line-icons:close"} />
        </CloseButton>
        {children}
      </PopUpContent>
    </PopUpContainer>
  );
};

export default PopUp;