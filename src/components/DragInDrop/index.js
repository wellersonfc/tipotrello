import React, { memo } from "react";
import { DndContext, DragOverlay, rectIntersection, useDroppable} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./DragInDrop.module.css";
import {STATUS} from "../../utils";
import TaskCard from "../TaskCard";


const DragInDrop = ({ tarefas, setTarefas, activeId, setActiveId, onEditTask }) => {
  const atualizarTarefas = (novasTarefas) => {
    setTarefas(novasTarefas);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tarefas.find((t) => t.id === active.id);
    if (!activeTask) return;
    const activeContainer = activeTask.status;
    const overContainer = over.data?.current?.sortable?.containerId || over.id;

    // Verifica se o status de destino existe
    if (!STATUS.some((s) => s.value === overContainer)) return;

    if (activeContainer !== overContainer) {
      // Atualiza o status quando o card muda de coluna
      const novasTarefas = tarefas.map((tarefa) =>
        tarefa.id === active.id ? { ...tarefa, status: overContainer } : tarefa
      );
      atualizarTarefas(novasTarefas);
    } else {
      // Reordena dentro da mesma coluna
      const tarefasDaColuna = tarefas.filter((t) => t.status === activeContainer);
      const oldIndex = tarefasDaColuna.findIndex((t) => t.id === active.id);
      const newIndex = tarefasDaColuna.findIndex((t) => t.id === over.id);
      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(tarefasDaColuna, oldIndex, newIndex);
        const novasTarefas = tarefas.map((tarefa) => {
          const index = newOrder.findIndex((item) => item.id === tarefa.id);
          return index !== -1 ? newOrder[index] : tarefa;
        });
        atualizarTarefas(novasTarefas);
      }
    }
    setActiveId(null);
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragStart={(event) => setActiveId(event.active.id)}
      onDragEnd={onDragEnd}
    >
      <div className={styles.board}>
        {STATUS.map((status) => (
          <Column
            key={status.value}
            id={status.value}
            label={status.label}
            tarefas={tarefas.filter((t) => t.status === status.value)}
            onEditTask={onEditTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeId && (
          <TaskOverlay tarefa={tarefas.find((t) => t.id === activeId)} />
        )}
      </DragOverlay>
    </DndContext>
  );
};

const Column = memo(({ id, label, tarefas, onEditTask }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`${styles.column} ${isOver ? styles.columnActive : ""}`}
    >
      <h3>{label}</h3>
      <SortableContext items={tarefas.map((t) => t.id)}>
        {tarefas.map((tarefa) => (
          <Task key={tarefa.id} tarefa={tarefa} onEdit={onEditTask} />
        ))}
      </SortableContext>
    </div>
  );
});

const Task = memo(({ tarefa, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: tarefa.id,
      data: { sortable: { containerId: tarefa.status } },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className={styles.task}>
      <TaskCard
        id={tarefa.id}
        titulo={tarefa.titulo}
        descricao={tarefa.descricao}
        onEdit={() => onEdit(tarefa)} 
      />
    </div>
  );
});



const TaskOverlay = ({ tarefa }) => {
  return (
    <div className={styles.task} style={{ cursor: "grabbing", opacity: 0.9 }}>
      <p>{tarefa.titulo}</p>
      <p>{tarefa.descricao}</p>
    </div>
  );
};

export default memo(DragInDrop);
