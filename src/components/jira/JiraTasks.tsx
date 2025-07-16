import { cn } from '../../utils/cn';
import SingleTasks from './SingleTask';
import useTasks from '../../hooks/useTasks';
import { Task, TaskStatus } from '../../interfaces';
import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
  const { isDragging, onDragOver, handleDragOver, handleDragLeave, handleDrop, handleAddTask } = useTasks({ status });

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        '!text-black relative border-4 flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]',
        {
          'border-blue-500 border-dotted': isDragging,
          'border-green-500 border-dotted': isDragging && onDragOver,
        },
      )}
      aria-label={`Lista de tarefas: ${title}`}>
      {/* Task Header */}
      <header className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button
          onClick={handleAddTask}
          aria-label={`Opções para ${title}`}
          aria-haspopup="true">
          <IoAddOutline />
        </button>
      </header>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.length === 0 ? (
          <p className="mt-4 text-center text-gray-500">No hay tareas {title.toLowerCase()}</p>
        ) : (
          tasks.map((task) => (
            <SingleTasks
              key={task.id}
              task={task}
            />
          ))
        )}
      </div>
    </section>
  );
};
