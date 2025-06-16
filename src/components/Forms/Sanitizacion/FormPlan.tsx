'use client';
import { useForm/*, useFieldArray, useWatch*/ } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanSchema } from '@/schemas/Sanitizacion/schema';
import { type PlanFormData } from '@/schemas/Sanitizacion/types';
import { ProductosContext } from '@/context/ProductosContext';
//import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  /*FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,*/
} from '@/components/ui/form';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';
import { useContext, /*useEffect,*/ useState } from 'react';
//import Alert from '@/components/ui/alert';

export default function FormPlan() {
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const productosContext = useContext(ProductosContext);
  if (!productosContext) return null;

  //const { data, setData } = productosContext;

  const formPlan = useForm<PlanFormData>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      tratamientos: [],
    },
  });


  const handleFormSubmit = (data: PlanFormData) => {
    console.log('Plan completo:', data);
    resetForm();
  };

  function resetForm() {
    formPlan.reset();
    //setData([]);
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
          <Button className="w-full" type="submit" variant={'submit'} disabled={!isFormComplete}>
            Agregar Plan
          </Button>
        </form>
      </Form>
    </div>
  );
}
