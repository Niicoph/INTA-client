'use client';
import { useEffect, useState, useContext } from 'react';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import Legend from '@/components/ui/Legend/Legend';
import { ProductoSchema } from '@/schemas/Fertilizacion/schema';
import { type ProductoFormData } from '@/schemas/Fertilizacion/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

//import { useFertilizantes } from '@/hooks/useFertilizantes'; //JSON data
import { useFertilizantesSipan } from '@/hooks/useFertilizantesSipan'; //SIPAN data

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EditButton } from '@/components/ui/edit-button';
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
import type { Producto } from '@/types/fertilizacion';
import { unidades } from '@/types/fertilizacion';
import { FertilizantesContext } from '@/context/FertilizantesContext';

export default function FormProducto() {
  const fertilizantesContext = useContext(FertilizantesContext);
  if (!fertilizantesContext) {
    return null;
  }
  const setDataFertilizantes = fertilizantesContext.setData;
  const [selectedFertilizante, setSelectedFertilizante] = useState<Producto | null>(null);

  const [customDosisHa, setCustomDosisHa] = useState(false);
  const [customVolumenEnvase, setCustomVolumenEnvase] = useState(false);
  const [customUsdEnvase, setCustomUsdEnvase] = useState(false);

  const [isFormFertilizanteComplete, setIsFormProductoComplete] = useState<boolean>(false);

  //const fertilizantes = useFertilizantes(); //JSON data
  const fertilizantes = useFertilizantesSipan(); //SIPAN data

  const formFertilizante = useForm<ProductoFormData>({
    resolver: zodResolver(ProductoSchema),
    defaultValues: {
      id_fertilizante: '',
      nombre: '',
      precio_usd_envase: undefined,
      unidad: undefined,
      dosis_x_ha: undefined,
      volumen_envase: undefined,
    },
  });

  const handleFormFertilizanteSubmit = (data: ProductoFormData) => {
    /* Manejo de index para evitar que al eliminar, se intente usar un id utilizado */
    let index = fertilizantesContext.data.length + 1;
    if (index > 1) {
      index = parseInt(fertilizantesContext.data[index - 2].id_fertilizante) + 1;
    }
    const finalData = {
      ...data,
      id_fertilizante: `${index}`,
    };
    setDataFertilizantes((prevData) => [...prevData, finalData]);
    resetFormFertilizante();
  };

  function resetFormFertilizante() {
    formFertilizante.reset();
    //Reinicia valores no accesibles por el formulario
    setSelectedFertilizante(null);
    setIsFormProductoComplete(false);
    setCustomDosisHa(false);
    setCustomVolumenEnvase(false);
    setCustomUsdEnvase(false);
  }

  useEffect(() => {
    const isFormComplete = selectedFertilizante !== null;
    setIsFormProductoComplete(isFormComplete);
  }, [selectedFertilizante]);

  return (
    <div className="rounded-md flex flex-col border border-border w-full">
      <TitleContainer type="cargaProducto" />
      <Form {...formFertilizante}>
        <form
          onSubmit={formFertilizante.handleSubmit(handleFormFertilizanteSubmit)}
          className="w-full h-full p-4 gap-4 flex flex-col justify-between"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={formFertilizante.control}
              name="id_fertilizante"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-muted-foreground text-xs">Fertilizante</FormLabel>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={(value) => {
                      field.onChange(value);
                      const fertilizante =
                        fertilizantes.data?.find((f) => f.id_fertilizante === value) || null;
                      setSelectedFertilizante(fertilizante);

                      if (fertilizante) {
                        formFertilizante.setValue('nombre', fertilizante.nombre, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        formFertilizante.setValue(
                          'precio_usd_envase',
                          fertilizante.precio_usd_envase,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        );
                        formFertilizante.setValue('dosis_x_ha', fertilizante.dosis_x_ha, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        formFertilizante.setValue('unidad', fertilizante.unidad, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        formFertilizante.setValue('volumen_envase', fertilizante.volumen_envase, {
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
                      <SelectValue placeholder="Selecciona un fertilizante" />
                    </SelectTrigger>
                    <SelectContent>
                      {fertilizantes.data?.map((s: Producto) => (
                        <SelectItem
                          key={`${s.id_fertilizante}${s.nombre}`}
                          value={s.id_fertilizante}
                        >
                          {s.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formFertilizante.control}
              name="dosis_x_ha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs">Dosis por ha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        readOnly={!customDosisHa}
                        placeholder={`${selectedFertilizante ? 'Ingrese dosis/ha' : 'Selecciona fertilizante'}`}
                        value={field.value ?? ''}
                        className={`w-full pr-10 px-4 py-2 border rounded-md transition-all duration-200 ${
                          customDosisHa
                            ? 'bg-white text-black border-gray-300'
                            : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                        }`}
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;
                          field.onChange(isNaN(value) ? '' : value);
                        }}
                      />

                      <EditButton
                        onClick={() => setCustomDosisHa((prev) => !prev)}
                        hidden={selectedFertilizante == null}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 p-0">
            <FormField
              control={formFertilizante.control}
              name="precio_usd_envase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs">USD por envase</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        readOnly={!customUsdEnvase}
                        placeholder={`${selectedFertilizante ? 'Ingrese USD por envase' : 'Selecciona fertilizante'}`}
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

                      <EditButton
                        onClick={() => setCustomUsdEnvase((prev) => !prev)}
                        hidden={selectedFertilizante == null}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formFertilizante.control}
              name="volumen_envase"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col justify-start">
                  <FormLabel className="text-muted-foreground text-xs">Volumen envase</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        readOnly={!customVolumenEnvase}
                        placeholder={`${selectedFertilizante ? 'Ingrese volumen de envase' : 'Selecciona fertilizante'}`}
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

                      <EditButton
                        onClick={() => setCustomVolumenEnvase((prev) => !prev)}
                        hidden={selectedFertilizante == null}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formFertilizante.control}
              name="unidad"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col justify-start">
                  <FormLabel className="text-muted-foreground text-xs">Unidad envase</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(value) => {
                        formFertilizante.setValue('unidad', value, {
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
                          placeholder={`${selectedFertilizante ? 'Seleccione unidad' : 'Selecciona fertilizante'}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {unidades?.map((unidad: string) => (
                          <SelectItem key={unidad} value={unidad}>
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
              className={`w-full ${Object.keys(formFertilizante.formState.errors).length > 0 ? 'bg-red-500 hover:bg-red-900 hover:border hover:border-red-900' : ''}`}
              type="submit"
              variant={'submit'}
              disabled={!isFormFertilizanteComplete}
            >
              Agregar Producto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
