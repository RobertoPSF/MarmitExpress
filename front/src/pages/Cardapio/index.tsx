import { useState, useEffect } from 'react';
import {
  Container,
  DivTamanhoMarmita,
  ResumoCompraPopup,
  ResumoContainer,
  ItensContainer,
  DivItem,
} from './styles';
import TamanhoMarmitaCard from '../../components/Cards/TamanhoMarmitaCard';
import AcompanhamentoCard from '../../components/Cards/AcompanhamentoCard';
import ProteinaCard from '../../components/Cards/ProteinaCard';
import BebidaCard from '../../components/Cards/BebidaCard';
import SobremesaCard from '../../components/Cards/SobremesaCard';
import { useParams, useNavigate } from 'react-router-dom';
import marmitasvg from '../../assets/marmita.svg';
import arroz from '../../assets/arroz.png';
import carne from '../../assets/carne.png';
import bebida from '../../assets/guarana.svg';
import doce from '../../assets/doce.png';
import restauranteData from '../../data/restaurantes.json';
// import ItensCard from '../../components/Cards/ItensCard';

interface Restaurante {
  id: string;
  nome: string;
  email: string;
  endereco: string;
  telefone: string;
  descricao: string;
  aceitandoPedidos: boolean;
  chavePix: string;
  itens: {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
  }[];
  pedidos: {
    id: string;
    clienteId: string;
    status: string;
    dataHora: string;
    valorTotal: number;
    itens: {
      produtoId: string;
      quantidade: number;
      precoUnitario: number;
    }[];
  }[];
}

interface Tamanho {
  imagem: string;
  tamanho: string;
  valor: number;
  proteinas: number;
}

interface Acompanhamento {
  imagem: string;
  nome: string;
  descricao: string;
}

interface Proteina {
  imagem: string;
  nome: string;
  descricao: string;
}

interface Bebida {
  imagem: string;
  nome: string;
  valor: number;
  descricao: string;
}

interface Sobremesa {
  imagem: string;
  nome: string;
  valor: number;
  descricao: string;
}

const mockTamanhos = (): Tamanho[] => {
  return [
    { imagem: marmitasvg, tamanho: 'Pequena', valor: 10, proteinas: 1 },
    { imagem: marmitasvg, tamanho: 'Média', valor: 15, proteinas: 2 },
    { imagem: marmitasvg, tamanho: 'Grande', valor: 20, proteinas: 2 },
  ];
};

const mockAcompanhamentos = (): Acompanhamento[] => {
  return [
    { imagem: arroz, nome: 'Arroz', descricao: 'Arroz branco' },
    { imagem: arroz, nome: 'Feijão', descricao: 'Feijão preto' },
    { imagem: arroz, nome: 'Salada', descricao: 'Salada de alface e tomate' },
    { imagem: arroz, nome: 'Batata Frita', descricao: 'Batata frita crocante' },
    { imagem: arroz, nome: 'Farofa', descricao: 'Farofa de mandioca' },
    { imagem: arroz, nome: 'Macarrão', descricao: 'Macarrão ao alho e óleo' },
    { imagem: arroz, nome: 'Legumes', descricao: 'Legumes cozidos' },
    {
      imagem: arroz,
      nome: 'Purê de Batata',
      descricao: 'Purê de batata cremoso',
    },
  ];
};

const mockProteinas = (): Proteina[] => {
  return [
    { imagem: carne, nome: 'Frango', descricao: 'Frango grelhado' },
    { imagem: carne, nome: 'Carne', descricao: 'Carne assada' },
    { imagem: carne, nome: 'Peixe', descricao: 'Peixe frito' },
  ];
};

const mockBebidas = (): Bebida[] => {
  return [
    {
      imagem: bebida,
      nome: 'Suco de Manga',
      valor: 4,
      descricao: 'Suco natural',
    },
    {
      imagem: bebida,
      nome: 'Suco de Goiaba',
      valor: 3,
      descricao: 'Suco natural',
    },
    { imagem: bebida, nome: 'Refrigerante', valor: 5, descricao: 'Guaraná' },
  ];
};

