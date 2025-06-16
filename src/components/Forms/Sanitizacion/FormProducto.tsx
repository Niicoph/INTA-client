'use client';
import { useEffect, useState, useContext } from 'react';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';
import { ProductoSchema } from '@/schemas/Sanitizacion/schema';
import { type ProductoFormData } from '@/schemas/Sanitizacion/types';
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
import type { Producto } from '@/types/sanitizante';
import { ProductosContext } from '@/context/ProductosContext';

export default function FormProducto() {
  const productosContext = useContext(ProductosContext);
  if (!productosContext) {
    return null;
  }
  const { setData } = productosContext;
  const [sanitizante, setSanitizante] = useState<Producto | null>(null);
  const [isFormProductoComplete, setIsFormProductoComplete] = useState<boolean>(false);
  const sanitizantes = useSanitizantes();
  const [cantEnvase, setCantEnvase] = useState<number | undefined>(undefined);

  const formProducto = useForm<ProductoFormData>({
    resolver: zodResolver(ProductoSchema),
    defaultValues: {
      id_sanitizante: '',
      nombre: '',
      precio_usd_envase: undefined,
      unidad: '',
      dosis_x_hl: undefined,
      volumen_envase: undefined,
    },
  });

  const handleFormSubmit = (data: ProductoFormData) => {
    setData((prevData) => [...prevData, data]);
    resetFormProducto();
  };

  function resetFormProducto() {
    formProducto.reset();
    setSanitizante(null);
    setCantEnvase(undefined);
    setIsFormProductoComplete(false);
  }

  useEffect(() => {
    const isFormComplete = sanitizante !== null && cantEnvase !== undefined && cantEnvase > 0;
    setIsFormProductoComplete(isFormComplete);
  }, [sanitizante, cantEnvase]);

  return (
    <div className="rounded-md flex flex-col border border-border w-full">
      <TitleContainer title="Carga Producto" icon={CargaDatosIcon} />
      <Form {...formProducto}>
        <form
          onSubmit={formProducto.handleSubmit(handleFormSubmit)}
          className="w-full h-full p-4 gap-4 flex flex-col justify-between"
        >
          <FormField
            control={formProducto.control}
            name="id_sanitizante"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Sanitizante</FormLabel>
                <Select
                  value={field.value ?? ''}
                  onValueChange={(value) => {
                    field.onChange(value);
                    const sanitizante = sanitizantes.data?.find((s) => s.id_sanitizante === value) || null;
                    setSanitizante(sanitizante);

                    if (sanitizante) {
                      formProducto.setValue('nombre', sanitizante.nombre, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      formProducto.setValue('precio_usd_envase', sanitizante.precio_usd_envase, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      formProducto.setValue('dosis_x_hl', sanitizante.dosis_x_hl, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      formProducto.setValue('unidad', sanitizante.unidad, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                      formProducto.setValue('volumen_envase', sanitizante.volumen_envase, {
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
                      {sanitizantes.data?.map((s: Producto) => (
                        <SelectItem key={s.id_sanitizante} value={s.id_sanitizante}>
                          {s.nombre} - {s.tipo}
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
            control={formProducto.control}
            name="precio_usd_envase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USD por envase</FormLabel>
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
            control={formProducto.control}
            name="dosis_x_hl"
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
          
          {/* volumen_envase */}
          <FormField
            control={formProducto.control}
            name="volumen_envase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volumen del envase (Según unidad)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Selecciona un sanitizante"
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : undefined;
                      field.onChange(value);
                      setCantEnvase(value);
                      setIsFormProductoComplete(!!value && !!sanitizante);
                    }}
                    className="cursor-not-allowed text-xs"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formProducto.control}
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

          <div className="col-span-full">
            <Button className="w-full" type="submit" variant={'submit'} disabled={!isFormProductoComplete}>
              Agregar Producto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
