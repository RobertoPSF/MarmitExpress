import { Container, Image } from './styles';

interface Sobremesa {
    imagem: string;
    nome: string;
    descricao: string;
}

interface Props {
    dados: Sobremesa;
}

export default function SobremesaCard({ dados }: Props) {
    return (
        <Container>
            <Image src={dados.imagem} alt={`Imagem da sobremesa ${dados.nome}`} />
            <div>
                <h3>{dados.nome}</h3>
                <p>{dados.descricao}</p>
            </div>
        </Container>
    );
}
