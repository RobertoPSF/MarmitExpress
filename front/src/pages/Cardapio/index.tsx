import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemCard from '../../components/Cards/ItemCard';
import {
  Container,
  ResumoCompraPopup,
  ResumoContainer,
  ItensContainer,
  DivItem,
} from './styles';
import RestaurantService from '../../services/RestauranteService';

interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  chavePix: string;
  listaDeItens: {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
  }[];
}

interface Item {
  nome: string;
  preco: number;
}

export default function Cardapio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const restaurantService = new RestaurantService();
  const id = location.state?.id;

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!id) {
        console.error('ID do restaurante não encontrado.');
        return;
      }
      try {
        const response = await restaurantService.getRestaurantById(id);
        if (response?.status === 200) {
          setRestaurante(response.data);
        } else {
          console.error('Erro ao buscar restaurante:', response);
        }
      } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleRemoveItem = (item: Item) => {
    setSelectedItems(selectedItems.filter((i) => i.nome !== item.nome));
    setTotal(total);
  };

  const isItemSelected = (item: Item) => {
    return selectedItems.some((i) => i.nome === item.nome);
  };

  const handleSelectItem = (item: Item) => {
    if (isItemSelected(item)) {
      handleRemoveItem(item);
    } else {
      setSelectedItems([...selectedItems, item]);
      setTotal(total);
    }
  };

  const handleFinalizarCompra = () => {
    navigate('/pagamento', {
      state: {
        itens: selectedItems,
        total: total,
      },
    });
  };

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);

  if (!restaurante) {
    return (
      <Container>
        <h1 style={{ color: 'white' }}>{'Cardápio não encontrado...'}</h1>
      </Container>
    );
  }

  return (
    <Container>
      <ItensContainer>
        <h1 style={{ color: 'white' }}>{restaurante.nome}</h1>
        <h3 style={{ color: 'white' }}>{restaurante.descricao}</h3>
        <hr style={{ width: '97%', marginLeft: '0' }} />
        <h2>Acompanhamentos</h2>
        <DivItem>
          {restaurante?.listaDeItens?.length ? (
            restaurante.listaDeItens.map((item) => (
              <>
                <ItemCard
                  dados={item}
                  onClick={() => handleSelectItem(item)}
                  isSelected={isItemSelected(item)}
                />
              </>
            ))
          ) : (
            <p>Nenhum item disponível</p>
          )}
        </DivItem>
      </ItensContainer>
      <ResumoContainer>
        <ResumoCompraPopup>
          <h2>Itens</h2>
          <hr />
          <p>Itens Selecionados:</p>
          <ul>
            {selectedItems.map((item) => (
              <li key={item.nome}>- {item.nome}</li>
            ))}
          </ul>
          <hr />
          <p>Total: {formatarMoeda(total)}</p>
          <button
            className="finalizar-compra"
            onClick={handleFinalizarCompra}
            disabled={!restaurante.aceitandoPedidos}
          >
            Finalizar Compra
          </button>
        </ResumoCompraPopup>
      </ResumoContainer>
    </Container>
  );
}
