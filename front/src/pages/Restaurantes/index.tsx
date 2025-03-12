import { useState, useEffect } from 'react';
// import SidebarFiltros from '../../components/SideBarRestaurantsFilter';
import CardRestaurante from '../../components/Cards/RestauranteCard';
import { Container, DivRestaurantes } from './styles';
import { NavLink, useNavigate } from 'react-router-dom';
import restaurante from '../../data/restaurantes.json';

const restaurantesMock = restaurante;

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
    itens: { produtoId: string; quantidade: number; precoUnitario: number }[];
  }[];
}

export default function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simula um delay para carregar os dados (caso necessário)
    setTimeout(() => {
      try {
        setRestaurantes(restaurantesMock); // Agora os dados são passados corretamente
      } catch (err) {
        setError('Erro ao carregar restaurantes');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  if (isLoading)
    return (
      <Container>
        <p>Carregando restaurantes...</p>
      </Container>
    );
  if (error) return <p>{error}</p>;

  return (
    <Container>
      {/* <SidebarFiltros setFiltros={setFiltros} /> */}
      <DivRestaurantes>
        {restaurantes.length > 0 ? (
          restaurantes.map((restaurante) => (
            <NavLink
              key={restaurante.id}
              to={`/restaurante/${restaurante.id}/cardapio`}
            >
              <CardRestaurante dados={restaurante} />
            </NavLink>
          ))
        ) : (
          <p>Não existem Restaurantes cadastrados.</p>
        )}
      </DivRestaurantes>
    </Container>
  );
}
