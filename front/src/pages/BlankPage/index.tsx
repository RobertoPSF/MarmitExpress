import React, { useState } from 'react';
import PopUp from '../../components/PopUp';
import GetPhone from '../../components/GetPhone_PopUp'; 
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