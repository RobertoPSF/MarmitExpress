import { Container, ResumoCompraPopup, ResumoContainer, RestauranteCard, ItensContainer, Section} from './styles';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemCard from '../../components/Cards/ExclusiveVisualisationItemCard';
import MarmitaCard from '../../components/Cards/ExclusiveVisualisationMarmitaCard';
import IngredienteCard from '../../components/Cards/ExclusiveVisualisationIngredienteCard';
import RestaurantService from '../../services/RestauranteService';

interface Ingrediente {
  id: string;
  nome: string;
}

interface Item {
  id: string;
  nome: string;
  preco: number;
}

interface Marmita {
  id: string;
  nome: string;
  preco: number;
  ingredientes: Ingrediente[];
}

interface Restaurante {
  id: string;
  nome: string;
  descricao: string;
  aceitandoPedidos: boolean;
  endereco: string;
  listaDeItens: Item[];
  marmitas: Marmita[];
  ingredientes: Ingrediente[];
}

export default function Cardapio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedIngredientes, setSelectedIngredientes] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const restaurantService = new RestaurantService();
  const id = location.state?.id;

  useEffect(() => {
    if (!id) {
      console.error('ID do restaurante não encontrado.');
      return;
    }
    restaurantService.getRestaurantById(id)
      .then((response) => {
        if (response?.status === 200) {
          setRestaurante(response.data);
        }
      })
      .catch((error) => console.error('Erro ao buscar restaurante:', error));
  }, [id]);

  const handleSelectItem = (item: Item) => {
    setSelectedItems((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  const handleSelectIngrediente = (ingrediente: Ingrediente) => {
    setSelectedIngredientes((prev) =>
      prev.includes(ingrediente.id) ? prev.filter((id) => id !== ingrediente.id) : [...prev, ingrediente.id]
    );
  };

  const isItemSelected = (item: Item) => selectedItems.includes(item.id);
  const isIngredienteSelected = (ingrediente: Ingrediente) => selectedIngredientes.includes(ingrediente.id);

  const handleFinalizarCompra = () => {
    navigate('/pagamento', { state: { itens: selectedItems, total } });
  };

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  if (!restaurante) {
    return (
      <Container>
        <h1 style={{ color: 'white' }}>Cardápio não encontrado...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <ItensContainer>
      <RestauranteCard dados = {restaurante}/>
        <h2>Marmitas</h2>
        <Section>
          {restaurante?.marmitas.map((marmita) => (
            <MarmitaCard
              key={marmita.id}
              dados={{ nome: marmita.nome, preco: marmita.preco }}
              onClick={() => handleSelectItem(marmita)}
              isSelected={isItemSelected(marmita)}
            />
          ))}
        </Section>
        
        <h2>Ingredientes</h2>
        <Section>
          {restaurante?.ingredientes.map((ingrediente) => (
            <IngredienteCard
              key={ingrediente.id}
              dados={ingrediente}
              onClick={() => handleSelectIngrediente(ingrediente)}
              isSelected={isIngredienteSelected(ingrediente)}
            />
          ))}
        </Section>
        
        <h2>Itens</h2>
        <Section>
          {(() => {
          const listaFiltrada = restaurante?.listaDeItens.filter(
            (item) => !restaurante.marmitas.some((marmita) => marmita.id === item.id)
          ) || [];
        
          return listaFiltrada.map((item) => (
            <ItemCard
              key={item.id}
              dados={{ nome: item.nome, preco: item.preco }}
              onClick={() => handleSelectItem(item)}
              isSelected={isItemSelected(item)}
            />
            ));
          })()}
        </Section>
      </ItensContainer>
      
      <ResumoContainer>
        <ResumoCompraPopup>
          <h2>Itens Selecionados</h2>
          <ul>
            {selectedItems.map((itemId) => {
              const item = restaurante.listaDeItens.find((i) => i.id === itemId);
              return item ? <li key={item.id}>{item.nome}</li> : null;
            })}
          </ul>
          <p>Total: {formatarMoeda(total)}</p>
          <button onClick={handleFinalizarCompra} disabled={!restaurante.aceitandoPedidos}>
            Finalizar Compra
          </button>
        </ResumoCompraPopup>
      </ResumoContainer>
    </Container>
  );
}
