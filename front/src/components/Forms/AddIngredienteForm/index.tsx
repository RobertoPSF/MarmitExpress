import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import IngredienteService from '../../../services/IngredienteService';
import Notification from '../../Notification';

interface AddIngredienteProps {
  onClose: () => void;
}

const AddIngredienteForm: React.FC<AddIngredienteProps> = ({ onClose }) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);
  const [formDataAddIngrediente, setFormDataAddIngrediente] = useState({
    nomeIngrediente: '',
  });

  const handleChangeAddIngrediente = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormDataAddIngrediente({
      ...formDataAddIngrediente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAddIngrediente = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }
      const ingredienteService = new IngredienteService();
      const response = await ingredienteService.createIngrediente({
        nome: formDataAddIngrediente.nomeIngrediente,
      });

      if (response?.status === 200) {
        
        setNotificacao({ message: "Ingrediente adicionado com sucesso!", type: "success" });
        
        // Fecha o modal depois de 0.5s (tempo suficiente para o usuário ler a notificação)
        setTimeout(() => {
          setNotificacao(null);
          onClose(); // Fecha o modal de AddIngrediente
          window.location.reload(); // Recarrega a página após a atualização
        }, 500);
      } else {
        setNotificacao({ message: "Erro ao adicionar Ingrediente. Verifique os dados e tente novamente", type: "error" });
      }
    } catch (error) {
      setNotificacao({ message: "Erro ao conectar com o servidor.", type: "error" });
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <Input
        placeHolderContainer="Nome do Ingrediente"
        name="nomeIngrediente"
        placeholder="Ex: Arroz Branco"
        value={formDataAddIngrediente.nomeIngrediente}
        onChange={handleChangeAddIngrediente}
      />

      <Button type="orange" onClick={handleSubmitAddIngrediente}>
        Adicionar Ingrediente
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

export default AddIngredienteForm;
