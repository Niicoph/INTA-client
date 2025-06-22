import { createContext, useState, type Dispatch, type SetStateAction } from 'react'; // import del type del dispatch (set)
import { type ConjuntoMaquinaria } from '@/types/maquinaria';

type MaquinariaContextInterface = {
  data: ConjuntoMaquinaria[];
  setData: Dispatch<SetStateAction<ConjuntoMaquinaria[]>>;
  remove: (id_conjunto: string) => void;
};

const MaquinariaContext = createContext<MaquinariaContextInterface | null>(null);

const MaquinariaProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ConjuntoMaquinaria[]>([]);

  const remove = (id_conjunto: string) => {
    setData((prev) => prev.filter((conjunto) => conjunto.id_conjunto !== id_conjunto));
  };

  return (
    <MaquinariaContext.Provider value={{ data, setData, remove }}>
      {children}
    </MaquinariaContext.Provider>
  );
};

export { MaquinariaContext, MaquinariaProvider };