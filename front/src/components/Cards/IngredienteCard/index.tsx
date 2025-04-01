import IngredienteService from '../../../services/IngredienteService';
import { Container, DeleteButton, StyledIcon } from './styles';

interface Ingrediente {
  id: string;
  nome: string;
}

interface IngredienteCardProps {
  dados: Ingrediente | null;
  deletar: boolean;
  onClick: () => void;
  isSelected: boolean;
}

export default function IngredienteCard({
  dados,
  onClick,
  isSelected,
  deletar,
}: IngredienteCardProps) {
  if (!dados) {
    return <p>Ingrediente não encontrado.</p>;
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }
      const ingredienteService = new IngredienteService();
      const response = await ingredienteService.deleteIngrediente(dados.id);

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
    <Container onClick={onClick} isSelected={isSelected}>
      {/* Exibe o botão de deletar se deletar for true */}
      {deletar && (
        <DeleteButton icon={'mdi:delete-circle'} onClick={handleDelete} />
      )}
      <StyledIcon icon={'ep:food'} />
      <p>{dados.nome}</p>
    </Container>
  );
}
