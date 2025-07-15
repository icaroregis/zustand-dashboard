import { create, StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { devtools } from 'zustand/middleware';
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

const storeApi: StateCreator<TaskState> = (set, get) => ({
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
    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
    }));
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

  changeTaskStatus(taskId: string, status: TaskStatus) {
    const tasks = get().tasks;
    if (tasks[taskId]) {
      tasks[taskId].status = status;
      set({ tasks });
    } else {
      console.warn(`Task ${taskId} not found`);
    }
  },

  onTaskDrop(status: TaskStatus) {
    const draggingTaskId = get().draggingTaskId;
    if (draggingTaskId) {
      get().changeTaskStatus(draggingTaskId, status);
      get().removeDraggingTaskId(draggingTaskId);
    }
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
