import React from 'react';
import { Container } from './styles';
import PopUp from '../PopUp';
import Input from '../InputComponent';
import { Button } from '../ButtonComponent/styles';

export default function GetPhone(){ 
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Container>
      <Button onClick={() => setIsOpen(true)}>Abrir PopUp</Button>
      <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Informe o seu número de telefone</h2>
        <p>É importante caso seja necessário o contato com você, cliente!</p>
        <Input />
        <button>Enviar</button>
      </PopUp>

    </Container>
  );

};