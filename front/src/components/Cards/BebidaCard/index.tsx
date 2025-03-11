import { Container, Image } from './styles';

interface Bebida {
    imagem: string;
    nome: string;
    descricao: string;
}

interface Props {
    dados: Bebida;
}

export default function BebidaCard({ dados }: Props) {
    return (
        <Container>
            <Image src={dados.imagem} alt={`Imagem da bebida ${dados.nome}`} />
            <div>
                <h3>{dados.nome}</h3>
                <p>{dados.descricao}</p>
            </div>
        </Container>
    );
}
