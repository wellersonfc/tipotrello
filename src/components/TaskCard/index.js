import React from 'react';
import styles from './TaskCard.module.css';

const TaskCard = ({ id, titulo, descricao, onEdit }) => {
  const handleEdit = (e) => {
    e.stopPropagation(); // Evita conflito com drag & drop
    onEdit(); // Agora chama o modal global
  };

  return (
    <div className={styles.task}>
      <div className={styles.taskHeader}>
        <p className={styles.taskTitle}>{titulo}</p>
        <button
          className={styles.editButton}
          onClick={handleEdit}
          onPointerDown={(e) => e.stopPropagation()} // Evita interferência do drag & drop
        >
          ✏️
        </button>
      </div>
      <p className={styles.taskDescription}>{descricao}</p>
    </div>
  );
};

export default React.memo(TaskCard);
