import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Restaurantes from './pages/Restaurantes';
import MeusPedidos from './pages/MeusPedidos';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import Status from './pages/Status';
import Parceiro from './pages/Parceiro';
import TopContainer from './components/TopContainer';
import Header from './components/Header';
import Blank from './pages/BlankPage';
import RestaurantePage from './pages/RestaurantePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <TopContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/meus-pedidos" element={<MeusPedidos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/status" element={<Status />} />
        <Route path="/auth/parceiro" element={<Parceiro />} />
        <Route path="/blank" element={<Blank />} />
        <Route path="/restaurante/:id" element={<RestaurantePage />} />
      </Routes>
    </BrowserRouter>
  );
}
