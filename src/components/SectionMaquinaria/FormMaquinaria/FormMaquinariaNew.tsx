'use client';

import { useState, useEffect, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
// import * as Select from '@/components/ui/select';

import { MaquinariaSchema } from '@/schemas/MaquinariaNew/schema';
import { useMaquinaria } from '@/hooks/useMaquinaria';
import { type MaquinariaFormData } from '@/schemas/MaquinariaNew/types';
import { type Implemento, type Tractor } from '@/types/maquinaria';
import { MaquinariaContext } from '@/context/MaquinariaContext';

export default function FormMaquinariaNew() {
  const maquinariaContext = useContext(MaquinariaContext);

  if (!maquinariaContext) {
    return null;
  }

  const { setData } = maquinariaContext;

  const [valorDolar, setValorDolar] = useState('');
  const [customDolarValue, setCustomDolarValue] = useState(0);
  const [valorGasoil, setValorGasoil] = useState('');
  const [customGasoilValue, setCustomGasoilValue] = useState(0);
  const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);
  const [selectedImplemento, setSelectedImplemento] = useState<Implemento | null>(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const maquinaria = useMaquinaria();

  const isCustomGasoil = valorGasoil === 'custom';
  const isCustomDolar = valorDolar === 'custom';

  const form = useForm<MaquinariaFormData>({
    resolver: zodResolver(MaquinariaSchema),
    defaultValues: {
      //Cotizaciones
      cotizacion_usd: undefined,
      cotizacion_gasoil_litro: undefined,

      //Datos del tractor
      tractor: '',
      potencia_CV: undefined,
      precio_usd_t: undefined,
      coef_gastos_conservacion_t: undefined,
      valor_residual_pct_t: undefined,
      horas_utiles_t: undefined,

      //Datos del implemento
      implemento: '',
      precio_usd_i: undefined,
      coef_gastos_conservacion_i: undefined,
      valor_residual_pct_i: undefined,
      consumo_litros_hora_CV: undefined,
      horas_utiles_i: undefined,
    },
  });

  const handleFormSubmit = (data: MaquinariaFormData) => {
    const finalData = {
      ...data,
      cotizacion_usd: isCustomDolar ? Number(customDolarValue) : data.cotizacion_usd,
      cotizacion_gasoil_litro: isCustomGasoil
        ? Number(customGasoilValue)
        : data.cotizacion_gasoil_litro,
    };
    setData((prevData) => [...prevData, finalData]);
    resetValues();
    form.reset();
  };

  /**
   * Reinicia valores no accesibles por el formulario
   */
  function resetValues() {
    setSelectedTractor(null);
    setSelectedImplemento(null);
    setValorDolar('');
    setValorGasoil('');
    setCustomDolarValue(0);
    setCustomGasoilValue(0);
    setIsFormComplete(false);
  }

  useEffect(() => {
    // Cada vez que cambian los valores, verificamos si ambos están completos
    const isFormComplete = !(
      selectedTractor === null ||
      selectedImplemento === null ||
      valorDolar === ''
    );
    setIsFormComplete(isFormComplete); // Estado para habilitar o deshabilitar el botón
  }, [selectedTractor, selectedImplemento, valorDolar]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full rounded-b-lg p-4 gap-3 grid grid-row-2 grid-cols-1 md:grid-cols-2 "
      >
        {/* Cotizaciones */}
        <div className="col-span-full">
          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <FormField
              control={form.control}
              name="cotizacion_usd"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dólar</FormLabel>
                  <div className="flex gap-2 ">
                    <Select
                      value={valorDolar ?? ''}
                      onValueChange={(val) => {
                        setValorDolar(val);
                        if (val === 'custom') {
                          field.onChange('');
                        } else {
                          field.onChange(Number(val));
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                      >
                        <SelectValue placeholder="Selecciona una cotización" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1050">Oficial - $1050</SelectItem>
                        <SelectItem value="custom">Otro (especificar)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-gray-200'}`}
                      disabled={!isCustomDolar}
                      placeholder="Especificar cotización"
                      type="number"
                      //   value={customDolarValue}
                      value={!isCustomDolar ? '' : field.value}
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
              name="cotizacion_gasoil_litro"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Gasoil</FormLabel>
                  <div className="flex gap-2">
                    <Select
                      value={valorGasoil ?? ''}
                      onValueChange={(val) => {
                        setValorGasoil(val);
                        if (val === 'custom') {
                          field.onChange('');
                        } else {
                          field.onChange(Number(val));
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                      >
                        <SelectValue placeholder="Selecciona una cotización" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1100">YPF - $1100</SelectItem>
                        <SelectItem value="custom">Otro (especificar)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-gray-200'}`}
                      disabled={!isCustomGasoil}
                      placeholder="Especificar cotización"
                      type="number"
                      value={!isCustomGasoil ? '' : field.value}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setCustomGasoilValue(value);
                        field.onChange(value);
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Tractor */}
        <div>
          <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
            <FormField
              control={form.control}
              name="tractor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tractor</FormLabel>
                  <Select
                    value={field.value ?? ''}
                    defaultValue="Tractor A (60 CV)"
                    onValueChange={(value) => {
                      field.onChange(value);
                      const tractor = maquinaria.data?.find((t) => t.id === value) || null;

                      setSelectedTractor(tractor);
                      setSelectedImplemento(null);
                      form.setValue('implemento', '', {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });

                      if (tractor) {
                        form.setValue('potencia_CV', tractor.potencia_CV, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        form.setValue('precio_usd_t', tractor.precio_usd, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        form.setValue(
                          'coef_gastos_conservacion_t',
                          tractor.coef_gastos_conservacion,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        );
                        form.setValue('valor_residual_pct_t', tractor.valor_residual_pct, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        form.setValue('horas_utiles_t', tractor.horas_utiles, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });

                        //Reinicia inputs de implemento al cambiar de tractor
                        form.resetField('implemento');
                        form.resetField('precio_usd_i');
                        form.resetField('coef_gastos_conservacion_i');
                        form.resetField('valor_residual_pct_i');
                        form.resetField('consumo_litros_hora_CV');
                        form.resetField('horas_utiles_i');
                      }
                    }}
                  >
                    {/* <FormControl> */}
                    <SelectTrigger
                      className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                    >
                      <SelectValue placeholder="Selecciona un tractor" />
                    </SelectTrigger>
                    {/* </FormControl> */}
                    <SelectContent>
                      {maquinaria.data?.map((tractor: Tractor) => (
                        <SelectItem key={tractor.id} value={tractor.id}>
                          {tractor.marca} {tractor.modelo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* potencia_CV */}
            <FormField
              control={form.control}
              name="potencia_CV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CV del tractor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecciona un tractor de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* precio_usd */}
            <FormField
              control={form.control}
              name="precio_usd_t"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio del tractor USD</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecciona un tractor de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gasto Coeficiente Tractor*/}
            <FormField
              control={form.control}
              name="coef_gastos_conservacion_t"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coeficiente de gastos de conservación</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecciona un tractor de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Valor Residual Tractor */}
            <FormField
              control={form.control}
              name="valor_residual_pct_t"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor residual en %</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecciona un tractor de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Horas Útiles Tractor */}
            <FormField
              control={form.control}
              name="horas_utiles_t"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas útiles</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Selecciona un tractor de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Implemento */}
        <div>
          <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
            <FormField
              control={form.control}
              name="implemento"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Implemento</FormLabel>
                  <Select
                    value={selectedTractor ? (field.value ?? '') : ''}
                    onValueChange={(value) => {
                      field.onChange(value);
                      const implemento =
                        selectedTractor?.implementos.find((i) => i.nombre === value) || null;
                      setSelectedImplemento(implemento);

                      if (implemento) {
                        form.setValue('precio_usd_i', implemento.precio_usd, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        form.setValue(
                          'coef_gastos_conservacion_i',
                          implemento.coef_gastos_conservacion,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        );
                        form.setValue('valor_residual_pct_i', implemento.valor_residual_pct, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        form.setValue('consumo_litros_hora_CV', implemento.consumo_litros_hora_CV, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        });
                        form.setValue('horas_utiles_i', implemento.horas_utiles, {
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
                      <SelectValue
                        placeholder={
                          selectedTractor
                            ? 'Selecciona un implemento'
                            : 'Primero selecciona un tractor'
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTractor?.implementos.map((implemento: Implemento) => (
                        <SelectItem key={implemento.nombre} value={implemento.nombre}>
                          {implemento.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Consumo implemento */}
            <FormField
              control={form.control}
              name="consumo_litros_hora_CV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consumo lt/h.CV</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecciona un implemento de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Valor Implemento */}
            <FormField
              control={form.control}
              name="precio_usd_i"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio del implemento USD</FormLabel>
                  <FormControl>
                    <Input
                      type="input"
                      placeholder="Selecciona un implemento de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gasto Coeficiente implemento */}
            <FormField
              control={form.control}
              name="coef_gastos_conservacion_i"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coeficiente de gastos de conservación</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecciona un implemento de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Valor Residual implemento */}
            <FormField
              control={form.control}
              name="valor_residual_pct_i"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor residual en %</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecciona un implemento de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Horas útiles implemento */}
            <FormField
              control={form.control}
              name="horas_utiles_i"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas útiles</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Selecciona un implemento de la lista"
                      value={field.value ?? ''}
                      className="cursor-not-allowed"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="col-span-full flex flex-col gap-2">
          <Button className="w-full" type="submit" variant={'submit'} disabled={!isFormComplete}>
            Agregar Conjunto
          </Button>
        </div>
      </form>
    </Form>
  );
}
