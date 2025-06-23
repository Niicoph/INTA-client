import { ArrowDownUp, ChartColumn, ArrowUpFromLine } from 'lucide-react';

interface TitleContainerProps {
  className?: string;
  type: 'cotizacion' | 'visualizacion' | 'CargaPlan' | 'CargaConjunto' | 'cargaProducto';
}

const typeConfig = {
  cotizacion: {
    title: 'Cotización',
    icon: <ArrowDownUp className="text-muted-foreground" size={20} />,
  },
  visualizacion: {
    title: 'Visualización Gráfica',
    icon: <ChartColumn className="text-muted-foreground" size={20} />,
  },
  CargaConjunto: {
    title: 'Carga de Conjunto',
    icon: <ArrowUpFromLine className="text-muted-foreground" size={20} />,
  },
  CargaPlan: {
    title: 'Carga de Plan',
    icon: <ArrowUpFromLine className="text-muted-foreground" size={20} />,
  },
  cargaProducto: {
    title: 'Carga de Producto',
    icon: <ArrowUpFromLine className="text-muted-foreground" size={20} />,
  },
} as const;

export default function TitleContainer({ type, className }: TitleContainerProps) {
  const { title, icon } = typeConfig[type];

  return (
    <div
      className={`border-b bg-muted border-border rounded-t-lg flex justify-start py-2 px-4 gap-2 inter-regular ${className}`}
    >
      <div className="flex justify-center w-5 h-5">{icon}</div>
      <h2 className="text-md text-muted-foreground">{title}</h2>
    </div>
  );
}
