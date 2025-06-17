'use client';

import { useContext } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ProductosContext } from '@/context/ProductosContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { type Producto } from '@/types/sanitizante';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FormTratamientoProps {
  index: number;
}

export default function FormTratamiento({ index }: FormTratamientoProps) {
  const productosContext = useContext(ProductosContext);
  const { control, setValue } = useFormContext();

  const { data: productos } = productosContext ?? {};

  const { fields, append } = useFieldArray({
    control,
    name: `tratamientos.${index}.productos`,
  });

  return (
    <div className="w-full h-[190px] p-4 gap-4 shrink-0 overflow-scroll flex flex-col border border-border rounded-md">
      <div className="w-full flex justify-between items-center">
        <p className="font-semibold">Tratamiento #{index + 1}</p>
        <Button type="button" variant="outline" onClick={() => append({ id_producto: '' })}>
          <Plus className="mr-1 w-4 h-4" /> producto
        </Button>
      </div>
      <div className="grid gap-4">
        {fields.map((field, productoIndex) => (
          <FormField
            key={field.id}
            control={control}
            name={`tratamientos.${index}.productos.${productoIndex}.id_producto`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Producto #{productoIndex + 1}</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(selectedId) => {
                    const selectedProducto = productos?.find(
                      (p) => p.id_sanitizante === selectedId
                    );

                    if (selectedProducto) {
                      setValue(`tratamientos.${index}.productos.${productoIndex}`, {
                        ...selectedProducto,
                      });
                    }

                    field.onChange(selectedId);
                  }}
                >
                  <SelectTrigger className="text-xs w-full border-2">
                    <SelectValue placeholder="Selecciona un producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {productos?.map((producto: Producto) => (
                      <SelectItem key={producto.id_sanitizante} value={producto.id_sanitizante}>
                        {producto.nombre} ({producto.tipo})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
