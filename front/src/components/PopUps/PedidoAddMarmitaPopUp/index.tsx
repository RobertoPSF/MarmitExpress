import React from 'react';
import PopUpComponent from '../PopUp';
import { ContentPopup } from './styles';
import { PedidoAddMarmitaForm } from '../../Forms';

interface PopUpProps {
  isOpen: boolean;
  idMarmita: string;
  idRestaurante: string;
  onClose: () => void;
  onAddMarmita: (marmita: {
    idMarmita: string;
    ingredientes: string[];
  }) => void; // <-- Novo prop
}

const PedidoAddMarmitaPopUp: React.FC<PopUpProps> = ({
  isOpen,
  onClose,
  idMarmita,
  idRestaurante,
  onAddMarmita, // <-- Recebendo o callback do Cardápio
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        <PedidoAddMarmitaForm
          onClose={onClose}
          idMarmita={idMarmita}
          idRestaurante={idRestaurante}
          onAddMarmita={onAddMarmita} // <-- Passando para o form
        />
      </ContentPopup>
    </PopUpComponent>
  );
};

export default PedidoAddMarmitaPopUp;
