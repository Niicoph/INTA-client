'use client';
import { useForm/*, useFieldArray, useWatch*/ } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanSchema } from '@/schemas/Sanitizacion/schema';
import { type PlanFormData } from '@/schemas/Sanitizacion/types';
import { ProductosContext } from '@/context/ProductosContext';
//import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from "lucide-react";
import Legend from '@/components/ui/Legend/Legend';
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
import type { Tratamiento } from '@/types/sanitizante';
//import Alert from '@/components/ui/alert';

export default function FormPlan() {
  const productosContext = useContext(ProductosContext);
  if (!productosContext) {
    return null;
  }
  const productos  = productosContext.data;

  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);

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
    //setData((prevData) => [...prevData, finalData]);
    setIsFormComplete(false);
  }

  function agregarFormTratamiento() {
    console.log("Tratamiento aniadido")
  }

  return (
    <div className="rounded-md flex flex-col border border-border w-full">
      <TitleContainer title="Carga de plan" icon={CargaDatosIcon} />
      <Form {...formPlan}>
        <form
          onSubmit={formPlan.handleSubmit(handleFormSubmit)}
          className="w-full h-full p-4 gap-4 flex flex-col"
        >
          <div className='flex flex-row-reverse'>
            <Button className='h-fit w-fit' variant={'outline'} onClick={()=> agregarFormTratamiento()}>
              <Plus/> Agregar tratamiento
            </Button>
          </div>
          <Legend text="Para agregar un plan debes añadirle al menos un tratamiento." />
          <Legend text="Cada tratamiento debe tener al menos un producto." />
          <Button className="w-full" type="submit" variant={'submit'} disabled={!isFormComplete}>
            Agregar Plan
          </Button>
        </form>
      </Form>
    </div>
  );
}
