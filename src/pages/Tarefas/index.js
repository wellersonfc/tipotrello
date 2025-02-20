import React, { useState, useEffect } from "react";
import DragInDrop from "../../components/DragInDrop"; // Ajuste o caminho conforme sua estrutura
import Modal from "../../components/Modal";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styles from "./Tarefas.module.css";
import { formatarDataConclusao } from "../../utils";

const Home = () => {
  const { projetoid } = useParams();
  const [tarefas, setTarefas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projeto, setProjeto] = useState({ nome: "", descricao: "", dateinicio: "" });
  const [activeId, setActiveId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTarefas();
    buscarProjeto();
  }, [projetoid]);

  const fetchTarefas = () => {
    try {
      const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
      const tarefasFiltradas = tarefasSalvas.filter(
        (tarefa) => tarefa.projetoId === projetoid
      );
      setTarefas(tarefasFiltradas);
    } catch (error) {
      toast.error("Erro ao buscar tarefas.");
    }
  };

  const buscarProjeto = () => {
    try {
      const projetosSalvos = JSON.parse(localStorage.getItem("projetos")) || [];
      const projetoEncontrado = projetosSalvos.find((proj) => proj.id === projetoid);
      if (projetoEncontrado) {
        setProjeto(projetoEncontrado);
      } else {
        toast.error("Projeto não encontrado.");
      }
    } catch (error) {
      toast.error("Erro ao carregar projeto.");
    }
  };

  const fecharModalEAtualizar = () => {
    setIsModalOpen(false);
    fetchTarefas();
    setEditingTask(null);
  };

  // Callback para quando um card é clicado para editar/remover
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h2>✔️ Tarefas do projeto - {projeto.nome}</h2>
        <div className={styles.controls}>
        <button onClick={() => {
          setEditingTask(null); // para criar uma nova tarefa
          setIsModalOpen(true);
        }} className={styles.btnAdd}>
          Adicionar
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={fecharModalEAtualizar}
          title={editingTask ? "✏️ Editar Tarefa" : "✏️ Cadastrar Tarefa"}
          formType={2}
          projectId={projetoid}
          task={editingTask} // ✅ Isso garante que a tarefa seja carregada no formulário
        />
      </div>
      </header>

      <DragInDrop
        tarefas={tarefas}
        setTarefas={setTarefas}
        activeId={activeId}
        setActiveId={setActiveId}
        onEditTask={handleEditTask}
      />

      <ToastContainer />
    </div>
  );
};

export default Home;
