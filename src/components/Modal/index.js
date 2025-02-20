import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import CadastroProjeto from '../Forms/CadastroProjeto';
import CadastroTarefa from '../Forms/CadastroTarefa';

const Modal = ({ isOpen, onClose, title, formType, projectId, task }) => {
  
  // Fecha o modal ao pressionar "Esc"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Fecha o modal ao clicar fora
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
          <hr />
        </div>
        <div className={styles.modalBody}>
          {formType === 1 ? (
            <CadastroProjeto onClose={onClose} />
          ) : (
            <CadastroTarefa projectId={projectId} task={task} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
