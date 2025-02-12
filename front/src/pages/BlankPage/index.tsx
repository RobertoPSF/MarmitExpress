import React, { useState } from 'react';
import PopUp from '../../components/PopUps/AcessoNegado_PopUp';
import { OpenButton, BlankPageContainer } from './styles';
import Card from '../../components/Cards/RestauranteCard'

const BlankPage: React.FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <BlankPageContainer>
      <OpenButton onClick={() => setIsPopUpOpen(true)}>Abrir Pop-Up</OpenButton>
      <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}/>

      <Card></Card>
    </BlankPageContainer>
  );
};

export default BlankPage;