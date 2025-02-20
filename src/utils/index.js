// utils.js
export const formatarData = (dataISO) => {
    if (!dataISO);
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
  };
  
export  const formatarDataConclusao = (data) => {
    if (!data) return '';  
    const dataObj = new Date(data);
    dataObj.setDate(dataObj.getDate() + 1);
    const dia = String(dataObj.getDate()).padStart(2, '0'); 
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); 
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
};

export const STATUS = [
  { value: "backlog", label: "Backlog" },
  { value: "afazer", label: "A Fazer" },
  { value: "emandamento", label: "Em Andamento" },
  { value: "fasedeteste", label: "Fase de Teste" },
  { value: "concluido", label: "Concluído" },
];