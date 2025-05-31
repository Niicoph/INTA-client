import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  id: 'px-2 bg-blue-100',
  cotizaciones: 'px-2 bg-orange-100',
  tractor: 'px-2 bg-red-100',
  implemento: 'px-2 bg-yellow-100',
  costo_total: 'px-2 bg-green-100',
};

export const columnsMaquinaria: ColumnDef<CostoEconomico>[] = [
  /*{
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Marcar todas"
        className="m-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Marcar fila"
        className="m-1"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },*/

  //MENU DE OPCIONES
  //   {
  //     id: 'actions',
  //     cell: ({ row }) => {
  //       const maquinaria = row.original;

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Abrir menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>

  //           <DropdownMenuContent align="end">
  //             <DropdownMenuItem
  //               onClick={() => {
  //                 const formattedData = Object.entries(maquinaria)
  //                   .map(([key, value]) => `${key}: ${value}`)
  //                   .join(', ');
  //                 navigator.clipboard.writeText(formattedData);
  //               }}
  //             >
  //               Copiar datos de fila
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>Eliminar fila</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },

  //IDENTIFICADOR DEL CONJUNTO
  {
    accessorKey: 'id_conjunto',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`w-full text-left text-xs justify-start ${colClasses.id} flex has-[>svg]:px-0`}
        >
          {colLabels.id_conjunto}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },

  //COLUMNAS DE COTIZACIONES
  {
    accessorKey: 'conjunto.cotizacion_usd',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`w-full text-left text-xs justify-start ${colClasses.cotizaciones} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.cotizacion_usd}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.cotizaciones} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.cotizacion_gasoil_litro}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },

  //COLUMNAS DE TRACTOR
  {
    accessorKey: 'conjunto.nombre_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.nombre_t}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.potencia_CV}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.precio_usd_t}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.coef_gastos_conservacion_t}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.horas_utiles_t}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.valor_residual_pct_t}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  //COLUMNAS PARA CALCULOS DEL TRACTOR
  {
    accessorKey: 'amortizacion_t',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.amortizacion_t}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.tractor} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_mantenimiento_t}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },

  //COLUMNAS DE IMPLEMENTO
  {
    accessorKey: 'conjunto.nombre_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.nombre_i}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.consumo_litros_hora_CV}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.precio_usd_i}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.coef_gastos_conservacion_i}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.horas_utiles_i}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.conjunto.valor_residual_pct_i}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  //COLUMNAS PARA CALCULOS DEL IMPLEMENTO
  {
    accessorKey: 'amortizacion_i',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.amortizacion_i}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_combustible}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
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
          className={`w-full text-left text-xs justify-start ${colClasses.implemento} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_mantenimiento_i}
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },

  //COLUMNA PARA COSTO TOTAL POR HORA DEL CONJUNTO
  {
    accessorKey: 'costo_total_hora',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={`w-full text-left text-xs justify-start ${colClasses.costo_total} flex has-[>svg]:px-0`}
        >
          {colLabels.costo_total_hora}
          {/*<ArrowUpDown className="h-4 w-4" />*/}
        </Button>
      );
    },
  },
];
