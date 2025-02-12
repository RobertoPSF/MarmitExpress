import React, { useState } from 'react';
import GetPhone from '../../components/EditarCadastro_PopUp';
import { OpenButton, BlankPageContainer } from './styles';
import Card from '../../components/RestauranteCard'

const BlankPage: React.FC = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <BlankPageContainer>
      <OpenButton onClick={() => setIsPopUpOpen(true)}>Abrir Pop-Up</OpenButton>
      <GetPhone isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}/>

      <Card></Card>
    </BlankPageContainer>
  );
};

export default BlankPage;