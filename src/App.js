import React, { useState } from 'react';
import AppRoutes from './Routes'; // Importa o arquivo de rotas criado
import './styles/App.scss';

const App = () => {
  const [cliente, setCliente] = useState(null);

  const handleFormSubmit = (dados) => {
    setCliente(dados);
  };

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;