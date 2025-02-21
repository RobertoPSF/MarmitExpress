import { useState } from 'react';
import SidebarFiltros from '../../components/SideBarRestaurantsFilter';
import CardRestaurante from '../../components/Cards/RestauranteCard';
import { Container, DivRestaurantes } from './styles';
import { NavLink } from 'react-router-dom';

const restaurantesMock = [
  {
    id: 1,
    nome: 'Pizza Express',
    area: 'Centro',
    preco: 30,
    cozinha: 'Italiana',
    tempo: 30,
  },
  {
    id: 2,
    nome: 'Sushi Place',
    area: 'Zona Sul',
    preco: 50,
    cozinha: 'Japonesa',
    tempo: 45,
  },
  {
    id: 3,
    nome: 'Burger King',
    area: 'Norte',
    preco: 20,
    cozinha: 'Fast Food',
    tempo: 25,
  },
  {
    id: 4,
    nome: 'Spaghetti House',
    area: 'Centro',
    preco: 40,
    cozinha: 'Italiana',
    tempo: 35,
  },
];

export default function Restaurantes() {
  const [filtros, setFiltros] = useState({
    area: '',
    precoMin: 0,
    precoMax: 999,
    cozinha: '',
  });

  const filteredRestaurants = restaurantesMock.filter((r) => {
    return (
      (!filtros.area || r.area === filtros.area) &&
      (!filtros.cozinha || r.cozinha === filtros.cozinha) &&
      r.preco >= (filtros.precoMin || 0) &&
      r.preco <= (filtros.precoMax || 999)
    );
  });

  return (
    <Container>
      <SidebarFiltros setFiltros={setFiltros} />
      <DivRestaurantes>
        {filteredRestaurants.map((restaurante) => (
          <NavLink to={'/restaurante/' + restaurante.id}>
            <CardRestaurante key={restaurante.id} dados={restaurante} />
          </NavLink>
        ))}
      </DivRestaurantes>
    </Container>
  );
}
