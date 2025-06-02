'use client';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanSchema } from '@/schemas/Sanidad/schema';
import { type PlanFormData } from '@/schemas/Sanidad/types';
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
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';
import { useContext, useEffect, useState } from 'react';
import Alert from '@/components/ui/alert';

export default function FormPlan() {
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const presentacionesContext = useContext(PresentacionesContext);
  if (!presentacionesContext) return null;

  const { data, setData } = presentacionesContext;

  const formPlan = useForm<PlanFormData>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      aplicaciones: [],
    },
  });

  const aplicaciones = useWatch({
    control: formPlan.control,
    name: 'aplicaciones',
  });

  const { fields, append } = useFieldArray({
    control: formPlan.control,
    name: 'aplicaciones',
  });

  useEffect(() => {
    const completo =
      aplicaciones?.length > 0 &&
      aplicaciones.every(
        (a) => a?.volumen_hl_ha !== undefined && a?.cant_tratamientos !== undefined
      );

    setIsFormComplete(completo);
  }, [aplicaciones]);

  useEffect(() => {
    if (data.length > fields.length) {
      const nuevas = data.slice(fields.length);
      nuevas.forEach((presentacion) =>
        append({
          presentacion,
          volumen_hl_ha: undefined,
          cant_tratamientos: undefined,
        })
      );
    }
  }, [data, fields.length, append]);

  const handleFormSubmit = (data: PlanFormData) => {
    console.log('Plan completo:', data);
    resetForm();
  };

  function resetForm() {
    formPlan.reset();
    setData([]);
    setIsFormComplete(false);
  }

  return (
    <div className="rounded-md flex flex-col border border-border w-full">
      <TitleContainer title="Carga de plan" icon={CargaDatosIcon} />
      <Form {...formPlan}>
        <form
          onSubmit={formPlan.handleSubmit(handleFormSubmit)}
          className="w-full h-full p-4 gap-4 flex flex-col justify-between"
        >
          {fields.length === 0 ? (
            <Alert text="Cargar productos" />
          ) : (
            <div className="flex flex-col gap-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <FormLabel>{field.presentacion?.nombre ?? 'Presentación'}</FormLabel>
                  <div className="flex gap-2">
                    <FormField
                      control={formPlan.control}
                      name={`aplicaciones.${index}.volumen_hl_ha`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Volumen hl/ha"
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === '' ? undefined : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formPlan.control}
                      name={`aplicaciones.${index}.cant_tratamientos`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Tratamientos"
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === '' ? undefined : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button className="w-full" type="submit" variant={'submit'} disabled={!isFormComplete}>
            Agregar Plan
          </Button>
        </form>
      </Form>
    </div>
  );
}
