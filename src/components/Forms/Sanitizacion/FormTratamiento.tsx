'use client';

import { useContext } from 'react';
import { useFormContext, useFieldArray, type Control, type UseFieldArrayRemove } from 'react-hook-form';
import { ProductosContext } from '@/context/ProductosContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form';
import { type Producto } from '@/types/sanitizante';
import { Button } from '@/components/ui/button';
import { Plus , Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { type PlanFormData } from '@/schemas/Sanitizacion/types';
interface FormTratamientoProps {
  planControl: Control<PlanFormData>;
  index: number;
  remove: (index: number) => void;
}

export default function FormTratamiento({ planControl, index, remove }: FormTratamientoProps) {
  const productosContext = useContext(ProductosContext);
  const { control } = useFormContext();

  const { data: productos } = productosContext ?? {};
  const { fields, append } = useFieldArray({
    control,
    name: `tratamientos.${index}.productos`,
  });

  return (
    <div className="w-full h-full rounded-b-lg  p-4 gap-4 shrink-0 overflow-scroll flex flex-col ">
      <FormField
        control={planControl}
        name={`tratamientos.${index}.aplicaciones`}
        render={
          (/*{ field }*/) => (
            <FormItem>
              <div className="w-full flex justify-between items-center">
                <div className='flex flex-row gap-2 mb-1'>
                  <p className="font-semibold">Tratamiento #{index + 1}</p>  
                  <Button
                    type="button"
                    className="w-fit h-fit p-1"
                    variant="destructive"
                    onClick={() => {                            
                      remove(index);
                    }}
                  >
                    <div className="flex flex-row">
                      <Trash className="" />
                    </div>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {fields.map((field, aplicacionIndex) => (
                  <div className="grid grid-cols-2 gap-2" key={field.id}>
                    <FormField
                      control={control}
                      name={`tratamientos.${index}.aplicaciones.${aplicacionIndex}.producto`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Producto #{aplicacionIndex + 1}</FormLabel>
                          <Select
                            value={field.value?.id_sanitizante ?? ''}
                            onValueChange={(selectedId) => {
                              const selectedProducto = productos?.find(
                                (p) => p.id_sanitizante === selectedId
                              );

                              if (selectedProducto) {
                                field.onChange(selectedProducto);
                              }
                            }}
                          >
                            <SelectTrigger className="text-xs w-full border-2">
                              <SelectValue placeholder="Selecciona un producto" />
                            </SelectTrigger>
                            <SelectContent>
                              {productos?.map((producto: Producto) => (
                                <SelectItem
                                  key={producto.id_sanitizante}
                                  value={producto.id_sanitizante}
                                >
                                  {producto.nombre} ({producto.tipo}) {producto.volumen_envase}
                                  {producto.unidad}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`tratamientos.${index}.aplicaciones.${aplicacionIndex}.volumen_aplicado`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Volumen</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Volumen a aplicar"
                              value={field.value ?? ''}
                              className={`w-full pr-10 px-3 py-2 border transition-all duration-200 bg-white text-black border-gray-300`}
                              onChange={(e) => {
                                const value = e.target.valueAsNumber;
                                field.onChange(isNaN(value) ? '' : value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => append({ id_producto: '' })}>
                  <Plus className="mr-1 w-4 h-4" /> prod.
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )
        }
      />
    </div>
  );
}
