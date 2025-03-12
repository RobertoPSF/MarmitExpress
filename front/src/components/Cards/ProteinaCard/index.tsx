import { Container, Image } from './styles';

interface Proteina {
    imagem: string;
    nome: string;
    descricao: string;
}

interface Props {
    dados: Proteina;
    onClick: () => void;
    isSelected: boolean;
}

export default function ProteinaCard({ dados, onClick, isSelected}: Props) {
    return (
        <Container onClick={onClick} isSelected={isSelected}>
            <Image src={dados.imagem} alt={`Imagem da proteina ${dados.nome}`} />
            <div>
                <h3>{dados.nome}</h3>
                <p>{dados.descricao}</p>
            </div>
        </Container>
    );
}
