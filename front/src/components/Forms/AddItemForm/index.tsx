import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import ItemService from '../../../services/ItemService';

interface AddItemProps {
  onClose: () => void;
}

const AddItemForm: React.FC<AddItemProps> = ({ onClose }) => {
  const [formDataAddItem, setFormDataAddItem] = useState({
    nomeItem: '',
    precoItem: 0,
    quantidadeItem: 0,
  });

  const handleChangeAddItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataAddItem({
      ...formDataAddItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddItem = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT

      const itemService = new ItemService();
      const response = await itemService.createItem({
        nome: formDataAddItem.nomeItem,
        preco: formDataAddItem.precoItem,
        quantidade: formDataAddItem.quantidadeItem,
        restauranteId: payload.id,
      });

      if (response?.status === 200) {
        alert('Item adicionado com sucesso!');
        onClose(); // Fecha o modal de AddItem
        window.location.reload(); // Recarrega a página após a atualização
      } else {
        alert('Erro ao adicionar Item. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      alert(error);
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <Input
        placeHolderContainer="Nome do Item"
        name="nomeItem"
        placeholder="Ex: Refrigerante 2L"
        value={formDataAddItem.nomeItem}
        onChange={handleChangeAddItem}
      />
      <Input
        placeHolderContainer="Preço do Item"
        name="precoItem"
        type="number"
        placeholder="Ex: 10.50"
        value={formDataAddItem.precoItem}
        onChange={handleChangeAddItem}
      />
      <Input
        placeHolderContainer="Quantidade do Item"
        name="quantidadeItem"
        type="number"
        placeholder="Ex: 20"
        value={formDataAddItem.quantidadeItem}
        onChange={handleChangeAddItem}
      />

      <Button type="orange" onClick={handleSubmitAddItem}>
        Adicionar Item
      </Button>
    </>
  );
};

export default AddItemForm;
