import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import ProjectCard from '../../components/ProjectCard';


const Home = () => {
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    const fetchProjects = () => {
        setLoading(true);

        try {
            // Recupera os projetos do localStorage
            const projetosSalvos = JSON.parse(localStorage.getItem('projetos')) || [];
            setProjects(projetosSalvos);
        } catch (error) {
            console.error("Erro ao carregar projetos:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchProjects();
}, [page]);


  const loadMoreProjects = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h2>📂 Meus Projetos</h2> 
      </header>
      <hr className={styles.separator} /> 

      {projects.length <= 0 && !loading && (
        <div className={styles['no-projects-message']}>
          <p>Cadastre seu Projeto.</p>
        </div>
      )}

      <div className={styles['project-cards']}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Home;
