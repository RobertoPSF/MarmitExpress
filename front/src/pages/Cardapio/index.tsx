import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AcompanhamentoCard from '../../components/Cards/AcompanhamentoCard';
import {
  Container,
  ResumoCompraPopup,
  ResumoContainer,
  ItensContainer,
  DivItem,
} from './styles';

interface Acompanhamento {
  imagem: string;
  nome: string;
  descricao: string;
}

export default function Cardapio() {
  const location = useLocation();
  const restaurante = location.state?.restaurante; // Pegando os dados do restaurante

  if (!restaurante) {
    return <p>Erro ao carregar os dados do restaurante.</p>;
  }

  const [selectedItems, setSelectedItems] = useState<
    (Acompanhamento)[]
  >([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleRemoveItem = (
    item: Acompanhamento,
  ) => {
    setSelectedItems(selectedItems.filter((i) => i.nome !== item.nome));
    setTotal(total);
  };

  const isItemSelected = (
    item: Acompanhamento,
  ) => {
    return selectedItems.some((i) => i.nome === item.nome);
  };

  const handleSelectItem = (
    item: Acompanhamento,
  ) => {
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

  return (
    <Container>
      <ItensContainer>
        <h1>{restaurante.nome}</h1>
        <h2>{restaurante.descricao}</h2>
        <DivItem>
          {restaurante.listaDeItens.map((item: { id: Key | null | undefined; nome: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; preco: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <AcompanhamentoCard 
            dados={item} 
            onClick={() => handleSelectItem(item)}
            isSelected={isItemSelected(item)}
            />
          ))}
        </DivItem>
      </ItensContainer>
      {/* <ResumoContainer>
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
          <button className="finalizar-compra" onClick={handleFinalizarCompra}>
            Finalizar Compra
          </button>
        </ResumoCompraPopup>
      </ResumoContainer> */}
    </Container>
  );
}
