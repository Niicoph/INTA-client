'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanSchema } from '@/schemas/Sanitizacion/schema';
import { type PlanFormData } from '@/schemas/Sanitizacion/types';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import Legend from '@/components/ui/Legend/Legend';
import { Form } from '@/components/ui/form';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';
import { useState } from 'react';
import FormTratamiento from './FormTratamiento';

export default function FormPlan() {
  const [isFormComplete, setIsFormComplete] = useState(false);

  const formPlan = useForm<PlanFormData>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      tratamientos: [],
    },
  });

  const { control, handleSubmit, reset } = formPlan;

  const { fields, append } = useFieldArray({
    control,
    name: 'tratamientos',
  });

  const handleFormSubmit = (data: PlanFormData) => {
    console.log('Plan completo:', data);
    reset();
    setIsFormComplete(false);
  };

  return (
    <div className="rounded-md flex flex-col justify-between w-full h-full border border-border ">
      <TitleContainer title="Carga de plan" icon={CargaDatosIcon} />
      <Form {...formPlan}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="w-full flex-1 p-4 gap-4 flex flex-col justify-between"
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              type="button"
              className="h-fit w-full"
              variant="outline"
              onClick={() => {
                append({
                  id_tratamiento: crypto.randomUUID(),
                  productos: [],
                });
                setIsFormComplete(true);
              }}
            >
              <Plus className="w-4 h-4" /> Agregar tratamiento
            </Button>
            <Button type="button" className="h-fit w-full" variant="outline">
              <Minus className="w-4 h-4" /> Eliminar tratamiento
            </Button>
          </div>

          <div className="h-[190px] flex w-full overflow-scroll gap-4">
            {fields.map((field, index) => (
              <FormTratamiento key={field.id} index={index} />
            ))}
          </div>

          <Legend text="Para agregar un plan debes añadirle al menos un tratamiento con productos" />
          <Button className="w-full" type="submit" variant="submit" disabled={!isFormComplete}>
            Agregar Plan
          </Button>
        </form>
      </Form>
    </div>
  );
}
