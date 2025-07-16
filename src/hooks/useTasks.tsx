import { useState } from 'react';
import { useTaskStore } from '../stores';
import Swal from 'sweetalert2';
import { TaskStatus } from '../interfaces';

interface UseTasksProps {
  status: TaskStatus;
}

export default function useTasks({ status }: UseTasksProps) {
  const [onDragOver, setOnDragOver] = useState<boolean>(false);
  // isDragging: Está arrastando ?
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  async function handleAddTask() {
    const { isConfirmed, value } = await Swal.fire({
      title: 'Nueva Tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Escribe el nombre de la tarea',
      showCancelButton: true,
      customClass: {
        confirmButton: 'bg-blue-500 text-white',
        cancelButton: 'bg-gray-300 text-white',
      },
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre para la tarea';
        }
        return null;
      },
    });
    // Se o usuário clicar em "Confirmar" e fornecer um valor, adiciona a tarefa.
    if (isConfirmed) {
      addTask(value, status);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    // Movendo o mouse sobre o elemento.
    e.preventDefault();
    setOnDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    // Saindo do elemento.
    e.preventDefault();
    setOnDragOver(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    // Soltando o item arrastado.
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  }

  return {
    isDragging,
    onDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask,
  };
}
