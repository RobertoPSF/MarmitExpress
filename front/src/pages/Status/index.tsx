import { Container, Response, StatusColumn } from './styles';
import { useEffect, useState } from 'react';
import HealthService from '../../services/HealthService';

export default function Status() {
  const [statusMessage, setStatusMessage] = useState<string>('Carregando...');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const healthService = new HealthService();

      try {
        const response = await healthService.checkHealth();

        if (response && response.status === 200) {
          setStatusMessage('Site funcionando corretamente');
          setIsError(false);
        } else {
          setStatusMessage('Erro ao obter status do site');
          setIsError(true);
        }
      } catch (error) {
        setStatusMessage('Erro ao conectar com o servidor');
        setIsError(true);
        console.error(error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <Container>
      <StatusColumn>
        <div>
          Health: <Response $isError={isError}>{statusMessage}</Response>
        </div>
      </StatusColumn>
    </Container>
  );
}
