import React, { useState } from 'react';
import { OpenButton, BlankPageContainer } from './styles'; 
import DefaultPopUp from '../../components/PopUp';

const BlankPage: React.FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <BlankPageContainer>
      <OpenButton onClick={() => setIsPopUpOpen(true)}>Abrir Pop-Up</OpenButton>
      <DefaultPopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}> 
        <h1>Conteúdo do Pop-Up</h1>
        <p>Este é o conteúdo do Pop-Up</p>
      </DefaultPopUp>
    </BlankPageContainer>
  );
};

export default BlankPage;