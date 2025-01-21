import React, { useState } from 'react';
import PopUp from '../../components/GetPhone_PopUp';
import { OpenButton, BlankPageContainer } from './styles'; 
import  Button  from '../../components/OrangeButton';

const BlankPage: React.FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <BlankPageContainer>
      <OpenButton onClick={() => setIsPopUpOpen(true)}>Abrir Pop-Up</OpenButton>
      <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} />
      <Button>Clique</Button>
    </BlankPageContainer>
  );
};

export default BlankPage;