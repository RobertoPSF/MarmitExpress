import { Container, Section, AddButton, TitleSection } from './styles';
import { useState, useEffect } from 'react';
import AddItemPopUp from '../../components/PopUps/AddItemPopUp';
import AddMarmitaPopUp from '../../components/PopUps/AddMarmitaPopUp';
import AddIngredientePopUp from '../../components/PopUps/AddIngredientePopUp';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import RestauranteService from '../../services/RestauranteService';
import RestauranteCard from '../../components/Cards/RestauranteCardapioVisualization';
import ItemCard from '../../components/Cards/ItemCard';
import IngredienteCard from '../../components/Cards/IngredienteCard';
import MarmitaCard from '../../components/Cards/MarmitaCard';

interface Ingrediente {
  id: string;
  nome: string;
}

interface Item {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface Marmita {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  ingredientes: Ingrediente[];
}

interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  chavePix: string;
  ingredientes: Ingrediente[];
  marmitas: Marmita[];
  listaDeItems: Item[];
}

export default function MeuRestaurante() {
  useAuthRedirect();

  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedIngredientes, setSelectedIngredientes] = useState<string[]>(
    [],
  );

  useEffect(() => {
    const restauranteService = new RestauranteService();
    restauranteService
      .getMyProfile()
      .then((response) => {
        if (response?.data) {
          setRestaurante(response.data);
        }
      })
      .catch((error) => {
        console.error('Erro ao obter restaurante:', error);
      });
  }, []);

  const handleSelectItem = (item: Item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(item.id)
        ? prevSelected.filter((id) => id !== item.id)
        : [...prevSelected, item.id],
    );
  };

  const handleSelectIngrediente = (ingrediente: Ingrediente) => {
    setSelectedIngredientes((prevSelected) =>
      prevSelected.includes(ingrediente.id)
        ? prevSelected.filter((id) => id !== ingrediente.id)
        : [...prevSelected, ingrediente.id],
    );
  };

  const [isAddItemPopUpOpen, setIsAddItemPopUpOpen] = useState(false);
  const [isAddMarmitaPopUpOpen, setIsAddMarmitaPopUpOpen] = useState(false);
  const [isAddIngredientePopUpOpen, setIsAddIngredientePopUpOpen] =
    useState(false);

  const openAddItemPopUp = () => setIsAddItemPopUpOpen(true);
  const closeAddItemPopUp = () => setIsAddItemPopUpOpen(false);

  const openAddIngredientePopUp = () => setIsAddIngredientePopUpOpen(true);
  const closeAddIngredientePopUp = () => setIsAddIngredientePopUpOpen(false);

  const openAddMarmitaPopUp = () => setIsAddMarmitaPopUpOpen(true);
  const closeAddMarmitaPopUp = () => setIsAddMarmitaPopUpOpen(false);

  const isItemSelected = (item: Item) => selectedItems.includes(item.id);
  const isIngredienteSelected = (ingrediente: Ingrediente) =>
    selectedIngredientes.includes(ingrediente.id);

  return (
    <Container>
      <RestauranteCard style={{ color: 'black' }} dados={restaurante} />

      <TitleSection>
        <h1>Tamanho da MarmitEx</h1>
        <AddButton icon={'carbon:add-filled'} onClick={openAddMarmitaPopUp} />
        <AddMarmitaPopUp
          isOpen={isAddMarmitaPopUpOpen}
          onClose={closeAddMarmitaPopUp}
        />
      </TitleSection>

      <Section>
        {restaurante?.marmitas.map((marmita) => (
          <MarmitaCard
            deletar={true}
            key={marmita.id}
            dados={{ id: marmita.id, nome: marmita.nome, preco: marmita.preco }}
            onClick={() => handleSelectItem(marmita)}
            isSelected={isItemSelected(marmita)}
          />
        ))}
      </Section>

      <TitleSection>
        <h1>Acompanhamentos</h1>
        <AddButton
          icon={'carbon:add-filled'}
          onClick={openAddIngredientePopUp}
        />
        <AddIngredientePopUp
          isOpen={isAddIngredientePopUpOpen}
          onClose={closeAddIngredientePopUp}
        />
      </TitleSection>
      <Section>
        {restaurante?.ingredientes.map((ingrediente) => (
          <IngredienteCard
            key={ingrediente.id}
            dados={ingrediente}
            onClick={() => handleSelectIngrediente(ingrediente)}
            isSelected={isIngredienteSelected(ingrediente)}
            deletar={true}
          />
        ))}
      </Section>

      <TitleSection>
        <h1>Itens</h1>
        <AddButton icon={'carbon:add-filled'} onClick={openAddItemPopUp} />
        <AddItemPopUp isOpen={isAddItemPopUpOpen} onClose={closeAddItemPopUp} />
      </TitleSection>
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
              deletar={true}
            />
          ));
        })()}
      </Section>
    </Container>
  );
}
