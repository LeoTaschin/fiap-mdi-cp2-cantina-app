/**
 * FIAP Checkpoint Tracker - Dados de Checkpoints
 * 
 * Estrutura de dados para checkpoints e disciplinas
 */

export interface Subject {
  id: string;
  name: string;
  code: string;
  professor: string;
  color: string;
}

export interface Checkpoint {
  id: string;
  title: string;
  subjectId: string;
  dueDate: Date;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  weight?: number;
}

// Disciplinas da FIAP
export const SUBJECTS: Subject[] = [
  {
    id: '1',
    name: 'Mobile Development & IoT',
    code: 'MDI',
    professor: 'Prof. Hercules Ramos',
    color: '#003DA5', // Azul FIAP
  },
  {
    id: '2',
    name: 'Engenharia de Software',
    code: 'ES',
    professor: 'Prof. João Silva',
    color: '#FF6B35', // Laranja FIAP
  },
  {
    id: '3',
    name: 'Banco de Dados',
    code: 'BD',
    professor: 'Prof. Maria Santos',
    color: '#7C3AED', // Roxo
  },
  {
    id: '4',
    name: 'Arquitetura de Software',
    code: 'AS',
    professor: 'Prof. Carlos Oliveira',
    color: '#10B981', // Verde
  },
  {
    id: '5',
    name: 'Segurança da Informação',
    code: 'SI',
    professor: 'Prof. Ana Costa',
    color: '#F59E0B', // Âmbar
  },
];

// Checkpoints de exemplo
export const CHECKPOINTS: Checkpoint[] = [
  {
    id: 'cp1',
    title: 'Checkpoint 1 - Mobile Development & IoT',
    subjectId: '1',
    dueDate: new Date(2026, 3, 30), // 30 de Março
    description: 'Desenvolver um MVP funcional em React Native',
    status: 'upcoming',
    weight: 25,
  },
  {
    id: 'cp2',
    title: 'Checkpoint 2 - Engenharia de Software',
    subjectId: '2',
    dueDate: new Date(2026, 4, 15), // 15 de Abril
    description: 'Documentação e análise de requisitos',
    status: 'upcoming',
    weight: 20,
  },
  {
    id: 'cp3',
    title: 'Checkpoint 1 - Banco de Dados',
    subjectId: '3',
    dueDate: new Date(2026, 4, 5), // 5 de Abril
    description: 'Design do modelo relacional',
    status: 'upcoming',
    weight: 30,
  },
  {
    id: 'cp4',
    title: 'Checkpoint 1 - Arquitetura de Software',
    subjectId: '4',
    dueDate: new Date(2026, 4, 20), // 20 de Abril
    description: 'Padrões de design e arquitetura',
    status: 'upcoming',
    weight: 25,
  },
  {
    id: 'cp5',
    title: 'Checkpoint 1 - Segurança da Informação',
    subjectId: '5',
    dueDate: new Date(2026, 3, 25), // 25 de Março
    description: 'Análise de vulnerabilidades',
    status: 'upcoming',
    weight: 20,
  },
  {
    id: 'cp6',
    title: 'Checkpoint 2 - Mobile Development & IoT',
    subjectId: '1',
    dueDate: new Date(2026, 5, 10), // 10 de Maio
    description: 'Integração com APIs e persistência de dados',
    status: 'upcoming',
    weight: 25,
  },
];

/**
 * Função para obter o status em português
 */
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    completed: 'Concluído',
    'in-progress': 'Em Progresso',
    upcoming: 'Próximo',
  };
  return labels[status] || status;
};

/**
 * Função para obter a cor do status
 */
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    completed: '#4CAF50',
    'in-progress': '#FFC107',
    upcoming: '#FF6B35',
  };
  return colors[status] || '#999999';
};

/**
 * Função para calcular dias até o checkpoint
 */
export const getDaysUntil = (dueDate: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  const timeDiff = dueDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Função para formatar data
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('pt-BR', options);
};

/**
 * Função para obter a disciplina por ID
 */
export const getSubjectById = (id: string): Subject | undefined => {
  return SUBJECTS.find((subject) => subject.id === id);
};

/**
 * Função para obter checkpoints por disciplina
 */
export const getCheckpointsBySubject = (subjectId: string): Checkpoint[] => {
  return CHECKPOINTS.filter((checkpoint) => checkpoint.subjectId === subjectId);
};

/**
 * Função para ordenar checkpoints por data
 */
export const sortCheckpointsByDate = (checkpoints: Checkpoint[]): Checkpoint[] => {
  return [...checkpoints].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
};
