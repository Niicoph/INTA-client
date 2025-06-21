'use client';
import CargaDatosIcon from '@/assets/Icons/Outlined/cargaDatos.png';
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
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import Legend from '@/components/ui/Legend/Legend';

import { MaquinariaSchema } from '@/schemas/Maquinaria/schema';
import { useMaquinaria } from '@/hooks/useMaquinaria';
import { type MaquinariaFormData } from '@/schemas/Maquinaria/types';
import { type Implemento, type Tractor } from '@/types/maquinaria';
import { type Dollar } from '@/types/dollar';
import { MaquinariaContext } from '@/context/MaquinariaContext';
import { useDollar } from '@/hooks/useDollar';
import { useGasoil } from '@/hooks/useGasoil';
import { calcularCostoTotalMaquinaria } from '@/utils/costoTotalMaquinaria';

export default function FormMaquinaria() {
  const maquinariaContext = useContext(MaquinariaContext);
  const gasoilCollectionNQN = useGasoil('NEUQUEN');
  const gasoilCollection = gasoilCollectionNQN.data?.slice(0, 1);

  if (!maquinariaContext) {
    return null;
  }

  const { setData } = maquinariaContext;
  const dollarCollection = useDollar();
  const [valorDolar, setValorDolar] = useState<string | undefined>('');
  const [customDolarValue, setCustomDolarValue] = useState(0);
  const [valorGasoil, setValorGasoil] = useState('');
  const [customGasoilValue, setCustomGasoilValue] = useState(0);
  const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);
  const [selectedImplemento, setSelectedImplemento] = useState<Implemento | null>(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const maquinaria = useMaquinaria();

  const isCustomGasoil = valorGasoil === 'custom';
  const isCustomDolar = valorDolar === 'custom';
  const [customTractorCV, setCustomTractorCV] = useState(false);
  const [customTractorUSD, setCustomTractorUSD] = useState(false);
  const [customTractorResiduoPCT, setCustomTractorResiduoPCT] = useState(false);
  const [customImplementoConsumo, setCustomImplementoConsumo] = useState(false);
  const [customImplementoUSD, setCustomImplementoUSD] = useState(false);
  const [customImplementoResiduoPCT, setCustomImplementoResiduoPCT] = useState(false);

  const form = useForm<MaquinariaFormData>({
    resolver: zodResolver(MaquinariaSchema),
    defaultValues: {
      //Cotizaciones
      cotizacion_usd: undefined,
      cotizacion_gasoil_litro: undefined,

      //Datos del tractor
      tractor: '',
      nombre_t: undefined,
      potencia_CV: undefined,
      precio_usd_t: undefined,
      coef_gastos_conservacion_t: undefined,
      valor_residual_pct_t: undefined,
      horas_utiles_t: undefined,

      //Datos del implemento
      implemento: '',
      nombre_i: undefined,
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
    const nextIndex = maquinariaContext.data.length + 1;
    // calculo los datos y los envio al context.
    const costoEconomico = calcularCostoTotalMaquinaria(finalData, nextIndex);
    setData((prevData) => [...prevData, costoEconomico]);
    resetForm();
  };

  function resetForm() {
    form.reset();
    //Reinicia valores no accesibles por el formulario
    setSelectedTractor(null);
    setSelectedImplemento(null);
    setValorDolar('');
    setValorGasoil('');
    setCustomDolarValue(0);
    setCustomGasoilValue(0);
    setCustomImplementoConsumo(false);
    setCustomImplementoUSD(false);
    setCustomImplementoResiduoPCT(false);
    setCustomTractorCV(false);
    setCustomTractorUSD(false);
    setCustomTractorResiduoPCT(false);
    setIsFormComplete(false);
  }

  useEffect(() => {
    const isFormComplete = !(
      selectedTractor === null ||
      selectedImplemento === null ||
      valorDolar === '' ||
      valorGasoil === ''
    );
    setIsFormComplete(isFormComplete);
  }, [selectedTractor, selectedImplemento, valorDolar, valorGasoil]);

  return (
    <div className="rounded-md flex flex-col border h-full border-border">
      <TitleContainer icon={CargaDatosIcon} title="Carga de Conjuntos" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="w-full h-full p-4 gap-4 flex flex-col justify-between"
        >
          <div className="flex flex-row">
            <div className="w-full grid gap-4 grid-cols-1">
              <FormField
                control={form.control}
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
                          {dollarCollection.data?.value && dollarCollection.data?.name && (
                            <SelectItem
                              value={String(dollarCollection.data.value)}
                              key={`dollar-${dollarCollection.data.value}`}
                            >
                              {`$${dollarCollection.data.value} - ${dollarCollection.data.name}`}
                            </SelectItem>
                          )}

                          <SelectItem key="custom-option" value="custom">
                            Otro (especificar)
                          </SelectItem>
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
              <FormField
                control={form.control}
                name="cotizacion_gasoil_litro"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel>Gasoil</FormLabel>
                    <div className="flex flex-col gap-1 md:flex-row">
                      <Select
                        value={valorGasoil ?? ''}
                        onValueChange={(val) => {
                          setValorGasoil(val);
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
                          {gasoilCollection?.map((gasoil, index) => (
                            <SelectItem
                              key={gasoil.localidad + index}
                              value={gasoil.precio.toString()}
                            >
                              ${gasoil.precio} - {gasoil.localidad}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Otro (especificar)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        className={`text-xs w-full pr-10 px-3 py-2 border transition-all duration-200 ${
                          isCustomGasoil
                            ? 'bg-white text-black border-gray-300'
                            : 'bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                        }`}
                        hidden={!isCustomGasoil}
                        placeholder="Especifique precio de gasoil"
                        type="number"
                        value={!isCustomGasoil ? '' : (field.value ?? '')}
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
          <div className="col-span-full h-full flex flex-col gap-4 md:flex-row xl:grid grid-cols-2">
            <div className="w-full flex flex-col gap-4">
              <FormField
                control={form.control}
                name="tractor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tractor</FormLabel>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(value) => {
                        field.onChange(value);
                        const tractor =
                          maquinaria.data?.tractores.find((t) => t.id === value) || null;
                        setSelectedTractor(tractor);

                        if (tractor) {
                          form.setValue('nombre_t', tractor.nombre, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
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
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`text-xs w-full border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                      >
                        <SelectValue placeholder="Selecciona tractor" />
                      </SelectTrigger>
                      <SelectContent>
                        {maquinaria.data?.tractores.map((tractor: Tractor) => (
                          <SelectItem key={`${tractor.id} ${tractor.nombre}`} value={tractor.id}>
                            {tractor.nombre} ({tractor.potencia_CV} CV)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="potencia_CV"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CV del tractor</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customTractorCV}
                          placeholder="Selecciona tractor"
                          value={field.value ?? ''}
                          className={`w-full pr-10 px-3 py-2 border transition-all duration-200 ${
                            customTractorCV
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
                          onClick={() => setCustomTractorCV((prev) => !prev)}
                          className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                          hidden={selectedTractor == null}
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
                control={form.control}
                name="precio_usd_t"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio del tractor USD</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customTractorUSD}
                          placeholder="Selecciona tractor"
                          value={field.value ?? ''}
                          className={`w-full pr-10 px-4 py-2 border rounded-md transition-all duration-200 ${
                            customTractorUSD
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
                          onClick={() => setCustomTractorUSD((prev) => !prev)}
                          className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                          hidden={selectedTractor == null}
                        >
                          ✏️
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="coef_gastos_conservacion_t"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coeficiente de gastos de conservación</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Selecciona tractor"
                        value={field.value ?? ''}
                        className="cursor-not-allowed text-xs"
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="valor_residual_pct_t"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor residual (%)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customTractorResiduoPCT}
                          placeholder="Selecciona tractor"
                          value={field.value ?? ''}
                          className={`w-full pr-10 px-3 py-2 border transition-all duration-200 ${
                            customTractorResiduoPCT
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
                          onClick={() => setCustomTractorResiduoPCT((prev) => !prev)}
                          className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                          hidden={selectedTractor == null}
                        >
                          ✏️
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="horas_utiles_t"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas útiles</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Selecciona tractor"
                        value={field.value ?? ''}
                        className="cursor-not-allowed text-xs"
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            <div className="w-full flex flex-col gap-4 ">
              <FormField
                control={form.control}
                name="implemento"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Implemento</FormLabel>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(value) => {
                        field.onChange(value);
                        const implemento =
                          maquinaria.data?.implementos.find((i) => i.id === value) || null;
                        setSelectedImplemento(implemento);

                        if (implemento) {
                          form.setValue('nombre_i', implemento.nombre, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
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
                          form.setValue(
                            'consumo_litros_hora_CV',
                            implemento.consumo_litros_hora_CV,
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true,
                            }
                          );
                          form.setValue('horas_utiles_i', implemento.horas_utiles, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`text-xs w-full  border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                      >
                        <SelectValue placeholder={'Selecciona implemento'} />
                      </SelectTrigger>
                      <SelectContent>
                        {maquinaria.data?.implementos.map((implemento: Implemento) => (
                          <SelectItem
                            key={`${implemento.id} ${implemento.nombre}`}
                            value={implemento.id}
                          >
                            {implemento.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consumo_litros_hora_CV"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consumo lt/h.CV</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customImplementoConsumo}
                          placeholder="Selecciona implemento"
                          value={field.value ?? ''}
                          className={`w-full pr-10 px-3 py-2 border transition-all duration-200 ${
                            customImplementoConsumo
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
                          onClick={() => setCustomImplementoConsumo((prev) => !prev)}
                          className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                          hidden={selectedImplemento == null}
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
                control={form.control}
                name="precio_usd_i"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio del implemento USD</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="input"
                          readOnly={!customImplementoUSD}
                          placeholder="Selecciona implemento"
                          value={field.value ?? ''}
                          className={`w-full pr-10 px-3 py-2 border transition-all duration-200 ${
                            customImplementoUSD
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
                          onClick={() => setCustomImplementoUSD((prev) => !prev)}
                          className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                          hidden={selectedImplemento == null}
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
                control={form.control}
                name="valor_residual_pct_i"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor residual (%)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customImplementoResiduoPCT}
                          placeholder="Selecciona implemento"
                          value={field.value ?? ''}
                          className={`w-full pr-10 px-3 py-2 border transition-all duration-200 ${
                            customImplementoResiduoPCT
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
                          onClick={() => setCustomImplementoResiduoPCT((prev) => !prev)}
                          className="h-fit w-fit p-0.5 absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500  text-lg transition-colors"
                          hidden={selectedImplemento == null}
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
          </div>
          <Legend text="Valor residual (%): valor estimado de Tractor/Implemento al fin de su vida útil." />
          <div className="col-span-full">
            <Button
              className={`w-full ${Object.keys(form.formState.errors).length > 0 ? 'bg-red-500 hover:bg-red-900 hover:border hover:border-red-900' : ''}`}
              type="submit"
              variant="submit"
              disabled={!isFormComplete}
            >
              Agregar Conjunto
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
