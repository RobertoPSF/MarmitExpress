import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import IngredienteService from '../../../services/IngredienteService';

interface AddIngredienteProps {
  onClose: () => void;
}

const AddIngredienteForm: React.FC<AddIngredienteProps> = ({ onClose }) => {
  const [formDataAddIngrediente, setFormDataAddIngrediente] = useState({
    nomeIngrediente: '',
  });

  const handleChangeAddIngrediente = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormDataAddIngrediente({
      ...formDataAddIngrediente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddIngrediente = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }
      const ingredienteService = new IngredienteService();
      const response = await ingredienteService.createIngrediente({
        nome: formDataAddIngrediente.nomeIngrediente,
      });

      if (response?.status === 200) {
        alert('Ingrediente adicionado com sucesso!');
        onClose(); // Fecha o modal de AddIngrediente
        window.location.reload(); // Recarrega a página após a atualização
      } else {
        alert(
          'Erro ao adicionar Ingrediente. Verifique os dados e tente novamente.',
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
        placeHolderContainer="Nome do Ingrediente"
        name="nomeIngrediente"
        placeholder="Ex: Arroz Branco"
        value={formDataAddIngrediente.nomeIngrediente}
        onChange={handleChangeAddIngrediente}
      />

      <Button type="orange" onClick={handleSubmitAddIngrediente}>
        Adicionar Ingrediente
      </Button>
    </>
  );
};

export default AddIngredienteForm;
