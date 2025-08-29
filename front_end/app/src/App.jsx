import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/Home';
import TecnicaPage from './pages/Tecnica/tecnica';
import PagamentoPage from './pages/Pagamentos/pagamento';
import VerificaPage from './pages/Verificacao/verifica';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas "filhas" aparecem dentro do <Outlet /> */}
          <Route index element={<HomePage />} />
          <Route path='Tecnica' element={<TecnicaPage />} />
          <Route path="/Pagamentos" element={<PagamentoPage />} />
          <Route path="/Verificacao" element={<VerificaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
