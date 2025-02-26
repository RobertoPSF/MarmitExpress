import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/'); // Redireciona para a home se não estiver logado
    }
  }, [navigate]);
}
