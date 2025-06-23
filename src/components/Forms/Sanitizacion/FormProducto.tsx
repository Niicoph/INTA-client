'use client';
import { useEffect, useState, useContext } from 'react';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import Legend from '@/components/ui/Legend/Legend';
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
import { unidades } from '@/types/sanitizante';
import { SanitizantesContext } from '@/context/SanitizantesContext';

export default function FormProducto() {
  const sanitizantesContext = useContext(SanitizantesContext);
  if (!sanitizantesContext) {
    return null;
  }
  const setDataSanitizantes = sanitizantesContext.setData;
  const [selectedSanitizante, setSelectedSanitizante] = useState<Producto | null>(null);

  const [customDosisHl, setCustomDosisHl] = useState(false);
  const [customVolumenEnvase, setCustomVolumenEnvase] = useState(false);
  const [customUsdEnvase, setCustomUsdEnvase] = useState(false);

  const [isFormSanitizanteComplete, setIsFormSanitizanteComplete] = useState<boolean>(false);

  const sanitizantes = useSanitizantes();

  const formSanitizante = useForm<ProductoFormData>({
    resolver: zodResolver(ProductoSchema),
    defaultValues: {
      id_sanitizante: '',
      nombre: '',
      precio_usd_envase: undefined,
      unidad: undefined,
      dosis_x_hl: undefined,
      volumen_envase: undefined,
    },
  });

  const handleFormSanitizanteSubmit = (data: ProductoFormData) => {
    /* Manejo de index para evitar que al eliminar, se intente usar un id utilizado */
    let index = sanitizantesContext.data.length + 1;
    if (index > 1) {
      index = parseInt(sanitizantesContext.data[index - 2].id_sanitizante) + 1;
    }

    const finalData: Producto = {
      ...data,
      id_sanitizante: `${index}`,
    };
    setDataSanitizantes((prevData) => [...prevData, finalData]);
    resetFormSanitizante();
  };

  function resetFormSanitizante() {
    formSanitizante.reset();
    //Reinicia valores no accesibles por el formulario
    setSelectedSanitizante(null);
    setIsFormSanitizanteComplete(false);
    setCustomDosisHl(false);
    setCustomVolumenEnvase(false);
    setCustomUsdEnvase(false);
  }

  useEffect(() => {
    const isFormComplete = selectedSanitizante !== null;
    setIsFormSanitizanteComplete(isFormComplete);
  }, [selectedSanitizante]);

  return (
    <div className="rounded-md flex flex-col border border-border w-full">
      <TitleContainer type="cargaProducto" />
      <Form {...formSanitizante}>
        <form
          onSubmit={formSanitizante.handleSubmit(handleFormSanitizanteSubmit)}
          className="w-full h-full p-4 gap-4 flex flex-col justify-between"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={formSanitizante.control}
              name="id_sanitizante"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sanitizante</FormLabel>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={(value) => {
                      field.onChange(value);
                      const sanitizante =
                        sanitizantes.data?.find((s) => s.id_sanitizante === value) || null;
                      setSelectedSanitizante(sanitizante);

                      if (sanitizante) {
                        formSanitizante.setValue('nombre', sanitizante.nombre, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        formSanitizante.setValue(
                          'precio_usd_envase',
                          sanitizante.precio_usd_envase,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        );
                        formSanitizante.setValue('dosis_x_hl', sanitizante.dosis_x_hl, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        formSanitizante.setValue('unidad', sanitizante.unidad, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        formSanitizante.setValue('volumen_envase', sanitizante.volumen_envase, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        formSanitizante.setValue('tipo', sanitizante.tipo, {
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
                    </SelectTrigger>
                    <SelectContent>
                      {sanitizantes.data?.map((s: Producto, index) => (
                        <SelectItem key={index} value={s.id_sanitizante}>
                          {s.nombre} ({s.tipo})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSanitizante.control}
              name="dosis_x_hl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosis por hl</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        readOnly={!customDosisHl}
                        placeholder={`${selectedSanitizante ? 'Ingrese dosis/hl' : 'Selecciona sanitizante'}`}
                        value={field.value ?? ''}
                        className={`w-full pr-10 px-4 py-2 border rounded-md transition-all duration-200 ${
                          customDosisHl
                            ? 'bg-white text-black border-gray-300'
                            : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                        }`}
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;
                          field.onChange(isNaN(value) ? '' : value);
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCustomDosisHl((prev) => !prev)}
                        className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                        hidden={selectedSanitizante == null}
                      >
                        ✏️
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 p-0">
            <FormField
              control={formSanitizante.control}
              name="precio_usd_envase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>USD por envase</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        readOnly={!customUsdEnvase}
                        placeholder={`${selectedSanitizante ? 'Ingrese USD por envase' : 'Selecciona sanitizante'}`}
                        value={field.value ?? ''}
                        className={`w-full pr-10 px-3 py-2 border transition-all duration-200 ${
                          customUsdEnvase
                            ? 'bg-white text-black border-gray-300'
                            : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                        }`}
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;
                          field.onChange(isNaN(value) ? '' : value);
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCustomUsdEnvase((prev) => !prev)}
                        className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                        hidden={selectedSanitizante == null}
                      >
                        ✏️
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSanitizante.control}
              name="volumen_envase"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col justify-start">
                  <FormLabel>Volumen envase</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        readOnly={!customVolumenEnvase}
                        placeholder={`${selectedSanitizante ? 'Ingrese volumen de envase' : 'Selecciona sanitizante'}`}
                        value={field.value ?? ''}
                        className={`w-full pr-10 px-4 py-2 border rounded-md transition-all duration-200 ${
                          customVolumenEnvase
                            ? 'bg-white text-black border-gray-300'
                            : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                        }`}
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;
                          field.onChange(isNaN(value) ? '' : value);
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCustomVolumenEnvase((prev) => !prev)}
                        className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                        hidden={selectedSanitizante == null}
                      >
                        ✏️
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formSanitizante.control}
              name="unidad"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col justify-start">
                  <FormLabel>Unidad envase</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(value) => {
                        formSanitizante.setValue('unidad', value, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                      }}
                    >
                      <SelectTrigger
                        className={`text-xs w-full  border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                      >
                        <SelectValue
                          placeholder={`${selectedSanitizante ? 'Seleccione unidad' : 'Selecciona sanitizante'}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {unidades?.map((unidad: string, index) => (
                          <SelectItem key={index} value={unidad}>
                            {unidad}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Legend text="Productos agregados estarán disponibles para la carga de planes." />
          <div className="col-span-full">
            <Button
              className={`w-full ${Object.keys(formSanitizante.formState.errors).length > 0 ? 'bg-red-500 hover:bg-red-900 hover:border hover:border-red-900' : ''}`}
              type="submit"
              variant={'submit'}
              disabled={!isFormSanitizanteComplete}
            >
              Agregar Producto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
