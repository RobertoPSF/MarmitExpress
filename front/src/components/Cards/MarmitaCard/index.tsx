import MarmitaService from '../../../services/MarmitaService';
import { Container, DeleteButton, Information, StyledIcon } from './styles';

interface Marmita {
  id: string;
  nome: string;
  preco: number;
}

interface MarmitaCardProps {
  dados: Marmita | null;
  deletar: boolean;
  onClick: () => void;
  isSelected: boolean;
}

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor,
  );

export default function MarmitaCard({
  dados,
  onClick,
  isSelected,
  deletar,
}: MarmitaCardProps) {
  if (!dados) {
    return <p>Marmita não encontrada.</p>;
  }

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }
      const marmitaService = new MarmitaService();
      const response = await marmitaService.deleteMarmita(dados.id);

      if (response?.status === 204) {
        alert('Marmita deletada com sucesso!');
        window.location.reload();
      } else {
        alert('Erro ao deletar marmita.');
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
      <StyledIcon icon={'ph:bowl-food'} />
      <Information>
        <p>{dados.nome}</p>
      </Information>
      <h3>{formatarMoeda(dados.preco)}</h3>
    </Container>
  );
}
