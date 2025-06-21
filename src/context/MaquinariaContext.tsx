import { createContext, useState, type Dispatch } from 'react'; // import del type del dispatch (set)
import { type CostoEconomico } from '@/types/maquinaria';

type MaquinariaContextInterface = {
  data: CostoEconomico[];
  setData: Dispatch<React.SetStateAction<CostoEconomico[]>>;
};

const MaquinariaContext = createContext<MaquinariaContextInterface | null>(null);

const MaquinariaProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<CostoEconomico[]>([]);

  return (
    <MaquinariaContext.Provider value={{ data, setData }}>{children}</MaquinariaContext.Provider>
  );
};

if (!MaquinariaContext) {
  throw new Error('MaquinariaContext must be used within a MaquinariaProvider');
}

export { MaquinariaContext, MaquinariaProvider };
