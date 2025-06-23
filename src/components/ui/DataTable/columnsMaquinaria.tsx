import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { type ConjuntoMaquinaria } from '@/types/maquinaria';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

import { MaquinariaContext } from '@/context/MaquinariaContext';
import { useContext } from 'react';

const colLabels = {
  id_conjunto: 'Conjunto',
  cotizacion_usd: 'USD',
  cotizacion_gasoil_litro: 'Gasoil',

  tractor: {
    id_tractor: 'ID Tractor',
    nombre: 'Tractor',
    potencia_CV: 'Potencia',
    precio_usd: 'USD',
    coef_gastos_conservacion: 'Coef Conservación',
    horas_utiles: 'Horas Útiles',
    valor_residual_pct: 'Valor Residual',

    //Resultado de calculos
    amortizacion: 'Costo Amortización',
    costo_mantenimiento: 'Costo Mantenimiento',
  },

  implemento: {
    id_implemento: 'ID Implemento',
    nombre: 'Implemento',
    consumo_litros_hora_CV: 'Consumo lt/h CV',
    precio_usd: 'USD',
    coef_gastos_conservacion: 'Coef Conservacion',
    horas_utiles: 'Horas Útiles',
    valor_residual_pct: 'Valor Residual',

    //Resultado de calculos
    amortizacion: 'Costo Amortización',
    costo_mantenimiento: 'Costo Mantenimiento',
  },

  costo_combustible: 'Costo Combustible',
  costo_total_hora: 'Costo Conjunto',
};

const colClasses = {
  conjunto: 'px-4 bg-blue-100',
  cotizaciones: 'px-4 bg-orange-100',
  tractor: 'px-4 bg-red-100',
  implemento: 'px-4 bg-yellow-100',
  costo_total_hora: 'px-4 bg-green-100',
};

export const columnsMaquinaria: ColumnDef<ConjuntoMaquinaria>[] = [
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      const { remove } = useContext(MaquinariaContext)!;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Eliminar plan</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-accent">
            <DropdownMenuItem
              onClick={() => {
                remove(data.id_conjunto);
              }}
            >
              Eliminar Conjunto {data.id_conjunto}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'id_conjunto',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-xs  justify-start ${colClasses.conjunto} flex has-[>svg]:px-0`}
        >
          {colLabels.id_conjunto}
        </Button>
      );
    },
  },
  {
    id: 'cotizacion_usd',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.cotizaciones} flex has-[>svg]:px-0`}
        >
          {colLabels.cotizacion_usd}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return <div className="align-top">${data.cotizacion_usd}</div>;
    },
  },
  {
    id: 'cotizacion_gasoil_litro',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.cotizaciones} flex has-[>svg]:px-0`}
        >
          {colLabels.cotizacion_gasoil_litro}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return <div className="align-top">${data.cotizacion_gasoil_litro}/lt</div>;
    },
  },
  {
    id: 'costo_total_hora',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.costo_total_hora} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_total_hora}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return <div className="align-top">${data.costo_total_hora.toLocaleString('es-AR')}/h</div>;
    },
  },
  {
    id: 'costo_combustible',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.conjunto} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_combustible}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return <div className="align-top">${data.costo_combustible.toLocaleString('es-AR')}/h</div>;
    },
  },
  {
    accessorKey: 'tractor.nombre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.tractor.nombre}
        </Button>
      );
    },
  },
  {
    id: 'tractor.potencia_CV',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.tractor.potencia_CV}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return <div className="align-top">{data.tractor.potencia_CV} CV</div>;
    },
  },
  {
    id: 'tractor.precio_usd',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.tractor.precio_usd}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return <div className="align-top">USD {data.tractor.precio_usd.toLocaleString('es-AR')}</div>;
    },
  },
  {
    id: 'tractor.coef_gastos_conservacion',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.tractor.coef_gastos_conservacion}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          {data.tractor.coef_gastos_conservacion.toLocaleString('es-AR', {
            maximumFractionDigits: 10,
          })}
        </div>
      );
    },
  },
  {
    id: 'tractor.horas_utiles',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.tractor.horas_utiles}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">{data.tractor.horas_utiles.toLocaleString('es-AR')} hs</div>
      );
    },
  },
  {
    id: 'tractor.valor_residual_pct',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.tractor.valor_residual_pct}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">{data.tractor.valor_residual_pct.toLocaleString('es-AR')}%</div>
      );
    },
  },
  {
    id: 'tractor.amortizacion',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.tractor.amortizacion}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">${data.tractor.amortizacion?.toLocaleString('es-AR')}/h</div>
      );
    },
  },
  {
    id: 'tractor.costo_mantenimiento',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.tractor.costo_mantenimiento}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          ${data.tractor.costo_mantenimiento?.toLocaleString('es-AR')}/h
        </div>
      );
    },
  },
  {
    accessorKey: 'implemento.nombre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.implemento.nombre}
        </Button>
      );
    },
  },
  {
    id: 'implemento.consumo_litros_hora_CV',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.implemento.consumo_litros_hora_CV}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          {data.implemento.consumo_litros_hora_CV.toLocaleString('es-AR')} lt/h.CV
        </div>
      );
    },
  },
  {
    id: 'implemento.precio_usd',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.implemento.precio_usd}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">USD {data.implemento.precio_usd.toLocaleString('es-AR')}</div>
      );
    },
  },
  {
    id: 'implemento.coef_gastos_conservacion',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.implemento.coef_gastos_conservacion}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          {data.implemento.coef_gastos_conservacion.toLocaleString('es-AR', {
            maximumFractionDigits: 10,
          })}
        </div>
      );
    },
  },
  {
    id: 'implemento.horas_utiles',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.implemento.horas_utiles}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">{data.implemento.horas_utiles.toLocaleString('es-AR')} hs</div>
      );
    },
  },
  {
    id: 'implemento.valor_residual_pct',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.implemento.valor_residual_pct}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          {data.implemento.valor_residual_pct.toLocaleString('es-AR')}%
        </div>
      );
    },
  },
  {
    id: 'implemento.amortizacion',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.implemento.amortizacion}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">${data.implemento.amortizacion?.toLocaleString('es-AR')}/h</div>
      );
    },
  },
  {
    id: 'implemento.costo_mantenimiento',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.implemento.costo_mantenimiento}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          ${data.implemento.costo_mantenimiento?.toLocaleString('es-AR')}/h
        </div>
      );
    },
  },
];
