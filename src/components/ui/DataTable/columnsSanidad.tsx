import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { type FilaPlan } from '@/types/sanitizante';

const colLabels = {
  /* PLAN */
  id_plan: 'Plan',
  cotizacion_usd: 'USD $',
  costo_x_ha: 'Costo total $/ha',
    /* TRATAMIENTO */
    id_tratamiento: 'Tratamiento',
    tratamiento_fecha: 'Fecha',
    tratamiento_costo: '$ tratamiento',
      /* APLICACION */
      app_producto_nombre: 'Producto',  
      volumen_envase: 'Vol. Envase',
      unidad: 'Unidad',
      precio_usd_envase: '$ Envase USD',
      app_volumen: 'Vol. Aplicado',
      dosis_x_hl: 'Dosis/hl',
      app_costo: '$ Aplicacion',
      tipo: 'Tipo',
      /* APLICACION */
    /* TRATAMIENTO */
  /* PLAN */
};

const colClasses = {
  /* PLAN */
  id_plan: 'px-4  bg-blue-100',
  cotizacion_usd: 'px-4  bg-blue-100',
  costo_x_ha: 'px-4  bg-blue-100',
    /* TRATAMIENTO */
    id_tratamiento: 'px-4  bg-blue-100',
    tratamiento_fecha: 'px-4  bg-blue-100',
    tratamiento_costo: 'px-4  bg-blue-100',
      /* APLICACION */
      app_producto_nombre: 'px-4  bg-blue-100',
      volumen_envase: 'px-4  bg-blue-100',
      unidad: 'px-4  bg-blue-100',
      precio_usd_envase: 'px-4  bg-blue-100',
      app_volumen: 'px-4  bg-blue-100',
      dosis_x_hl: 'px-4  bg-blue-100',
      app_costo: 'px-4  bg-blue-100',
      tipo: 'px-4  bg-blue-100',
      /* APLICACION */
    /* TRATAMIENTO */
  /* PLAN */
};

export const columnsSanidad: ColumnDef<FilaPlan>[] = [
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
      const data = row.original as FilaPlan;
      if (data.plan_rowspan > 0) {
        return (
          <td rowSpan={data.tratamiento_rowspan} className="align-top">
            {data.id_plan}
          </td>
        );
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
      const data = row.original as FilaPlan;
      if (data.plan_rowspan > 0) {
        return (
          <td rowSpan={data.plan_rowspan} className="align-top">
            {data.cotizacion_usd}
          </td>
        );
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
      const data = row.original as FilaPlan;
      if (data.plan_rowspan > 0) {
        return (
          <td rowSpan={data.tratamiento_rowspan} className="align-top">
            {data.costo_x_ha}
          </td>
        );
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
      const data = row.original as FilaPlan;
      if (data.tratamiento_rowspan > 0) {
        return (
          <td rowSpan={data.tratamiento_rowspan} className="align-top">
            {data.id_tratamiento}
          </td>
        );
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
      const data = row.original as FilaPlan;
      if (data.tratamiento_rowspan > 0) {
        return (
          <td rowSpan={data.tratamiento_rowspan} className="align-top">
            {data.tratamiento_fecha.toLocaleDateString()}
          </td>
        );
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
      const data = row.original as FilaPlan;
      if (data.tratamiento_rowspan > 0) {
        return (
          <td rowSpan={data.tratamiento_rowspan} className="align-top">
            {data.costo_tratamiento}
          </td>
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
    accessorKey: 'aplicacion.producto.volumen_envase',
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
  },
  {
    accessorKey: 'aplicacion.producto.unidad',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.unidad} flex has-[>svg]:px-0`}
        >
          {colLabels.unidad}
        </Button>
      );
    },
  },

  {
    accessorKey: 'aplicacion.producto.precio_usd_envase',
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
  },

  {
    accessorKey: 'aplicacion.volumen_aplicado',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.app_volumen} flex has-[>svg]:px-0`}
        >
          {colLabels.app_volumen}
        </Button>
      );
    },
  },

  {
    accessorKey: 'aplicacion.producto.dosis_x_hl',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.dosis_x_hl} flex has-[>svg]:px-0`}
        >
          {colLabels.dosis_x_hl}
        </Button>
      );
    },
  },

  {
    accessorKey: 'aplicacion.costo_total',
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
  },

  {
    accessorKey: 'aplicacion.producto.tipo',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`rounded-none  w-full text-left text-xs justify-start ${colClasses.tipo} flex has-[>svg]:px-0`}
        >
          {colLabels.tipo}
        </Button>
      );
    },
  },
];
