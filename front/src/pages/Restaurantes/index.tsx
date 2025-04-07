import { useState, useEffect } from 'react';
import CardRestaurante from '../../components/Cards/RestauranteCard';
import { Container, DivRestaurantes } from './styles';
import { NavLink } from 'react-router-dom';
import RestaurantService from '../../services/RestauranteService';

interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  chavePix: string;
  itens: { id: string; nome: string; preco: number; quantidade: number }[];
  pedidos: {
    id: string;
    clienteId: string;
    status: string;
    dataHora: string;
    valorTotal: number;
    itens: { ItemId: string; quantidade: number; precoUnitario: number }[];
  }[];
}

export default function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Instancia o serviço
  const restaurantService = new RestaurantService();

  // Faz a requisição de restaurantes ao montar o componente
  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      const response = await restaurantService.getRestaurants();
      if (response && response.status === 200) {
        const abertos = response.data.filter(
          (r: Restaurante) => r.aceitandoPedidos === true,
        );
        setRestaurantes(abertos);
      } else {
        setError('Erro ao carregar restaurantes');
      }
      setIsLoading(false);
    };

    fetchRestaurants();
  }, []);

  if (isLoading)
    return (
      <Container>
        <p style={{ color: 'white' }}>Carregando restaurantes...</p>
      </Container>
    );
  if (error) return <Container style={{ color: 'white' }}>{error}</Container>;

  return (
    <Container>
      <DivRestaurantes>
        {restaurantes.length > 0 ? (
          restaurantes.map((restaurante) => (
            <NavLink
              style={{ height: '120px' }}
              key={restaurante.id}
              to={`/restaurante/${restaurante.id}/cardapio`}
              state={{ id: restaurante.id }}
            >
              <CardRestaurante dados={restaurante} />
            </NavLink>
          ))
        ) : (
          <h2 style={{ color: 'white' }}>Nenhum restaurante aberto!</h2>
        )}
      </DivRestaurantes>
    </Container>
  );
}
