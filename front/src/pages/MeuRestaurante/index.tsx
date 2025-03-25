import { Container, Section } from './styles';
import { useState, useEffect } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import RestauranteService from '../../services/RestauranteService';
import RestauranteCard from '../../components/Cards/RestauranteCard';
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
  listaDeItens: Item[];
}

export default function MeuRestaurante() {
  useAuthRedirect();

  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedIngredientes, setSelectedIngredientes] = useState<string[]>([]);

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
        : [...prevSelected, item.id]
    );
  };

  const handleSelectIngrediente = (ingrediente: Ingrediente) => {
    setSelectedIngredientes((prevSelected) =>
      prevSelected.includes(ingrediente.id)
        ? prevSelected.filter((id) => id !== ingrediente.id)
        : [...prevSelected, ingrediente.id]
    );
  };

  const isItemSelected = (item: Item) => selectedItems.includes(item.id);
  const isIngredienteSelected = (ingrediente: Ingrediente) => selectedIngredientes.includes(ingrediente.id);

  return (
    <Container>
      <RestauranteCard dados={restaurante} />
      
      <h1>Tamanho da MarmitEx</h1>
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

      <h1>Acompanhamentos</h1>
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

      <h1>Itens</h1>
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
    </Container>
  );
}