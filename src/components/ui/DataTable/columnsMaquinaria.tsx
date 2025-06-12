import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { type CostoEconomico } from '@/types/maquinaria';

const colLabels = {
  id_conjunto: 'Conjunto',

  conjunto: {
    cotizacion_usd: 'USD $',
    cotizacion_gasoil_litro: 'Gasoil $/lt',

    nombre_t: 'Tractor',
    potencia_CV: 'CV',
    precio_usd_t: 'USD',
    coef_gastos_conservacion_t: 'Coef Conservación',
    horas_utiles_t: 'Horas Útiles',
    valor_residual_pct_t: '$ Residual %',

    nombre_i: 'Implemento',
    consumo_litros_hora_CV: 'Consumo lt/h CV',
    precio_usd_i: 'USD',
    coef_gastos_conservacion_i: 'Coef Conservacion',
    horas_utiles_i: 'Horas Útiles',
    valor_residual_pct_i: 'Residual %',
  },

  amortizacion_t: 'Amortización $/h',
  costo_mantenimiento_t: 'Mantenimiento $/h',

  amortizacion_i: 'Amortizacion $/h',
  costo_combustible: 'Combustible $/h',
  costo_mantenimiento_i: 'Mantenimiento $/h',

  costo_total_hora: 'Costo Total $/h',
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
    accessorKey: 'conjunto.cotizacion_usd',
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
  },
  {
    accessorKey: 'conjunto.cotizacion_gasoil_litro',
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
    accessorKey: 'conjunto.potencia_CV',
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
  },
  {
    accessorKey: 'conjunto.precio_usd_t',
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
  },
  {
    accessorKey: 'conjunto.coef_gastos_conservacion_t',
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
  },
  {
    accessorKey: 'conjunto.horas_utiles_t',
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
  },
  {
    accessorKey: 'conjunto.valor_residual_pct_t',
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
  },
  {
    accessorKey: 'amortizacion_t',
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
  },
  {
    accessorKey: 'costo_mantenimiento_t',
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
    accessorKey: 'conjunto.consumo_litros_hora_CV',
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
  },
  {
    accessorKey: 'conjunto.precio_usd_i',
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
  },
  {
    accessorKey: 'conjunto.coef_gastos_conservacion_i',
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
  },
  {
    accessorKey: 'conjunto.horas_utiles_i',
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
  },
  {
    accessorKey: 'conjunto.valor_residual_pct_i',
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
  },
  {
    accessorKey: 'amortizacion_i',
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
  },
  {
    accessorKey: 'costo_combustible',
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
  },
  {
    accessorKey: 'costo_mantenimiento_i',
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
  },
  {
    accessorKey: 'costo_total_hora',
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
  },
];
