import { createContext, useState, type Dispatch } from 'react';
import { type ProductoFormData } from '@/schemas/Sanitizacion/types';

/**
 * Context contiene una lista de productos.
 */

type ProductosContextInterface = {
  data: ProductoFormData[];
  setData: Dispatch<React.SetStateAction<ProductoFormData[]>>;
};

const ProductosContext = createContext<ProductosContextInterface | null>(null);

const ProductosProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ProductoFormData[]>([]);

  return (
    <ProductosContext.Provider value={{ data, setData }}>
      {children}
    </ProductosContext.Provider>
  );
};

if (!ProductosContext) {
  throw new Error('ProductosContext must be used within a ProductosProvider');
}

export { ProductosContext, ProductosProvider };
