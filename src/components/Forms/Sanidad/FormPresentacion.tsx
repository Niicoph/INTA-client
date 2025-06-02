'use client';
import { useEffect, useState, useContext } from 'react';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';
import { PresentacionSchema } from '@/schemas/Sanidad/schema';
import { type PresentacionFormData } from '@/schemas/Sanidad/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSanitizantes } from '@/hooks/useSanitizantes';
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
import type { Sanitizante } from '@/types/Sanitizante';
import { PresentacionesContext } from '@/context/PresentacionesContext';

export default function FormPresentacion() {
  const presentacionesContext = useContext(PresentacionesContext);
  if (!presentacionesContext) {
    return null;
  }
  const { setData } = presentacionesContext;
  const [sanitizante, setSanitizante] = useState<Sanitizante | null>(null);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const sanitizantes = useSanitizantes();
  const [cantEnvase, setCantEnvase] = useState<number | undefined>(undefined);

  const form = useForm<PresentacionFormData>({
    resolver: zodResolver(PresentacionSchema),
    defaultValues: {
      id_sanitizante: '',
      nombre: '',
      precio_usd_unidad: undefined,
      unidad: '',
      dosis: undefined,
      cant_envase: undefined,
    },
  });

  const handleFormSubmit = (data: PresentacionFormData) => {
    setData((prevData) => [...prevData, data]);
    resetForm();
  };

  function resetForm() {
    form.reset();
    setSanitizante(null);
    setCantEnvase(undefined);
    setIsFormComplete(false);
  }

  useEffect(() => {
    const isFormComplete = sanitizante !== null && cantEnvase !== undefined && cantEnvase > 0;
    setIsFormComplete(isFormComplete);
  }, [sanitizante, cantEnvase]);

  return (
    <div className="rounded-md flex flex-col border border-border w-full">
      <TitleContainer title="Carga Producto" icon={CargaDatosIcon} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="w-full h-full p-4 gap-4 flex flex-col justify-between"
        >
          <FormField
            control={form.control}
            name="id_sanitizante"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Sanitizante</FormLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    const sanitizante = sanitizantes.data?.find((s) => s.id === value) || null;
                    setSanitizante(sanitizante);

                    if (sanitizante) {
                      form.setValue('nombre', sanitizante.nombre, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      form.setValue('precio_usd_unidad', sanitizante.precio_usd_unidad, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      form.setValue('dosis', sanitizante.dosis, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      form.setValue('unidad', sanitizante.unidad, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    }
                  }}
                >
                  <SelectTrigger
                    className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                  >
                    <SelectValue placeholder="Selecciona un sanitizante" />
                    <SelectContent>
                      {sanitizantes.data?.map((s: Sanitizante) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="precio_usd_unidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio USD por unidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Selecciona un sanitizante"
                    value={field.value ?? ''}
                    className="cursor-not-allowed text-xs"
                    readOnly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosis HL</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Selecciona un sanitizante"
                    value={field.value ?? ''}
                    className="cursor-not-allowed text-xs"
                    readOnly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidad</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Selecciona un sanitizante"
                    value={field.value ?? ''}
                    className="cursor-not-allowed text-xs"
                    readOnly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* cant_envase */}
          <FormField
            control={form.control}
            name="cant_envase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Magnitud del envase</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Magnitud del envase (kg,l)"
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      field.onChange(value);
                      setCantEnvase(value);
                      setIsFormComplete(!!value && !!sanitizante);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-full">
            <Button className="w-full" type="submit" variant={'submit'} disabled={!isFormComplete}>
              Agregar Producto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
