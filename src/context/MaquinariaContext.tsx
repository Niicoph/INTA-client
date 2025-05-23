import { createContext, useState, type Dispatch } from 'react'; // import del type del dispatch (set)
import { type MaquinariaFormData } from '@/schemas/MaquinariaNew/types';

type MaquinariaContextInterface = {
  data: MaquinariaFormData[];
  setData: Dispatch<React.SetStateAction<MaquinariaFormData[]>>;
};

const MaquinariaContext = createContext<MaquinariaContextInterface | null>(null);

const MaquinariaProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<MaquinariaFormData[]>([]);

  return (
    <MaquinariaContext.Provider value={{ data, setData }}>{children}</MaquinariaContext.Provider>
  );
};

export { MaquinariaContext, MaquinariaProvider };
