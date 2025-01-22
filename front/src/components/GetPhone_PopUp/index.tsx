import React from 'react';
import { Container } from './styles';
import PopUp from '../PopUp';
import { OpenButton } from '../PopUp/styles';

export default function GetPhone(){ 
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Container>
      <OpenButton onClick={() => setIsOpen(true)}>Abrir PopUp</OpenButton>

      <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Informe o seu número de telefone</h1>
        <p>É importante caso seja necessário o contato com você, cliente!</p>
        <input type="text" placeholder="Seu número de telefone"/>
        <button>Enviar</button>
      </PopUp>
      
    </Container>
  );

};