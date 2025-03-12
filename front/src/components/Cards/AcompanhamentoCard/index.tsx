import { Container, Image } from './styles';

interface Acompanhamento {
    imagem: string;
    nome: string;
    descricao: string;
}

interface Props {
    dados: Acompanhamento;
    onClick: () => void;
    isSelected: boolean;
}

export default function AcompanhamentoCard({ dados, onClick, isSelected}: Props) {
    return (
        <Container onClick={onClick} isSelected={isSelected}>
            <Image src={dados.imagem} alt={`Imagem do acompanhamento ${dados.nome}`} />
            <div>
                <h3>{dados.nome}</h3>
                <p>{dados.descricao}</p>
            </div>
        </Container>
    );
}
