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
import { useState, useContext } from 'react';
import FormTratamiento from './FormTratamiento';
import { CostoPlanContext } from '@/context/CostoPlanContext';
import { calcularCostoTotalSanitizacion } from '@/utils/costoTotalSanitizacion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function FormPlan() {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const costPlanContext = useContext(CostoPlanContext);
  if (!costPlanContext) {
    return null;
  }
  const { setData } = costPlanContext;

  const formPlan = useForm<PlanFormData>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      id_plan: '',
      tratamientos: [],
    },
  });

  const { control, handleSubmit, reset } = formPlan;

  const { fields, append } = useFieldArray({
    control,
    name: 'tratamientos',
  });

  const handleFormSubmit = (data: PlanFormData) => {
    const index = costPlanContext.data.length + 1;
    const finalData = {
      ...data,
      id_plan: `${index}`,
    };
    // realizo el calculo
    const costoPlan = calcularCostoTotalSanitizacion(finalData);
    // setData en el CostoPlanContext.
    setData((prev) => [...prev, costoPlan]);
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
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" className="h-fit w-full" variant="outline">
              <Minus className="w-4 h-4" /> Eliminar tratamiento
            </Button>
          </div>

          <div className="h-[190px] gap-4 grid grid-cols-8">
            <Carousel className="mx-5 col-span-7 bg-accent rounded-lg border-1">
              <CarouselContent className="-ml-1">
                {fields.map((field, index) => (
                  <CarouselItem className="p-0 pl-1">
                    <FormTratamiento key={field.id} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-8.5" />
              <CarouselNext className="-right-8.5" />
            </Carousel>
            <Button
              type="button"
              className="h-[200px]"
              variant="outline"
              onClick={() => {
                append({
                  id_tratamiento: crypto.randomUUID(),
                  aplicaciones: [],
                });
                setIsFormComplete(true);
              }}
            >
              <div className="flex flex-row rotate-90 gap-4">
                {' '}
                <Plus className="w-4 h-4" /> Tratamiento{' '}
              </div>
            </Button>
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
