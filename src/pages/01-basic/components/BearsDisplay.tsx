import { useShallow } from 'zustand/shallow';
import { WhiteCard } from '../../../components';
import { useBearStore } from '../../../stores';

export default function BearsDisplay() {
  // useShallow previne re-renderizações desnecessárias quando valores de referência não mudaram
  // Compara os valores retornados superficialmente ao invés de por referência de objeto
  const bears = useBearStore(useShallow((state) => state.bears));
  const doNothing = useBearStore((state) => state.doNothing);
  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h2>Osos</h2>
      <div className="flex flex-col gap-2">
        <button onClick={doNothing}>Fazer Nada</button>
        <button onClick={addBear}>Adicionar Oso</button>
        <button onClick={clearBears}>Limpar Osos</button>
      </div>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
}
