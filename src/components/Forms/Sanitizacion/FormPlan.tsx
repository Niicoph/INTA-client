'use client';
import * as React from "react";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanSchema } from '@/schemas/Sanitizacion/schema';
import { type PlanFormData } from '@/schemas/Sanitizacion/types';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
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
  type CarouselApi,
} from '@/components/ui/carousel';
import Alert from "@/components/ui/alert";

export default function FormPlan() {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const costPlanContext = useContext(CostoPlanContext);
  if (!costPlanContext) {
    return null;
  }
  const { setData } = costPlanContext;

  /* Carousel */
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


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
          className="w-full flex-1 p-4 gap-4 flex flex-col"
        >
          <div className="h-full gap-4 grid grid-cols-8">
            {fields.length > 0 ?
              <div className="col-span-7 mx-5 rounded-lg border-1 bg-accent">
                <Carousel setApi={setApi}>
                  <CarouselContent className="m-0 p-0 md:w-1/2 xl:w-full h-[276px]">
                    {fields.map((field, index) => (
                      <CarouselItem key={field.id} className="p-0 m-0 bg-white">
                        <FormTratamiento planControl={formPlan.control} index={index} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-8.5" />
                  <CarouselNext className="-right-8.5" />
                </Carousel>
                <div className="text-muted-foreground text-center text-sm">
                  Tto. {current} de {count}
                </div>
              </div> :
              <div className="col-span-7 mx-5 rounded-lg border-1">
                <Alert text="Tratamientos no agregados." />
              </div>
            }
            <Button
              type="button"
              className="h-full"
              variant="outline"
              onClick={() => {
                append({
                  id_tratamiento: crypto.randomUUID(),
                  aplicaciones: [],
                });
                setIsFormComplete(true);
                setCount(count+1);
              }}
            >
              <div className="flex flex-row">
                {' '}
                <Plus className="" />{' '}
              </div>
            </Button>
          </div>
          <Button className="w-full" type="submit" variant="submit" disabled={!isFormComplete}>
            Agregar Plan
          </Button>
        </form>
      </Form>
    </div>
  );
}