const mockSobremesas = (): Sobremesa[] => {
  return [
    { imagem: doce, nome: 'Pudim', valor: 4, descricao: 'Pudim de leite' },
    { imagem: doce, nome: 'Bolo', valor: 3, descricao: 'Bolo de cenoura' },
  ];
};

export default function Cardapio() {
  const { id } = useParams<{ id: string }>(); // Pega o id do restaurante da URL
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [tamanhos, setTamanhos] = useState<Tamanho[]>([]);
  const [acompanhamentos, setAcompanhamentos] = useState<Acompanhamento[]>([]);
  const [proteinas, setProteinas] = useState<Acompanhamento[]>([]);
  const [bebidas, setBebidas] = useState<Acompanhamento[]>([]);
  const [sobremesas, setSobremesas] = useState<Acompanhamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTamanho, setSelectedTamanho] = useState<Tamanho | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    (Acompanhamento | Proteina | Bebida | Sobremesa)[]
  >([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // const tamanhoService = new TamanhoService();
  // const acompanhamentoService = new AcompanhamentoService();
  // const proteinaService = new ProteinaService();
  // const bebidaService = new BebidaService();
  // const sobremesaService = new SobremesaService();

  useEffect(() => {
    // Carregar dados do restaurante com o id da URL
    const foundRestaurante = restauranteData.find((r) => r.id === id);
    if (foundRestaurante) {
      setRestaurante(foundRestaurante);
    } else {
      setError('Restaurante não encontrado');
    }

    const fetchTamanhos = async () => {
      setIsLoading(true);
      try {
        // Simula um atraso na resposta
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = { status: 200, data: mockTamanhos() };
        if (response && response.status === 200) {
          setTamanhos(response.data);
        } else {
          setError('Erro ao carregar tamanhos');
        }
      } catch (e) {
        setError('Erro ao carregar tamanhos');
      }
      setIsLoading(false);
    };

    const fetchAcompanhamentos = async () => {
      setIsLoading(true);
      try {
        // Simula um atraso na resposta
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = { status: 200, data: mockAcompanhamentos() };
        if (response && response.status === 200) {
          setAcompanhamentos(response.data);
        } else {
          setError('Erro ao carregar acompanhamentos');
        }
      } catch (e) {
        setError('Erro ao carregar acompanhamentos');
      }
      setIsLoading(false);
    };

    const fetchProteinas = async () => {
      setIsLoading(true);
      try {
        // Simula um atraso na resposta
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = { status: 200, data: mockProteinas() };
        if (response && response.status === 200) {
          setProteinas(response.data);
        } else {
          setError('Erro ao carregar proteínas');
        }
      } catch (e) {
        setError('Erro ao carregar proteínas');
      }
      setIsLoading(false);
    };

    const fetchBebidas = async () => {
      setIsLoading(true);
      try {
        // Simula um atraso na resposta
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = { status: 200, data: mockBebidas() };
        if (response && response.status === 200) {
          setBebidas(response.data);
        } else {
          setError('Erro ao carregar bebidas');
        }
      } catch (e) {
        setError('Erro ao carregar bebidas');
      }
      setIsLoading(false);
    };

    const fetchSobremesas = async () => {
      setIsLoading(true);
      try {
        // Simula um atraso na resposta
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = { status: 200, data: mockSobremesas() };
        if (response && response.status === 200) {
          setSobremesas(response.data);
        } else {
          setError('Erro ao carregar sobremesas');
        }
      } catch (e) {
        setError('Erro ao carregar sobremesas');
      }
      setIsLoading(false);
    };

    fetchTamanhos();
    fetchAcompanhamentos();
    fetchProteinas();
    fetchBebidas();
    fetchSobremesas();
  }, []);

  const handleSelectTamanho = (tamanho: Tamanho) => {
    setSelectedTamanho(tamanho);
    setTotal(tamanho.valor);
  };

  const countSelectedProteinas = () => {
    return selectedItems.filter((item) =>
      proteinas.some((proteina) => proteina.nome === item.nome),
    ).length;
  };

  const handleRemoveItem = (
    item: Acompanhamento | Proteina | Bebida | Sobremesa,
  ) => {
    setSelectedItems(selectedItems.filter((i) => i.nome !== item.nome));
    setTotal(total - ('valor' in item ? item.valor : 0));
  };

  const isItemSelected = (
    item: Acompanhamento | Proteina | Bebida | Sobremesa,
  ) => {
    return selectedItems.some((i) => i.nome === item.nome);
  };

  const handleSelectItem = (
    item: Acompanhamento | Proteina | Bebida | Sobremesa,
  ) => {
    if (isItemSelected(item)) {
      handleRemoveItem(item);
    } else {
      if (
        proteinas.some((proteina) => proteina.nome === item.nome) &&
        selectedTamanho &&
        countSelectedProteinas() >= selectedTamanho.proteinas
      ) {
        alert(
          `Você só pode selecionar até ${selectedTamanho.proteinas} proteínas para o tamanho ${selectedTamanho.tamanho}.`,
        );
        return;
      }

      setSelectedItems([...selectedItems, item]);
      setTotal(total + ('valor' in item ? item.valor : 0));
    }
  };

  if (isLoading)
    return (
      <Container>
        <p>Carregando tamanhos e acompanhamentos...</p>
      </Container>
    );
  if (error)
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );

  const handleFinalizarCompra = () => {
    navigate('/pagamento', {
      state: {
        tamanho: selectedTamanho,
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

  return (
    <Container>
      <ItensContainer>
        {restaurante && (
          <>
            <h1 style={{ color: 'white' }}>{restaurante.nome}</h1>
            <h2 style={{ color: 'white' }}>{restaurante.descricao}</h2>
          </>
        )}
        <h1>Tamanho da MarmitEx</h1>
        <DivTamanhoMarmita>
          {/* <h1>Itens para venda</h1>
        <>
          {restaurante?.itens.map((item) => (
            <ItensCard imagem={''} nome={item.nome} valor={item.preco} />
          ))}
        </> */}
          {tamanhos.map((tamanho) => (
            <TamanhoMarmitaCard
              key={tamanho.tamanho}
              dados={tamanho}
              onClick={() => handleSelectTamanho(tamanho)}
              isSelected={selectedTamanho?.tamanho === tamanho.tamanho}
            />
          ))}
        </DivTamanhoMarmita>
        <h2>Acompanhamentos</h2>
        <DivItem>
          {acompanhamentos.map((acompanhamento) => (
            <AcompanhamentoCard
              key={acompanhamento.nome}
              dados={acompanhamento}
              onClick={() => handleSelectItem(acompanhamento)}
              isSelected={isItemSelected(acompanhamento)}
            />
          ))}
        </DivItem>

        <h2>Proteínas</h2>
        <DivItem>
          {proteinas.map((proteina) => (
            <ProteinaCard
              key={proteina.nome}
              dados={proteina}
              onClick={() => handleSelectItem(proteina)}
              isSelected={isItemSelected(proteina)}
            />
          ))}
        </DivItem>

        <h2>Bebidas</h2>
        <DivItem>
          {bebidas.map((bebida) => (
            <BebidaCard
              key={bebida.nome}
              dados={bebida}
              onClick={() => handleSelectItem(bebida)}
              isSelected={isItemSelected(bebida)}
            />
          ))}
        </DivItem>

        <h2>Sobremesas</h2>
        <DivItem>
          {sobremesas.map((sobremesa) => (
            <SobremesaCard
              key={sobremesa.nome}
              dados={sobremesa}
              onClick={() => handleSelectItem(sobremesa)}
              isSelected={isItemSelected(sobremesa)}
            />
          ))}
        </DivItem>
      </ItensContainer>
      <ResumoContainer>
        <ResumoCompraPopup>
          <h2>Itens</h2>
          <hr />
          <p>Tamanho da Marmita: {selectedTamanho?.tamanho}</p>
          <p>Itens Selecionados:</p>
          <ul>
            {selectedItems.map((item) => (
              <li key={item.nome}>{item.nome}</li>
            ))}
          </ul>
          <hr />
          <p>Total: {formatarMoeda(total)}</p>
          <button className="finalizar-compra" onClick={handleFinalizarCompra}>
            Finalizar Compra
          </button>
        </ResumoCompraPopup>
      </ResumoContainer>
    </Container>
  );
}
