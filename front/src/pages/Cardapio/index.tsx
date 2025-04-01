import {
  Container,
  ResumoCompraPopup,
  ResumoContainer,
  RestauranteCard,
  ItensContainer,
  Section,
} from './styles';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemCard from '../../components/Cards/ItemCard';
import MarmitaCard from '../../components/Cards/MarmitaCard';
import IngredienteCard from '../../components/Cards/IngredienteCard';
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
  listaDeItems: Item[];
  marmitas: Marmita[];
  ingredientes: Ingrediente[];
}

export default function Cardapio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedIngredientes, setSelectedIngredientes] = useState<string[]>(
    [],
  );
  const [total, setTotal] = useState(0);
  const restaurantService = new RestaurantService();
  const id = location.state?.id;

  useEffect(() => {
    if (!id) {
      console.error('ID do restaurante não encontrado.');
      return;
    }
    restaurantService
      .getRestaurantById(id)
      .then((response) => {
        if (response?.status === 200) {
          setRestaurante(response.data);
        }
      })
      .catch((error) => console.error('Erro ao buscar restaurante:', error));
  }, [id]);

  const handleSelectMarmita = (marmita: Marmita) => {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(marmita.id);
      const updatedSelectedItems = isSelected
        ? prev.filter((id) => id !== marmita.id)
        : [...prev, marmita.id];

      // Recalcula o total incluindo marmitas
      const novoTotal =
        (restaurante?.listaDeItems || [])
          .filter((i) => updatedSelectedItems.includes(i.id))
          .reduce((acc, curr) => acc + curr.preco, 0) +
        (restaurante?.marmitas || [])
          .filter((m) => updatedSelectedItems.includes(m.id))
          .reduce((acc, curr) => acc + curr.preco, 0);

      setTotal(novoTotal);
      return updatedSelectedItems;
    });
  };

  const handleSelectItem = (item: Item) => {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(item.id);
      const updatedSelectedItems = isSelected
        ? prev.filter((id) => id !== item.id) // Remove o item se já estiver selecionado
        : [...prev, item.id]; // Adiciona o item se ainda não estiver selecionado

      // Recalcula o total somando os preços dos itens selecionados
      const novoTotal =
        restaurante?.listaDeItems
          .filter((i) => updatedSelectedItems.includes(i.id))
          .reduce((acc, curr) => acc + curr.preco, 0) || 0;

      setTotal(novoTotal); // Atualiza o estado do total
      return updatedSelectedItems;
    });
  };

  const handleSelectIngrediente = (ingrediente: Ingrediente) => {
    setSelectedIngredientes((prev) =>
      prev.includes(ingrediente.id)
        ? prev.filter((id) => id !== ingrediente.id)
        : [...prev, ingrediente.id],
    );
  };

  const isItemSelected = (item: Item) => selectedItems.includes(item.id);
  const isIngredienteSelected = (ingrediente: Ingrediente) =>
    selectedIngredientes.includes(ingrediente.id);

  const handleFinalizarCompra = () => {
    navigate('/pagamento', { state: { itens: selectedItems, total } });
  };

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);

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
        <RestauranteCard dados={restaurante} />
        <h2>Marmitas</h2>
        <Section>
          {restaurante?.marmitas.map((marmita) => (
            <MarmitaCard
              key={marmita.id}
              dados={{
                id: marmita.id,
                nome: marmita.nome,
                preco: marmita.preco,
              }}
              onClick={() => handleSelectItem(marmita)}
              isSelected={isItemSelected(marmita)}
              deletar={false}
            />
          ))}
        </Section>

        <h2>Acompanhamentos</h2>
        <Section>
          {restaurante?.ingredientes.map((ingrediente) => (
            <IngredienteCard
              key={ingrediente.id}
              dados={ingrediente}
              onClick={() => handleSelectIngrediente(ingrediente)}
              isSelected={isIngredienteSelected(ingrediente)}
              deletar={false}
            />
          ))}
        </Section>

        <h2>Itens</h2>
        <Section>
          {(() => {
            const listaFiltrada =
              Array.isArray(restaurante?.listaDeItems) &&
              Array.isArray(restaurante?.marmitas)
                ? restaurante.listaDeItems.filter(
                    (item) =>
                      !restaurante.marmitas.some(
                        (marmita) => marmita.id === item.id,
                      ),
                  )
                : [];

            return listaFiltrada.map((item) => (
              <ItemCard
                key={item.id}
                dados={{ id: item.id, nome: item.nome, preco: item.preco }}
                onClick={() => handleSelectItem(item)}
                isSelected={isItemSelected(item)}
                deletar={false}
              />
            ));
          })()}
        </Section>
      </ItensContainer>

      <ResumoContainer>
        <ResumoCompraPopup>
          <h2>Seu pedido</h2>
          <hr />
          <p>Itens Selecionados:</p>
          <ul>
            {selectedItems.map((itemId) => {
              const item = restaurante.listaDeItems.find(
                (i) => i.id === itemId,
              );
              return item ? <li key={item.id}>- {item.nome}</li> : null;
            })}
          </ul>
          <hr />
          <p>Total: {formatarMoeda(total)}</p>
          <button
            className="finalizar-compra"
            onClick={handleFinalizarCompra}
            disabled={!restaurante.aceitandoPedidos}
          >
            Fazer Pedido
          </button>
        </ResumoCompraPopup>
      </ResumoContainer>
    </Container>
  );
}
