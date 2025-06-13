import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import ItemService from '../../../services/ItemService';
import Notification from '../../Notification';

interface AddItemProps {
  onClose: () => void;
}

const AddItemForm: React.FC<AddItemProps> = ({ onClose }) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);
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
        setNotificacao({ message: "Item adicionado com sucesso!", type: "success" });
        
        // Fecha o modal depois de 0.5s (tempo suficiente para o usuário ler a notificação)
        setTimeout(() => {
          setNotificacao(null);
          onClose(); // Fecha o modal
          window.location.reload(); // Recarrega a página após a atualização
        }, 500);
      } else {
        setNotificacao({ message: "Item adicionado com sucesso!", type: "error" });      }
    } catch (error) {
      setNotificacao({ message: "Erro ao conectar com o servidor.", type: "error" });
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

      {notificacao && (
        <Notification
          message={notificacao.message}
          type={notificacao.type}
          onClose={() => setNotificacao(null)}
        />
      )}
    </>
  );
};

export default AddItemForm;
