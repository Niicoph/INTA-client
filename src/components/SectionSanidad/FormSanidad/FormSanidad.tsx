'use client';
import { useEffect, useState } from 'react';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';

import { PresentacionSchema } from '@/schemas/Sanidad/schema';
import { type PresentacionFormData } from '@/schemas/Sanidad/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSanidad } from '@/hooks/useSanitizantes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDollar } from '@/hooks/useDollar';
import { type Dollar } from '@/types/dollar';

export default function FormSanidad() {
  const [valorDolar, setValorDolar] = useState<string>(''); // <- Estado que usas
  const [customDolarValue, setCustomDolarValue] = useState<number>(0);
  const [sanitizante, setSanitizante] = useState<string>('');
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const principiosActivos = useSanidad();
  const dollarCollection = useDollar();

  const isCustomDolar = valorDolar === 'custom';

  const form = useForm<PresentacionFormData>({
    resolver: zodResolver(PresentacionSchema),
    defaultValues: {
      cotizacion_usd: undefined, // ✅
      principio_nombre: 'test',
      principio_precio: 1,
      principio_dosis: 1,
      principio_cantidad_envase: 1,
      principio_unidad: 'litro',
      volumen: 1,
      cant_tratamientos: 1,
    },
  });

  const handleFormSubmit = (data: PresentacionFormData) => {
    const cotizacionFinal = isCustomDolar ? Number(customDolarValue) : data.cotizacion_usd;

    const finalData = {
      ...data,
      cotizacion_usd: cotizacionFinal,
    };

    resetValues();
    form.reset();
    console.log('Datos del formulario enviados:', finalData);
  };

  const resetValues = () => {
    setValorDolar('');
    setCustomDolarValue(0);
    setPrincipioActivo('');
    setIsFormComplete(false);
  };

  useEffect(() => {
    // si el valor del dolar es un string vacio, entonces el formulario no esta completo
    const isFormComplete = !(valorDolar === '');
    setIsFormComplete(isFormComplete);
  }, [valorDolar]);

  return (
    <div className="rounded-md flex flex-col border border-border">
      <TitleContainer title="Carga de datos" icon={CargaDatosIcon} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="w-full h-full p-4 gap-4 flex flex-col justify-between"
        >
          <FormField
            control={form.control}
            name="cotizacion_usd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Dólar</FormLabel>
                <div className="flex flex-col gap-1 md:flex-row">
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
                      {dollarCollection.data?.map((dollar: Dollar) => (
                        <SelectItem key={dollar.venta} value={dollar.venta.toString()}>
                          {dollar.nombre} - ${dollar.venta}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Otro (especificar)</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-gray-200'}`}
                    disabled={!isCustomDolar}
                    placeholder="Especificar"
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
          <FormField
            control={form.control}
            name="principio_nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Principio Activo</FormLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    const principio_activo = principiosActivos.data?.find(
                      (pa) => pa.id === value || null
                    );
                    setPrincipioActivo(principio_activo);

                    if (principio_activo) {
                      form.setValue('principio_nombre', principio_activo.nombre, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      form.setValue('principio_precio', principio_activo.precio_usd_unidad, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      form.setValue('principio_dosis', principio_activo.dosis, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      form.setValue('principio_cantidad_envase', principio_activo.cantidad_envase, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      form.setValue('principio_unidad', principio_activo.unidad, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }
                  }}
                />
              </FormItem>
            )}
          />

          <div className="col-span-full">
            <Button className="w-full" type="submit" variant={'submit'} disabled={!isFormComplete}>
              Agregar Conjunto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
