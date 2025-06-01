'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AplicacionSchema, PlanSchema } from '@/schemas/Sanidad/schema';
import { type AplicacionFormData, type PlanFormData } from '@/schemas/Sanidad/types';
import { PresentacionesContext } from '@/context/PresentacionesContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import TitleContainer from '../ui/TitleContainer/TitleContainer';
import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';
import { useContext, useEffect } from 'react';

export default function FormPlan() {
  const presentacionesContext = useContext(PresentacionesContext);
  if (!presentacionesContext) return null;

  const { data: presentaciones } = presentacionesContext;

  const form = useForm<PlanFormData>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      aplicaciones: [],
    },
  });

  const { fields, append } = useFieldArray({
    name: 'aplicaciones',
    control: form.control,
  });

  // Cada vez que cambian las presentaciones, agregamos nuevas aplicaciones al form
  useEffect(() => {
    const faltantes = presentaciones.length - fields.length;
    if (faltantes > 0) {
      const nuevos = Array(faltantes).fill({
        volumen_hl_ha: undefined,
        cant_tratamientos: undefined,
      });
      nuevos.forEach((item) => append(item));
    }
  }, [presentaciones, fields, append]);

  const handleFormSubmit = (data: PlanFormData) => {
    console.log('Plan completo:', data);
    form.reset();
  };

  return (
    <div className="rounded-md flex flex-col border border-border w-full">
      <TitleContainer title="Carga de plan" icon={CargaDatosIcon} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 p-4">
          {fields.map((field, index) => (
            <>
              <FormLabel>{presentaciones[index]?.nombre}</FormLabel>
              <div key={field.id} className="grid grid-cols-2 gap-4 border-t pt-4">
                <FormField
                  name={`aplicaciones.${index}.volumen_hl_ha`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Volumen HL/Ha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`aplicaciones.${index}.cant_tratamientos`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Cantidad de tratamientos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          ))}
          <Button type="submit" className="w-full" variant="submit">
            Agregar Plan
          </Button>
        </form>
      </Form>
    </div>
  );
}
