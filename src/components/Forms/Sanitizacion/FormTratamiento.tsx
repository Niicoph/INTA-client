'use client';

import { useContext, useState } from 'react';
import { useFormContext, useFieldArray, type Control } from 'react-hook-form';
import { SanitizantesContext } from '@/context/SanitizantesContext';
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
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Trash, ChevronDownIcon } from 'lucide-react';
import { type PlanFormData } from '@/schemas/Sanitizacion/types';
interface FormTratamientoProps {
  planControl: Control<PlanFormData>;
  index: number;
  removeTrat: (index: number) => void;
}

export default function FormTratamiento({ planControl, index, removeTrat }: FormTratamientoProps) {
  const sanitizantesContext = useContext(SanitizantesContext);
  const { control } = useFormContext();

  const { data: sanitizantes } = sanitizantesContext ?? {};
  const { fields, append, remove } = useFieldArray({
    control,
    name: `tratamientos.${index}.aplicaciones`,
  });

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-full rounded-b-lg gap-4 shrink-0 overflow-scroll flex flex-col ">
      <FormField
        control={planControl}
        name={`tratamientos.${index}.aplicaciones`}
        render={
          (/*{ field }*/) => (
            <FormItem>
              <div className="w-full flex justify-between items-center p-2 border-b border-border">
                <div className="w-full flex justify-between">
                  <p className="font-semibold flex items-center">Tratamiento #{index + 1}</p>
                  <div className="flex gap-2">
                    <FormField
                      control={control}
                      name={`tratamientos.${index}.fecha`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button variant="outline" id="date" className="w-fit font-normal">
                                  {field.value ? field.value.toLocaleDateString() : 'Fecha'}
                                  <ChevronDownIcon />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  captionLayout="dropdown"
                                  onSelect={(date) => {
                                    field.onChange(date);
                                    setOpen(false);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}

                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        removeTrat(index);
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2">
                {fields.map((field, aplicacionIndex) => (
                  <div className="flex justify-between gap-2 items-top" key={field.id}>
                    <div className='w-full flex justify-between gap-2 items-top'>
                      <FormField
                        control={control}
                        name={`tratamientos.${index}.aplicaciones.${aplicacionIndex}.producto`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col w-full">
                            <FormLabel>Producto #{aplicacionIndex + 1}</FormLabel>
                            <div className='grid grid-cols-1'>
                              <Select
                                value={field.value?.id_sanitizante ?? ''}
                                onValueChange={(value) => {
                                  const sanitizante = sanitizantes?.find(
                                    (p) => p.id_sanitizante === value
                                  );
                                  if (sanitizante) {
                                    field.onChange(sanitizante);
                                  }
                                }}
                              >
                                <SelectTrigger className="text-xs w-full border-2">
                                  <SelectValue placeholder="Selecciona un producto" />
                                </SelectTrigger>
                                <SelectContent>
                                  {sanitizantes?.map((producto: Producto) => (
                                    <SelectItem
                                      key={producto.id_sanitizante}
                                      value={producto.id_sanitizante}
                                    >
                                      {producto.nombre} {producto.volumen_envase}
                                      {producto.unidad} ({producto.tipo}) {producto.dosis_x_hl}{producto.unidad}/hl
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`tratamientos.${index}.aplicaciones.${aplicacionIndex}.volumen_x_ha`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col w-4/9">
                            <FormLabel>Vol. hl/ha</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Vol. hl/ha"
                                value={field.value ?? ''}
                                className="pr-10 px-3 py-2 border transition-all duration-200 bg-white text-black border-gray-300"
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
                    <div className='py-5.5'>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(aplicacionIndex)}
                      >
                        <Trash />
                      </Button>
                    </div>
                    
                  </div>
                ))}

                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                      append({ 
                        id_producto: ''
                      })
                    }}>
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
