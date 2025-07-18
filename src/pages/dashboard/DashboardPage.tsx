import {
  IoAccessibilityOutline,
  IoHeartOutline,
  IoInformationOutline,
  IoListOutline,
  IoLockClosedOutline,
  IoPawOutline,
} from 'react-icons/io5';
import { WhiteCard } from '../../components';
import { useAuthStore, useBearStore, usePersonStore, useTaskStore } from '../../stores';
import RequestInfo from '../../components/shared/request-info/RequestInfo';

export const Dashboard = () => {
  const computedBears = useBearStore((state) => state.totalBears);
  const firstName = usePersonStore((state) => state.firstName);
  const lastName = usePersonStore((state) => state.lastName);
  const tasks = useTaskStore((state) => state.tasks);
  const taskCount = Object.keys(tasks).length;
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Información colectiva de varios stores de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <WhiteCard centered>
          <IoPawOutline
            size={50}
            className="text-indigo-600"
          />
          <h2>Osos</h2>
          <p>{computedBears()}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoAccessibilityOutline
            size={50}
            className="text-indigo-600"
          />
          <h2>Persona</h2>
          <p>
            {firstName} {lastName}
          </p>
        </WhiteCard>

        <WhiteCard centered>
          <IoListOutline
            size={50}
            className="text-indigo-600"
          />
          <h2>Tareas</h2>
          <p>{taskCount}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoHeartOutline
            size={50}
            className="text-indigo-600"
          />
          <h2>Boda</h2>
          <p>Información</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoLockClosedOutline
            size={50}
            className="text-indigo-600"
          />
          <h2>Auth</h2>
          <p>{user?.fullName}</p>
        </WhiteCard>

        <WhiteCard className="col-span-3">
          <IoInformationOutline
            size={50}
            className="text-indigo-600"
          />
          <RequestInfo />
        </WhiteCard>
      </div>
    </>
  );
};
