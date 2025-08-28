import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/Home';
import TecnicaPage from './pages/Tecnica';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotas "filhas" aparecem dentro do <Outlet /> */}
          <Route index element={<HomePage />} />
          <Route path='Tecnica' element={<TecnicaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
