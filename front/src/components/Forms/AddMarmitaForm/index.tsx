import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import MarmitaService from '../../../services/MarmitaService';
import Notification from '../../Notification';

interface AddMarmitaProps {
  onClose: () => void;
}

const AddMarmitaForm: React.FC<AddMarmitaProps> = ({ onClose }) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);
  const [formDataAddMarmita, setFormDataAddMarmita] = useState({
    nomeMarmita: '',
    precoMarmita: 0,
    quantidadeMarmita: 0,
  });

  const handleChangeAddMarmita = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataAddMarmita({
      ...formDataAddMarmita,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddMarmita = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT

      const marmitaService = new MarmitaService();
      const response = await marmitaService.createMarmita({
        nome: formDataAddMarmita.nomeMarmita,
        preco: formDataAddMarmita.precoMarmita,
        quantidade: formDataAddMarmita.quantidadeMarmita,
        restauranteId: payload.id,
      });

      if (response?.status === 200) {
        setNotificacao({ message: "ItMarmita adicionado com sucesso!", type: "success" });
        
        // Fecha o modal depois de 0.5s (tempo suficiente para o usuário ler a notificação)
        setTimeout(() => {
          setNotificacao(null);
          onClose(); // Fecha o modal
          window.location.reload(); // Recarrega a página após a atualização
        }, 500);

      } else {

        setNotificacao({ message: "Erro ao adicionar Marmita. Verifique os dados e tente novamente.", type: "success" });
      }
    } catch (error) {
      setNotificacao({ message: "Erro ao conectar com o servidor.", type: "error" });
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <Input
        placeHolderContainer="Nome do Marmita"
        name="nomeMarmita"
        placeholder="Ex: Marmita Simples"
        value={formDataAddMarmita.nomeMarmita}
        onChange={handleChangeAddMarmita}
      />
      <Input
        placeHolderContainer="Preço da Marmita"
        name="precoMarmita"
        type="number"
        placeholder="Ex: 10.50"
        value={formDataAddMarmita.precoMarmita}
        onChange={handleChangeAddMarmita}
      />
      <Input
        placeHolderContainer="Quantidade da Marmita"
        name="quantidadeMarmita"
        type="number"
        placeholder="Ex: 20"
        value={formDataAddMarmita.quantidadeMarmita}
        onChange={handleChangeAddMarmita}
      />

      <Button type="orange" onClick={handleSubmitAddMarmita}>
        Adicionar Marmita
      </Button>

      {notificacao && (
        <Notification
          message={notificacao.message}
          type={notificacao.type}
          onClose={() => setNotificacao(null)}
        />
      )}
    </>
  );
};

export default AddMarmitaForm;
