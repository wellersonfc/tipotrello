import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import Modal from '../../components/Modal';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const menuRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleAccordionSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section); 
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <><header className={styles.header}>
      <a href="/">
        <div className={styles.logo}>TipoTrello</div>
      </a>
      <div className={styles.desktopNav}>
        <a onClick={handleOpenModal} className={styles.createProject}>
          Cadastrar Projeto
        </a>
      </div>
      <button
        className={styles.menuToggle}
        onClick={toggleDrawer}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      {/* Mobile */}
      <div
        ref={menuRef}
        className={`${styles.accordion} ${isDrawerOpen ? styles.open : ''}`}
      >
        <button
          className={styles.closeMenu}
          onClick={() => setIsDrawerOpen(false)}
        >
          ✖
        </button>
        <div className={styles.accordionSection}>
          <button
            className={styles.accordionToggle}
            onClick={() => toggleAccordionSection('criarProjeto')}
          >
            Cadastrar Projeto
          </button>
          {expandedSection === 'criarProjeto' && (
            <ul className={styles.accordionContent}>
              <li><a onClick={handleOpenModal}>Criar Novo Projeto</a></li>
            </ul>
          )}
        </div>
      </div>
    </header>  
    <div className={styles['project-cards']}>
    <Modal 
      isOpen={isModalOpen} 
      onClose={handleCloseModal} 
      title="✏️ Cadastrar Projeto" 
      formType={1} 
      />
    </div></>   
  );
};

export default Header;
