import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './StyleForms.module.css';
import { STATUS } from '../../utils';

const CadastroTarefa = ({ projectId, task, onClose }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('backlog');
  const [datainicio, setDatainicio] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastId, setToastId] = useState(null); // Armazena o ID do toast

  // **Preenche os campos ao editar**
  useEffect(() => {
    if (task) {
      setTitulo(task.titulo || '');
      setDescricao(task.descricao || '');
      setStatus(task.status || 'backlog');
      setDatainicio(task.datainicio || '');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const novaTarefa = {
      id: task ? task.id : String(new Date().getTime()),
      titulo,
      descricao,
      status,
      datainicio,
      projetoId: projectId,
    };

    try {
      let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

      let tarefasOutrosProjetos = tarefasSalvas.filter((t) => t.projetoId !== projectId);
      let tarefasProjetoAtual = tarefasSalvas.filter((t) => t.projetoId === projectId);

      if (task) {
        tarefasProjetoAtual = tarefasProjetoAtual.map((t) =>
          t.id === task.id ? novaTarefa : t
        );
      } else {
        tarefasProjetoAtual.push(novaTarefa);
      }

      const tarefasAtualizadas = [...tarefasOutrosProjetos, ...tarefasProjetoAtual];
      localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));

      toast.success(task ? 'Tarefa editada com sucesso!' : 'Tarefa criada com sucesso!');

      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      toast.error('Erro ao salvar a tarefa.');
    }
  };

  // **Função para excluir a tarefa com Toastify**
  const handleDelete = () => {
    if (!task) return;

    const id = toast.info(
      <div>
        <p>Tem certeza que deseja excluir esta tarefa?</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => confirmDelete(id)} style={{ background: "#dc3545", color: "#fff", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
            Sim, Excluir
          </button>
          <button onClick={() => toast.dismiss(id)} style={{ background: "#6c757d", color: "#fff", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
            Cancelar
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );

    setToastId(id); // Salva o ID do toast
  };

  // **Função que realmente exclui a tarefa**
  const confirmDelete = (id) => {
    try {
      let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
      const tarefasAtualizadas = tarefasSalvas.filter((t) => t.id !== task.id);

      localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
      toast.dismiss(id); // Fecha o toast de confirmação
      toast.success("Tarefa excluída com sucesso!");
      
      onClose(); // Fecha o modal
    } catch (error) {
      toast.error("Erro ao excluir a tarefa.");
    }
  };

  return (
    <div className="form-container">
      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className={styles['input-group']}>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              {STATUS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
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

          <div className={styles['input-group']}>
            <label htmlFor="datainicio">Data Início</label>
            <input
              type="date"
              id="datainicio"
              value={datainicio}
              onChange={(e) => setDatainicio(e.target.value)}
              required
            />
          </div>

          <div className="submit-button-container">
            <button type="submit" className={styles['submit-button']} disabled={loading}>
              {loading ? 'Carregando...' : task ? 'Salvar Alterações' : 'Criar Tarefa'}
            </button>
          </div>

          {/* **Se estiver editando, exibe o botão de excluir** */}
          {task && (
            <div className="delete-button-container">
              <button type="button" className={styles['delete-button']} onClick={handleDelete}>
                Excluir Tarefa
              </button>
            </div>
          )}
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CadastroTarefa;

