import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { type FilaPlan } from '@/types/fertilizacion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { CostoPlanFertilizacionContext } from '@/context/CostoPlanFertilizacionContext';

import { useContext } from 'react';

const colLabels = {
  /* PLAN */
  id_plan: 'Plan',
  cotizacion_usd: 'USD',
  costo_x_ha: 'Costo Plan',
  /* TRATAMIENTO */
  id_tratamiento: 'Tto.',
  tratamiento_fecha: 'Fecha',
  tratamiento_costo: 'Costo Tto.',
  dosis_x_ha: 'Dosis/ha',
  /* APLICACION */
  app_producto_nombre: 'Producto',
  volumen_envase: 'Vol. Envase',
  unidad: 'Unidad',
  precio_usd_envase: 'USD Envase',
  app_costo: 'Costo Aplicacion',
  /* APLICACION */  
  /* TRATAMIENTO */
  /* PLAN */
};

const colClasses = {
  /* PLAN */
  id_plan: 'px-4  bg-blue-100',
  cotizacion_usd: 'px-4  bg-orange-100',
  costo_x_ha: 'px-4  bg-green-100',
  /* TRATAMIENTO */
  id_tratamiento: 'px-4  bg-red-100',
  tratamiento_fecha: 'px-4  bg-red-100',
  tratamiento_costo: 'px-4  bg-red-100',
  /* APLICACION */
  app_producto_nombre: 'px-4  bg-purple-100',
  volumen_envase: 'px-4  bg-purple-100',
  unidad: 'px-4  bg-purple-100',
  precio_usd_envase: 'px-4  bg-purple-100',
  dosis_x_ha: 'px-4  bg-purple-100',
  app_costo: 'px-4  bg-purple-100',
  /* APLICACION */
  /* TRATAMIENTO */
  /* PLAN */
};

export const columnsFertilizacion: ColumnDef<FilaPlan>[] = [
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      const { remove } = useContext(CostoPlanFertilizacionContext)!;
      if (data.plan_rowspan > 0) {
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
                  remove(data.id_plan);
                }}
              >
                Eliminar Plan {data.id_plan}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      return null;
    },
  },
  {
    id: 'plan',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.id_plan} flex has-[>svg]:px-0`}
        >
          {colLabels.id_plan}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      if (data.plan_rowspan > 0) {
        return <div className={`align-top`}>{data.id_plan}</div>;
      }
      return null;
    },
  },

  {
    id: 'cotizacion_usd',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.cotizacion_usd} flex has-[>svg]:px-0`}
        >
          {colLabels.cotizacion_usd}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      if (data.plan_rowspan > 0) {
        return <div className="align-top">${data.cotizacion_usd.toLocaleString('es-AR')}</div>;
      }
      return null;
    },
  },

  {
    id: 'costo_x_ha',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.costo_x_ha} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_x_ha}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      if (data.plan_rowspan > 0) {
        return <div className="align-top">${data.costo_x_ha.toLocaleString('es-AR')}/ha</div>;
      }
      return null;
    },
  },

  {
    id: 'tratamiento',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.id_tratamiento} flex has-[>svg]:px-0`}
        >
          {colLabels.id_tratamiento}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      if (data.tratamiento_rowspan > 0) {
        return <div className="align-top">{data.id_tratamiento}</div>;
      }
      return null;
    },
  },

  {
    id: 'fecha_tratamiento',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tratamiento_fecha} flex has-[>svg]:px-0`}
        >
          {colLabels.tratamiento_fecha}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      if (data.tratamiento_rowspan > 0) {
        return <div className="align-top">{data.tratamiento_fecha.toLocaleDateString()}</div>;
      }
      return null;
    },
  },

  {
    id: 'costo_tratamiento',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tratamiento_costo} flex has-[>svg]:px-0`}
        >
          {colLabels.tratamiento_costo}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      if (data.tratamiento_rowspan > 0) {
        return (
          <div className="align-top">${data.costo_tratamiento.toLocaleString('es-AR')}/ha</div>
        );
      }
      return null;
    },
  },

  {
    accessorKey: 'aplicacion.producto.nombre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.app_producto_nombre} flex has-[>svg]:px-0`}
        >
          {colLabels.app_producto_nombre}
        </Button>
      );
    },
  },

  {
    id: 'aplicacion.producto.volumen_envase',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.volumen_envase} flex has-[>svg]:px-0`}
        >
          {colLabels.volumen_envase}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          {data.aplicacion.producto.volumen_envase} {data.aplicacion.producto.unidad}
        </div>
      );
    },
  },

  {
    id: 'aplicacion.producto.precio_usd_envase',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.precio_usd_envase} flex has-[>svg]:px-0`}
        >
          {colLabels.precio_usd_envase}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          USD {data.aplicacion.producto.precio_usd_envase.toLocaleString('es-AR')}
        </div>
      );
    },
  },

  {
    id: 'aplicacion.producto.dosis_x_ha',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.dosis_x_ha} flex has-[>svg]:px-0`}
        >
          {colLabels.dosis_x_ha}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">
          {data.aplicacion.dosis_x_ha.toLocaleString('es-AR')}{' '}
          {data.aplicacion.producto.unidad}/ha
        </div>
      );
    },
  },
  {
    id: 'aplicacion.costo_total',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.app_costo} flex has-[>svg]:px-0`}
        >
          {colLabels.app_costo}
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="align-top">${data.aplicacion.costo_total.toLocaleString('es-AR')}/ha</div>
      );
    },
  },
];
