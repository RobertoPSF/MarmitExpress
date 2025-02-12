import React, { useState } from 'react';
import GetPhone from '../../components/EditarCadastro_PopUp';
import { OpenButton, BlankPageContainer } from './styles';

const BlankPage: React.FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <BlankPageContainer>
      <OpenButton onClick={() => setIsPopUpOpen(true)}>Abrir Pop-Up</OpenButton>
      <GetPhone isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}/>
    </BlankPageContainer>
  );
};

export default BlankPage;