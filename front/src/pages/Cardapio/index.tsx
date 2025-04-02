import {
  Container,
  ResumoCompraPopup,
  ResumoContainer,
  RestauranteCard,
  ItensContainer,
  Section,
  SectionIngredientes,
  SectionItens,
} from './styles';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ItemCard from '../../components/Cards/ItemCard';
import MarmitaCard from '../../components/Cards/MarmitaCard';
import IngredienteCard from '../../components/Cards/IngredienteCard';
import RestaurantService from '../../services/RestauranteService';
import PedidoAddMarmitaPopUp from '../../components/PopUps/PedidoAddMarmitaPopUp';

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
  const [selectedItems, setSelectedItems] = useState<
    { id: string; nome: string; preco: number }[]
  >([]);

  const [selectedIngredientes, setSelectedIngredientes] = useState<string[]>(
    [],
  );

  const [marmitaSelecionada, setMarmitaSelecionada] = useState<string | null>(
    null,
  );

  const openPedidoAddMarmitaPopUp = (idMarmita: string) => {
    setMarmitaSelecionada(idMarmita);
  };

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

  const handleSelectItem = (item: Item) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((i) => i.id === item.id);
      const updatedItems = isSelected
        ? prev.filter((i) => i.id !== item.id) // Remove se já estiver selecionado
        : [...prev, item]; // Adiciona se ainda não estiver

      // Recalcular total incluindo itens e marmitas
      const novoTotal =
        updatedItems.reduce((acc, curr) => acc + curr.preco, 0) + // Soma itens
        selectedMarmitas.reduce((acc, curr) => {
          const marmitaInfo = restaurante?.marmitas.find(
            (m) => m.id === curr.idMarmita,
          );
          return marmitaInfo ? acc + marmitaInfo.preco : acc;
        }, 0); // Soma marmitas

      setTotal(novoTotal);
      return updatedItems;
    });
  };

  const handleSelectIngrediente = (ingrediente: Ingrediente) => {
    setSelectedIngredientes((prev) =>
      prev.includes(ingrediente.id)
        ? prev.filter((id) => id !== ingrediente.id)
        : [...prev, ingrediente.id],
    );
  };

  const isItemSelected = (item: Item) => selectedItems.includes(item);
  const isIngredienteSelected = (ingrediente: Ingrediente) =>
    selectedIngredientes.includes(ingrediente.id);

  const handleFinalizarCompra = () => {
    try {
      navigate('/pagamento', { state: { itens: selectedItems, total } });
    } catch {}
  };

  const [selectedMarmitas, setSelectedMarmitas] = useState<
    { idMarmita: string; ingredientes: string[] }[]
  >([]);

  const handleAdicionarMarmitaAoPedido = (marmita: {
    idMarmita: string;
    ingredientes: string[];
  }) => {
    setSelectedMarmitas((prev) => [...prev, marmita]);

    const marmitaInfo = restaurante?.marmitas.find(
      (m) => m.id === marmita.idMarmita,
    );
    if (marmitaInfo) {
      setTotal((prevTotal) => prevTotal + marmitaInfo.preco);
    }
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
        <h2>Marmitas *</h2>
        <Section>
          {restaurante?.marmitas.map((marmita) => (
            <MarmitaCard
              key={marmita.id}
              dados={marmita}
              onClick={() => openPedidoAddMarmitaPopUp(marmita.id)} // <-- Agora passa o ID correto!
              isSelected={isItemSelected(marmita)}
              deletar={false}
            />
          ))}
        </Section>

        {/* Renderiza apenas UM pop-up, da marmita selecionada */}
        {marmitaSelecionada && (
          <PedidoAddMarmitaPopUp
            idMarmita={marmitaSelecionada}
            idRestaurante={id}
            isOpen={!!marmitaSelecionada}
            onClose={() => setMarmitaSelecionada(null)}
            onAddMarmita={handleAdicionarMarmitaAoPedido}
          />
        )}

        <h2>Acompanhamentos do dia</h2>
        <SectionIngredientes>
          {restaurante?.ingredientes.map((ingrediente) => (
            <IngredienteCard
              key={ingrediente.id}
              dados={ingrediente}
              onClick={() => handleSelectIngrediente(ingrediente)}
              isSelected={isIngredienteSelected(ingrediente)}
              deletar={false}
            />
          ))}
        </SectionIngredientes>

        <h2>Itens *</h2>
        <SectionItens>
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
        </SectionItens>
      </ItensContainer>

      <ResumoContainer>
        <ResumoCompraPopup>
          <h2>Sua sacola </h2>
          <hr />
          <p>
            <b>Marmitas Selecionadas:</b>
          </p>
          <ul>
            {selectedMarmitas.map((marmita) => {
              const marmitaInfo = restaurante?.marmitas.find(
                (m) => m.id === marmita.idMarmita,
              );
              return marmitaInfo ? (
                <li key={marmita.idMarmita}>
                  - {marmitaInfo.nome} ({' '}
                  {marmita.ingredientes.length > 0
                    ? marmita.ingredientes
                        .map((id) => {
                          const ing = restaurante?.ingredientes.find(
                            (i) => i.id === id,
                          );
                          return ing ? ing.nome : 'Desconhecido';
                        })
                        .join(', ')
                    : 'Nenhum'}
                  )
                </li>
              ) : null;
            })}
          </ul>
          <p>
            <b>Itens Selecionados:</b>
          </p>
          <ul>
            {selectedItems.map((item) => (
              <li key={item.id}>
                - {item.nome} ({formatarMoeda(item.preco)})
              </li>
            ))}
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
