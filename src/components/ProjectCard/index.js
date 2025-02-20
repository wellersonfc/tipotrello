import React from 'react';
import styles from './ProjectCard.module.css';
import { useParams } from "react-router-dom";
import { formatarData, formatarDataConclusao } from '../../utils';

// Função para gerar cor aleatória escura
const getRandomDarkColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)]; // Apenas tons escuros (0-6)
  }
  return color;
};

const ProjectCard = ({ project }) => {
  const cardColor = getRandomDarkColor();

  return (
    <div className={styles['project-card']} style={{ backgroundColor: cardColor }}>
      <a href={`/tarefas/${project.id}`}>
        <h3>{project.nome}</h3>
        <p>{project.descricao}</p>
        <span>Data de Início: {formatarDataConclusao(project.dateinicio)}</span>
      </a>
    </div>
  );
};

export default ProjectCard;

