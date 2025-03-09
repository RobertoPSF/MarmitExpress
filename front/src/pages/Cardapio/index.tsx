import { useState, useEffect } from 'react';
import { Container, DivBebidas, DivProteinas, DivSobremesas, DivTamanhoMarmita } from './styles';
import TamanhoMarmitaCard from '../../components/Cards/TamanhoMarmitaCard';
import TamanhoService from '../../services/TamanhoService'
import marmitasvg from '../../assets/marmita.svg'

interface Tamanho {
    imagem: string;
    tamanho: string;
    valor: number;
    proteinas: number;
  }

const mockTamanhos = (): Tamanho[] => {
return [
    { imagem: marmitasvg, tamanho: 'Pequena', valor: 10, proteinas: 1 },
    { imagem: marmitasvg, tamanho: 'Média', valor: 15, proteinas: 2 },
    { imagem: marmitasvg, tamanho: 'Grande', valor: 20, proteinas: 2 },
];
};

export default function Cardapio() {
    
    const [tamanhos, setTamanhos] = useState<Tamanho[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // const tamanhoService = new TamanhoService();

    useEffect(() => {
        const fetchTamanhos = async () => {
          setIsLoading(true);
          try {
            // Simula um atraso na resposta
            await new Promise(resolve => setTimeout(resolve, 1000));
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
    
        fetchTamanhos();
      }, []);

    if (isLoading) return <p>Carregando tamanhos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <DivTamanhoMarmita>
                <h1>Tamanho da MarmitEx</h1>
                {tamanhos.map((tamanho) => (
                    <TamanhoMarmitaCard key={tamanho.tamanho} dados={tamanho} />
                ))}
            </DivTamanhoMarmita>
            <DivProteinas></DivProteinas>
            <DivBebidas></DivBebidas>
            <DivSobremesas></DivSobremesas>
        </Container>
    )
}
