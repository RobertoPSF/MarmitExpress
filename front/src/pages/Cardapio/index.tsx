import { useState, useEffect } from 'react';
import { Container, DivAcompanhamentos, DivTamanhoMarmita, DivBebidas, DivProteinas, DivSobremesas } from './styles';
import TamanhoMarmitaCard from '../../components/Cards/TamanhoMarmitaCard';
import AcompanhamentoCard from '../../components/Cards/AcompanhamentoCard';
import ProteinaCard from '../../components/Cards/ProteinaCard';
import BebidaCard from '../../components/Cards/BebidaCard';
import SobremesaCard from '../../components/Cards/SobremesaCard';
import TamanhoService from '../../services/TamanhoService'
import AcompanhamentoService from '../../services/AcompanhamentoService'
import ProteinaService from '../../services/ProteinaService'
import BebidaService from '../../services/BebidaService'
import SobremesaService from '../../services/SobremesaService'

import marmitasvg from '../../assets/marmita.svg'
import arroz from '../../assets/arroz.png'
import carne from '../../assets/carne.png'
import bebida from '../../assets/guarana.svg'
import doce from '../../assets/doce.png'

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
  descricao: string;
}

interface Sobremresa {
  imagem: string;
  nome: string;
  descricao: string;
}

const mockTamanhos = (): Tamanho[] => {
    return [
        { imagem: marmitasvg, tamanho: 'Pequena', valor: 10, proteinas: 1 },
        { imagem: marmitasvg, tamanho: 'Média', valor: 15, proteinas: 2 },
        { imagem: marmitasvg, tamanho: 'Grande', valor: 20, proteinas: 2 },
        { imagem: marmitasvg, tamanho: 'Grande', valor: 20, proteinas: 2 },
        { imagem: marmitasvg, tamanho: 'Grande', valor: 20, proteinas: 2 },
        { imagem: marmitasvg, tamanho: 'Grande', valor: 20, proteinas: 2 },
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
        { imagem: arroz, nome: 'Purê de Batata', descricao: 'Purê de batata cremoso' },
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
        { imagem: bebida, nome: 'Suco de Manga', descricao: 'Suco natural' },
        { imagem: bebida, nome: 'Suco de Goiaba', descricao: 'Suco natural' },
        { imagem: bebida, nome: 'Refrigerante', descricao: 'Guaraná' },
    ];
};

const mockSobremesas = (): Sobremesa[] => {
    return [
        { imagem: doce, nome: 'Pudim', descricao: 'Pudim de leite' },
        { imagem: doce, nome: 'Bolo', descricao: 'Bolo de cenoura' },
    ];
};

export default function Cardapio() {
    const [tamanhos, setTamanhos] = useState<Tamanho[]>([]);
    const [acompanhamentos, setAcompanhamentos] = useState<Acompanhamento[]>([]);
    const [proteinas, setProteinas] = useState<Acompanhamento[]>([]);
    const [bebidas, setBebidas] = useState<Acompanhamento[]>([]);
    const [sobremesas, setSobremesas] = useState<Acompanhamento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // const tamanhoService = new TamanhoService();
    // const acompanhamentoService = new AcompanhamentoService();
    // const proteinaService = new ProteinaService();
    // const bebidaService = new BebidaService();
    // const sobremesaService = new SobremesaService();

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

        const fetchAcompanhamentos = async () => {
            setIsLoading(true);
            try {
                // Simula um atraso na resposta
                await new Promise(resolve => setTimeout(resolve, 1000));
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
                await new Promise(resolve => setTimeout(resolve, 1000));
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
                await new Promise(resolve => setTimeout(resolve, 1000));
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
                await new Promise(resolve => setTimeout(resolve, 1000));
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

    if (isLoading) return <p>Carregando tamanhos e acompanhamentos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <DivTamanhoMarmita>
              <h1>Tamanho da MarmitEx</h1>
                {tamanhos.map((tamanho) => (
                    <TamanhoMarmitaCard key={tamanho.tamanho} dados={tamanho} />
                ))}
            </DivTamanhoMarmita>
            <DivAcompanhamentos>
             <h1>Acompanhamentos</h1>
                {acompanhamentos.map((acompanhamento) => (
                    <AcompanhamentoCard key={acompanhamento.nome} dados={acompanhamento} />
                ))}
            </DivAcompanhamentos>
            <DivProteinas>
             <h1>Proteínas</h1>
                {proteinas.map((proteina) => (
                    <ProteinaCard key={proteina.nome} dados={proteina} />
                ))}
            </DivProteinas>
            <DivBebidas>
             <h1>Bebidas</h1>
                {bebidas.map((bebida) => (
                    <BebidaCard key={bebida.nome} dados={bebida} />
                ))}
            </DivBebidas>
            <DivSobremesas>
             <h1>Sobremesas</h1>
                {sobremesas.map((sobremesa) => (
                    <SobremesaCard key={sobremesa.nome} dados={sobremesa} />
                ))}
            </DivSobremesas>
        </Container>
    )
}
