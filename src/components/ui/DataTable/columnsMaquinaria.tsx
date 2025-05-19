import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Maquinaria } from "@/types/maquinaria";

export const columnsMaquinaria: ColumnDef<Maquinaria>[] = [
  {
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
  },
  {
    accessorKey: "conjunto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Conjunto
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "potencia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Potencia (CV)
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "implemento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Implemento
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "valorimplemento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Valor implemento
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "coeficiente",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Gasto coeficiente
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "minutos",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Minutos útiles
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "residuo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Valor residual
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "consumo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Consumo litros/hora
          {/* <ArrowUpDown className="h-4 w-4" /> */}
        </Button>
      );
    },
  },
  {
    accessorKey: "costohora",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-left justify-start p-0 flex has-[>svg]:px-0"
        >
          Costo/hora
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const maquinaria = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                const formattedData = Object.entries(maquinaria)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ");
                navigator.clipboard.writeText(formattedData);
              }}
            >
              Copiar datos de fila
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar fila</DropdownMenuItem>
            <DropdownMenuItem>Eliminar fila</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
