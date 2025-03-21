import { Container } from './styles';
import { useState, useEffect } from 'react';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import RestauranteService from '../../services/RestauranteService';

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

interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  chavePix: string;
  ingredientes: Ingrediente[];
  listaDeItens: Item[];
}

export default function MeuRestaurante() {
  useAuthRedirect();

  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);

  useEffect(() => {
    // Criando uma instância de RestauranteService
    const restauranteService = new RestauranteService();

    // Chamando o método getMyProfile da instância criada
    restauranteService
      .getMyProfile()
      .then((response) => {
        if (response?.data) {
          setRestaurante(response.data); // Assumindo que a resposta tem a propriedade "data"
        }
      })
      .catch((error) => {
        console.error('Erro ao obter restaurante:', error);
      });
  }, []);

  console.log(restaurante);

  return (
    <Container>
      <div>{restaurante?.nome}</div>
      <div>{restaurante?.endereco}</div>
      <div>{restaurante?.descricao}</div>
      <div>{restaurante?.telefone}</div>
      <div>
        {restaurante?.aceitandoPedidos
          ? 'Aceitando Pedidos'
          : 'Não Aceitando Pedidos'}
      </div>
      <div>{restaurante?.chavePix}</div>
      {/* Listagem de Itens */}
      <div>
        {restaurante?.listaDeItens.map((item) => (
          <p key={item.id}>{item.nome}</p>
        ))}
      </div>
      {/* Listagem de Ingredientes */}
      <div>
        {restaurante?.ingredientes.map((ingrediente) => (
          <p key={ingrediente.id}>{ingrediente.nome}</p>
        ))}
      </div>
    </Container>
  );
}
