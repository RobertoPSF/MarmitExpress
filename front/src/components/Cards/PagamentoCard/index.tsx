import { Container, RestauranteContent, ImagemRestaurante, Row, Line, ItemCard} from './styles';
import Button from '../../Button'

interface Pagamento {
    quantidade: number,
    tipoItem: string,
    preco: number
  }
  
  interface PagamentoCardProps {
    dados: Pagamento;
  }

export default function PagamentoCard({ dados }: PagamentoCardProps) {
    const { quantidade, tipoItem, preco } = dados;
    let valorSutotal = 0;
    let totalCalculado = 100.00;
    return (
    <Container>
        <p>seu pedido pendente</p>
        {/*IMPORT CARD RESTAURANTE*/}
        <RestauranteContent>
            <ImagemRestaurante />
            <h3 id='nomeRestaurante'>NOME Restaurante</h3>
        </RestauranteContent>

        <Line />

        <h3>Itens</h3>
        
        <ItemCard>
            {/* IMAGEM DO RESTAURANTE */}
            <p id='itemQuantidade'>{quantidade + "X"}</p>
            <p id='itemTipo'>{tipoItem}</p>
            <p id='itemPreco'>{"R$ " + preco}</p>
        </ItemCard>
        {/*LOGICA PARA INTES NO CARRINHO*/} 

        <Line />
        <div id='PagamentoInfo'>
            <Row>
                <p>Subtotal</p>
                <p>{valorSutotal}</p>
            </Row>
                
            <Row>
                <p>Valor da entrega</p>
                <p>{7}</p>
            </Row>

            <Row>
                <p>Forma de pagamento</p>
                <p>{"Pix"}</p>
            </Row>

            <Row>
                <p>Total</p>
                <p>{totalCalculado}</p>
            </Row>
        </div>

        {/*<Button type={'orange'} onClick={handleConfirm}>
            Concluir Pedido
        </Button>*/}

    </Container>
    );
}