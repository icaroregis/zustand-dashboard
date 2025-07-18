import { WhiteCard } from '../../components';
import { useWeddingBoundStore } from '../../stores/wedding';

export const WeddingInvitationPage = () => {
  const firstName = useWeddingBoundStore((state) => state.firstName);
  const lastName = useWeddingBoundStore((state) => state.lastName);
  const setFirstName = useWeddingBoundStore((state) => state.setFirstName);
  const setLastName = useWeddingBoundStore((state) => state.setLastName);
  const guestCount = useWeddingBoundStore((state) => state.guestCount);
  const setGuestCount = useWeddingBoundStore((state) => state.setGuestCount);
  const eventYYYYMMDD = useWeddingBoundStore((state) => state.eventYYYYMMDD());
  const eventHHMM = useWeddingBoundStore((state) => state.eventHHMM());
  const setEventDate = useWeddingBoundStore((state) => state.setEventDate);
  const setEventTime = useWeddingBoundStore((state) => state.setEventTime);
  const eventDate = useWeddingBoundStore((state) => state.eventDate);
  const isConfirmation = useWeddingBoundStore((state) => state.isConfirmed);
  const setIsConfirmed = useWeddingBoundStore((state) => state.setIsConfirmed);

  const formatTimeAMPM = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ firstName, lastName, guestCount, eventDate, isConfirmation });
  }

  return (
    <>
      <h1>Invitación de Boda</h1>
      <p>Zustand segmentado en slices</p>
      <hr />

      <WhiteCard className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form
            onSubmit={onSubmit}
            aria-label="Formulario de invitación de boda">
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">Primer Nombre</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Primer Nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">¿Cuántos invitados traerá?</label>
              <input
                type="number"
                name="guestNumber"
                id="guestNumber"
                placeholder="5"
                min="0"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
              />
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">Fecha de evento</label>
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    value={eventYYYYMMDD}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">Hora del evento</label>
                  <input
                    type="time"
                    name="eventTime"
                    id="eventTime"
                    value={eventHHMM}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                  <p className="mt-1 text-sm text-gray-600">Hora seleccionada: {formatTimeAMPM(eventDate)}</p>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">¿Tu también vendrás?</label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton1"
                    className="h-5 w-5"
                    checked={isConfirmation === true}
                    onChange={() => setIsConfirmed(true)}
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">Si</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton2"
                    className="h-5 w-5"
                    checked={isConfirmation === false}
                    onChange={() => setIsConfirmed(false)}
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">No</label>
                </div>
              </div>
            </div>

            <div>
              <button className="w-full rounded-md bg-[#6A64F1] py-3 px-6 text-center text-base font-semibold text-white outline-none hover:bg-[#5b54d8]">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};
