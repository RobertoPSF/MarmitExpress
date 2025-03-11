import { Container, Image } from './styles';

interface Acompanhamento {
    imagem: string;
    nome: string;
    descricao: string;
}

interface Props {
    dados: Acompanhamento;
}

export default function AcompanhamentoCard({ dados }: Props) {
    return (
        <Container>
            <Image src={dados.imagem} alt={`Imagem do acompanhamento ${dados.nome}`} />
            <div>
                <h3>{dados.nome}</h3>
                <p>{dados.descricao}</p>
            </div>
        </Container>
    );
}
