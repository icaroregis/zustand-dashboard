import { BlackBearCard } from './components/BlackBearCard';
import { PolarBearCard } from './components/PolarBearCard';
import { PandaBearCard } from './components/PandaBearCard';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBearCard />
        <PolarBearCard />
        <PandaBearCard />
      </div>
    </>
  );
};
