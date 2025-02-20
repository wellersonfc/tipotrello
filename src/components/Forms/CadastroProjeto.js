import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styles from './StyleForms.module.css';

const CadastroProjeto = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dateinicio, setDateinicio] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const projeto = { nome, descricao, dateinicio };
    setLoading(true);

    try {
        const projetosSalvos = JSON.parse(localStorage.getItem('projetos')) || [];
        
        projeto.id = String(new Date().getTime());
        
        const novosProjetos = [...projetosSalvos, projeto];
        
        localStorage.setItem('projetos', JSON.stringify(novosProjetos));
        
        setLoading(false);
        toast.success('Projeto criado com sucesso!');

        setNome('');
        setDescricao('');
        setDateinicio(new Date().toISOString().split('T')[0]);

        setTimeout(() => {
            navigate(`/tarefas/${projeto.id}`);
            setTimeout(() => {
                window.dispatchEvent(new Event('fecharModal')); 
            }, 100); 
        }, 2000); 
    } catch (error) {
        setLoading(false);
        toast.error('Erro ao salvar o projeto.');
    }
};


  return (
    <div className="form-container">
      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className={styles['input-group']}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="dateinicio">Data do inicio do Projeto</label>
            <input
              type="date"
              id="dateinicio"
              value={dateinicio}
              onChange={(e) => setDateinicio(e.target.value)}
              required
            />
          </div>
          <div className={styles['input-group']}>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="submit-button-container">
            <button type="submit" className={styles['submit-button']} disabled={loading}>
              {loading ? 'Carregando...' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CadastroProjeto;