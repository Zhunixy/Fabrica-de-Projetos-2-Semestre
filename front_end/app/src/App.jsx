import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import TecnicaPage from './pages/Tecnica';
import PagamentoPage from './pages/Pagamentos';
import Logar from './pages/Login';
import UsuarioPage from './pages/Usuarios';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas "filhas" aparecem dentro do <Outlet /> */}
          <Route index element={<HomePage />} />
          <Route path='Tecnica' element={<TecnicaPage />} />
          <Route path="Pagamentos" element={<PagamentoPage />} />
          <Route path="Login" element ={<Logar/>}/>
          <Route path="Usuarios" element = {<UsuarioPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
