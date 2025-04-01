import ItemService from '../../../services/ItemService';
import { Container, DeleteButton, Information, StyledIcon } from './styles';

interface Item {
  id: string;
  nome: string;
  preco: number;
}

interface ItemCardProps {
  dados: Item | null;
  deletar: boolean;
  onClick: () => void;
  isSelected: boolean;
}

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor,
  );

export default function ItemCard({
  dados,
  onClick,
  isSelected,
  deletar,
}: ItemCardProps) {
  if (!dados) {
    return <p>Item não encontrado.</p>;
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }
      const itemService = new ItemService();
      const response = await itemService.deleteItem(dados.id);

      if (response?.status === 204) {
        alert('Item deletado com sucesso!');
        window.location.reload();
      } else {
        alert('Erro ao deletar item.');
      }
    } catch (error) {
      alert(error);
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <Container onClick={onClick} isSelected={isSelected && !deletar}>
      {/* Exibe o botão de deletar se deletar for true */}
      {deletar && (
        <DeleteButton icon={'mdi:delete-circle'} onClick={handleDelete} />
      )}
      <StyledIcon icon={'mingcute:drink-line'} />
      <Information>
        <p>{dados.nome}</p>
      </Information>
      <h3>{formatarMoeda(dados.preco)}</h3>
    </Container>
  );
}
