import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { type CostoEconomico } from '@/types/maquinaria';

const colLabels = {
  id_conjunto: 'Conjunto',

  conjunto: {
    cotizacion_usd: 'USD',
    cotizacion_gasoil_litro: 'Gasoil',

    nombre_t: 'Tractor',
    potencia_CV: 'Potencia',
    precio_usd_t: 'USD',
    coef_gastos_conservacion_t: 'Coef Conservación',
    horas_utiles_t: 'Horas Útiles',
    valor_residual_pct_t: 'Valor Residual',

    nombre_i: 'Implemento',
    consumo_litros_hora_CV: 'Consumo lt/h CV',
    precio_usd_i: 'USD',
    coef_gastos_conservacion_i: 'Coef Conservacion',
    horas_utiles_i: 'Horas Útiles',
    valor_residual_pct_i: 'Valor Residual',
  },

  amortizacion_t: 'Costo Amortización',
  costo_mantenimiento_t: 'Costo Mantenimiento',

  amortizacion_i: 'Costo Amortizacion',
  costo_combustible: 'Costo Combustible',
  costo_mantenimiento_i: 'Costo Mantenimiento',

  costo_total_hora: 'Costo Conjunto',
};

const colClasses = {
  id: 'px-4  bg-blue-100',
  cotizaciones: 'px-4 bg-orange-100',
  tractor: 'px-4 bg-red-100',
  implemento: 'px-4 bg-yellow-100',
  costo_total: 'px-4 bg-green-100',
};

export const columnsMaquinaria: ColumnDef<CostoEconomico>[] = [
  {
    accessorKey: 'id_conjunto',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-xs  justify-start ${colClasses.id} flex has-[>svg]:px-0`}
        >
          {colLabels.id_conjunto}
        </Button>
      );
    },
  },  
  {    
    id: 'conjunto.cotizacion_usd',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.cotizaciones} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.cotizacion_usd}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          ${data.conjunto.cotizacion_usd}
        </div>
      );
    },
  },
  {
    id: 'conjunto.cotizacion_gasoil_litro',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.cotizaciones} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.cotizacion_gasoil_litro}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          ${data.conjunto.cotizacion_gasoil_litro}/lt
        </div>
      );
    },
  },
  {
    id: 'costo_total_hora',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.costo_total} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_total_hora}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          ${data.costo_total_hora.toLocaleString('es-AR')}/h
        </div>
      );
    },
  },
  {
    accessorKey: 'conjunto.nombre_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.nombre_t}
        </Button>
      );
    },
  },
  {
    id: 'conjunto.potencia_CV',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.potencia_CV}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          {data.conjunto.potencia_CV} CV
        </div>
      );
    },
  },
  {
    id: 'conjunto.precio_usd_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.precio_usd_t}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          USD {data.conjunto.precio_usd_t.toLocaleString('es-AR')}
        </div>
      );
    },
  },
  {
    id: 'conjunto.coef_gastos_conservacion_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.coef_gastos_conservacion_t}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          {data.conjunto.coef_gastos_conservacion_t.toLocaleString('es-AR', {            
            maximumFractionDigits: 10,
          })}
        </div>
      );
    },
  },
  {
    id: 'conjunto.horas_utiles_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.horas_utiles_t}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          {data.conjunto.horas_utiles_t.toLocaleString('es-AR')} hs
        </div>
      );
    },
  },
  {
    id: 'conjunto.valor_residual_pct_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.valor_residual_pct_t}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          {data.conjunto.valor_residual_pct_t.toLocaleString('es-AR')}%
        </div>
      );
    },
  },
  {
    id: 'amortizacion_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.amortizacion_t}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          ${data.amortizacion_t.toLocaleString('es-AR')}/h
        </div>
      );
    },
  },
  {
    id: 'costo_mantenimiento_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_mantenimiento_t}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          ${data.costo_mantenimiento_t.toLocaleString('es-AR')}/h
        </div>
      );
    },
  },
  {
    accessorKey: 'conjunto.nombre_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.nombre_i}
        </Button>
      );
    },
  },
  {
    id: 'conjunto.consumo_litros_hora_CV',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.consumo_litros_hora_CV}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          {data.conjunto.consumo_litros_hora_CV.toLocaleString('es-AR')} lt/h.CV
        </div>
      );
    },
  },
  {
    id: 'conjunto.precio_usd_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.precio_usd_i}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          USD {data.conjunto.precio_usd_i.toLocaleString('es-AR')}
        </div>
      );
    },
    
  },
  {
    id: 'conjunto.coef_gastos_conservacion_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.coef_gastos_conservacion_i}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          {data.conjunto.coef_gastos_conservacion_i.toLocaleString('es-AR', {            
            maximumFractionDigits: 10,
          })}
        </div>
      );
    },
  },
  {
    id: 'conjunto.horas_utiles_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.horas_utiles_i}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          {data.conjunto.horas_utiles_i.toLocaleString('es-AR')} hs
        </div>
      );
    },
  },
  {
    id: 'conjunto.valor_residual_pct_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.valor_residual_pct_i}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          {data.conjunto.valor_residual_pct_i.toLocaleString('es-AR')}%
        </div>
      );
    },
  },
  {
    id: 'amortizacion_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.amortizacion_i}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          ${data.amortizacion_i.toLocaleString('es-AR')}/h
        </div>
      );
    },
  },
  {
    id: 'costo_combustible',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_combustible}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          ${data.costo_combustible.toLocaleString('es-AR')}/h
        </div>
      );
    },
  },
  {
    id: 'costo_mantenimiento_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_mantenimiento_i}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;      
      return (
        <div className="align-top">
          ${data.costo_mantenimiento_i.toLocaleString('es-AR')}/h
        </div>
      );
    },
  },  
];
