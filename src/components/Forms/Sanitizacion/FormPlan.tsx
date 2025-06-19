'use client';
import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanSchema } from '@/schemas/Sanitizacion/schema';
import { type PlanFormData } from '@/schemas/Sanitizacion/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
import Alert from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDollar } from '@/hooks/useDollar';
import { type Dollar } from '@/types/dollar';

export default function FormPlan() {
  const [isFormComplete, setIsFormComplete] = useState(false);
  const dollarCollection = useDollar();
  const [valorDolar, setValorDolar] = useState<string | undefined>('');
  const [customDolarValue, setCustomDolarValue] = useState(0);
  const isCustomDolar = valorDolar === 'custom';

  const costPlanContext = useContext(CostoPlanContext);
  if (!costPlanContext) {
    return null;
  }
  const { setData } = costPlanContext;

  /* Carousel */
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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
      cotizacion_usd: isCustomDolar ? Number(customDolarValue) : data.cotizacion_usd,
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
          <FormField
            control={formPlan.control}
            name="cotizacion_usd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Dólar</FormLabel>
                <div className="flex flex-col gap-1 md:flex-row ">
                  <Select
                    value={valorDolar ?? ''}
                    onValueChange={(val) => {
                      setValorDolar(val);
                      if (val === 'custom') {
                        field.onChange(undefined);
                      } else {
                        field.onChange(Number(val));
                      }
                    }}
                  >
                    <SelectTrigger
                      className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                    >
                      <SelectValue placeholder="Selecciona cotización" />
                    </SelectTrigger>
                    <SelectContent>
                      {dollarCollection.data?.map((dollar: Dollar) => {
                        return (
                          <SelectItem key={dollar.venta} value={dollar.venta.toString()}>
                            ${dollar.venta} - {dollar.nombre}
                          </SelectItem>
                        );
                      })}
                      <SelectItem value="custom">Otro (especificar)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    className={`text-xs w-full pr-10 px-3 py-2 border transition-all duration-200 ${
                      isCustomDolar
                        ? 'bg-white text-black border-gray-300'
                        : 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                    }`}
                    hidden={!isCustomDolar}
                    placeholder="Especifique precio de USD"
                    type="number"
                    value={!isCustomDolar ? '' : (field.value ?? '')}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setCustomDolarValue(value);
                      field.onChange(value);
                    }}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-full gap-4 grid grid-cols-8">
            {fields.length > 0 ? (
              <div className="col-span-7 rounded-lg border-1 bg-accent">
                <div className="text-muted-foreground h-8 flex justify-center items-center  text-sm">
                  Tto. {current} de {count}
                </div>
                <Carousel setApi={setApi}>
                  <CarouselContent className="m-0 p-0 md:w-1/2 xl:w-full h-[270px]">
                    {fields.map((field, index) => (
                      <CarouselItem key={field.id} className="p-0 m-0  bg-white rounded-b-lg">
                        <FormTratamiento planControl={formPlan.control} index={index} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-10 xl:left-10 2xl:left-30 -top-4 bg-none" />
                  <CarouselNext className="right-10 xl:right-10 2xl:right-30 -top-4" />
                </Carousel>
              </div>
            ) : (
              <div className="col-span-7  rounded-lg w-full">
                <Alert text="Tratamientos no agregados." />
              </div>
            )}
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
                setCount(count + 1);
              }}
            >
              <div className="flex flex-row">
                <Plus className="" />
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
