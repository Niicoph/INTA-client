import { createContext, useState, type Dispatch } from 'react';
import { type PresentacionFormData } from '@/schemas/Sanidad/types';

/**
 * Context contiene una lista de presentaciones con cant_envase.
 */

type PresentacionesContextInterface = {
  data: PresentacionFormData[];
  setData: Dispatch<React.SetStateAction<PresentacionFormData[]>>;
};

const PresentacionesContext = createContext<PresentacionesContextInterface | null>(null);

const PresentacionesProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<PresentacionFormData[]>([]);

  return (
    <PresentacionesContext.Provider value={{ data, setData }}>
      {children}
    </PresentacionesContext.Provider>
  );
};

if (!PresentacionesContext) {
  throw new Error('PresentacionesContext must be used within a PresentacionesProvider');
}

export { PresentacionesContext, PresentacionesProvider };
