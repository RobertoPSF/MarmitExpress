import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import MarmitaService from '../../../services/MarmitaService';

interface AddMarmitaProps {
  onClose: () => void;
}

const AddMarmitaForm: React.FC<AddMarmitaProps> = ({ onClose }) => {
  const [formDataAddMarmita, setFormDataAddMarmita] = useState({
    nomeMarmita: '',
    precoMarmita: 0,
    quantidadeMarmita: 0,
  });

  const handleChangeAddMarmita = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataAddMarmita({
      ...formDataAddMarmita,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddMarmita = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT

      const marmitaService = new MarmitaService();
      const response = await marmitaService.createMarmita({
        nome: formDataAddMarmita.nomeMarmita,
        preco: formDataAddMarmita.precoMarmita,
        quantidade: formDataAddMarmita.quantidadeMarmita,
        restauranteId: payload.id,
      });

      if (response?.status === 200) {
        alert('Marmita adicionado com sucesso!');
        onClose(); // Fecha o modal de AddMarmita
        window.location.reload(); // Recarrega a página após a atualização
      } else {
        alert(
          'Erro ao adicionar Marmita. Verifique os dados e tente novamente.',
        );
      }
    } catch (error) {
      alert(error);
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <Input
        placeHolderContainer="Nome do Marmita"
        name="nomeMarmita"
        placeholder="Ex: Marmita Simples"
        value={formDataAddMarmita.nomeMarmita}
        onChange={handleChangeAddMarmita}
      />
      <Input
        placeHolderContainer="Preço da Marmita"
        name="precoMarmita"
        type="number"
        placeholder="Ex: 10.50"
        value={formDataAddMarmita.precoMarmita}
        onChange={handleChangeAddMarmita}
      />
      <Input
        placeHolderContainer="Quantidade da Marmita"
        name="quantidadeMarmita"
        type="number"
        placeholder="Ex: 20"
        value={formDataAddMarmita.quantidadeMarmita}
        onChange={handleChangeAddMarmita}
      />

      <Button type="orange" onClick={handleSubmitAddMarmita}>
        Adicionar Marmita
      </Button>
    </>
  );
};

export default AddMarmitaForm;
