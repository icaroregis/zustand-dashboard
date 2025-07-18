import { IoReorderTwoOutline } from 'react-icons/io5';
import { Task } from '../../interfaces';
import { useTaskStore } from '../../stores';

interface JiraTaskProps {
  task: Task;
}

export default function SingleTasks({ task }: Readonly<JiraTaskProps>) {
  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaskStore((state) => state.removeDraggingTaskId);

  return (
    <div
      draggable
      onDragStart={() => {
        setDraggingTaskId(task.id);
      }}
      onDragEnd={() => {
        removeDraggingTaskId(task.id);
      }}
      className="mt-5 flex items-center justify-between p-2">
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <button
        className="h-6 w-6 text-navy-700 cursor-pointer"
        aria-label="Mover tarefa número 1">
        <IoReorderTwoOutline />
      </button>
    </div>
  );
}
