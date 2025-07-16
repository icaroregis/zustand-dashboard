import { create, StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Task, TaskStatus } from '../../interfaces';

interface TaskState {
  tasks: Record<string, Task>;
  draggingTaskId: string | undefined;
  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: (taskId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [['zustand/immer', never]]> = (set, get) => ({
  draggingTaskId: undefined,

  tasks: {
    'ABC-1': {
      id: 'ABC-1',
      title: 'Task 1',
      status: 'open',
    },
    'ABC-2': {
      id: 'ABC-2',
      title: 'Task 2',
      status: 'in-progress',
    },
    'ABC-3': {
      id: 'ABC-3',
      title: 'Task 3',
      status: 'open',
    },
    'ABC-4': {
      id: 'ABC-4',
      title: 'Task 4',
      status: 'open',
    },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    // O método Object.values sempre recebe um objeto como argumento e retorna um array contendo apenas os valores desse objeto (ignorando as chaves).
    return Object.values(tasks).filter((task) => task.status === status);
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = { id: uuidv4(), title, status };

    // ! 1 forma
    // ? Usando immer middleware
    // ? Para objetos aninhados essa é a melhor maneira de atualizar o estado
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    // ! 2 forma
    // ? Usando função produce do immer
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   }),
    // );

    // ! 3 forma
    // ? Forma nativa do Zustand
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));
  },

  setDraggingTaskId(taskId: string) {
    set({ draggingTaskId: taskId });
    console.log('Dragging task set:', taskId);
  },

  removeDraggingTaskId(taskId: string) {
    if (get().draggingTaskId === taskId) {
      set({ draggingTaskId: undefined });
    }
  },

  // ! O estado retornado por get() é somente leitura (readonly). Ao tentar modificar diretamente tasks[taskId].status = status, você está violando essa regra do immer.
  // ? Para modificar o estado, você deve usar a função set() fornecida pelo Zustand, que é compatível com o immer.
  changeTaskStatus(taskId: string, status: TaskStatus) {
    set((state) => {
      if (state.tasks[taskId]) {
        state.tasks[taskId].status = status;
      } else {
        console.warn(`Task ${taskId} not found`);
      }
    });
  },

  onTaskDrop(status: TaskStatus) {
    const draggingTaskId = get().draggingTaskId;
    if (draggingTaskId) {
      get().changeTaskStatus(draggingTaskId, status);
      get().removeDraggingTaskId(draggingTaskId);
    }
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(storeApi), {
      name: 'task-storage',
    }),
  ),
);
