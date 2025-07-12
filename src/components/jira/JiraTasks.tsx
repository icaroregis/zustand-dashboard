import { IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline, IoReorderTwoOutline } from 'react-icons/io5';
import { TaskStatus } from '../../interfaces';

interface Props {
  title: string;
  value: TaskStatus;
}

export const JiraTasks = ({ title }: Props) => {
  return (
    <section
      className="!text-black relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]"
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
          aria-label={`Opções para ${title}`}
          aria-haspopup="true">
          <IoEllipsisHorizontalOutline />
        </button>
      </header>

      {/* Task Items */}
      <div className="h-full w-full">
        <div className="mt-5 flex items-center justify-between p-2">
          <div className="flex items-center justify-center gap-2">
            <p className="text-base font-bold text-navy-700">Tarea número 1</p>
          </div>
          <button
            className="h-6 w-6 text-navy-700 cursor-pointer"
            aria-label="Mover tarefa número 1">
            <IoReorderTwoOutline />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between p-2">
          <div className="flex items-center justify-center gap-2">
            <p className="text-base font-bold text-navy-700">Tarea número 2</p>
          </div>
          <button
            className="h-6 w-6 text-navy-700 cursor-pointer"
            aria-label="Mover tarefa número 2">
            <IoReorderTwoOutline />
          </button>
        </div>
      </div>
    </section>
  );
};
