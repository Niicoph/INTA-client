'use client';
import { useState, useEffect, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import Legend from '@/components/ui/Legend/Legend';

import { MaquinariaSchema } from '@/schemas/Maquinaria/schema';

//import { useMaquinaria } from '@/hooks/useMaquinaria'; //JSON data
import { useMaquinariaSipan } from '@/hooks/useMaquinariaSipan'; //SIPAN data

import { type MaquinariaFormData } from '@/schemas/Maquinaria/types';
import { type Implemento, type Tractor } from '@/types/maquinaria';
import { MaquinariaContext } from '@/context/MaquinariaContext';
import { useDollar } from '@/hooks/useDollar';
// import { useGasoil } from '@/hooks/useGasoil';
import { calcularCostoTotalMaquinaria } from '@/utils/costoTotalMaquinaria';

export default function FormMaquinaria() {
  const maquinariaContext = useContext(MaquinariaContext);
  //   const gasoilCollectionNQN = useGasoil('NEUQUEN');
  //   const gasoilCollection = gasoilCollectionNQN.data?.slice(0, 1);

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

  //const maquinaria = useMaquinaria(); //JSON data
  const maquinaria = useMaquinariaSipan(); //SIPAN data

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
      id_conjunto: '',

      //Cotizaciones
      cotizacion_usd: undefined,
      cotizacion_gasoil_litro: undefined,

      //Datos del tractor
      id_tractor: '',
      nombre_t: undefined,
      potencia_CV: undefined,
      precio_usd_t: undefined,
      coef_gastos_conservacion_t: undefined,
      valor_residual_pct_t: undefined,
      horas_utiles_t: undefined,

      //Datos del implemento
      id_implemento: '',
      nombre_i: undefined,
      precio_usd_i: undefined,
      coef_gastos_conservacion_i: undefined,
      valor_residual_pct_i: undefined,
      consumo_litros_hora_CV: undefined,
      horas_utiles_i: undefined,
    },
  });

  const handleFormSubmit = (data: MaquinariaFormData) => {
    /* Manejo de index para evitar que al eliminar, se intente usar un id utilizado */
    let index = maquinariaContext.data.length + 1;
    if (index > 1) {
      index = parseInt(maquinariaContext.data[index - 2].id_conjunto) + 1;
    }

    const finalData = {
      ...data,
      id_conjunto: `${index}`,
      cotizacion_usd: isCustomDolar ? Number(customDolarValue) : data.cotizacion_usd,
      cotizacion_gasoil_litro: isCustomGasoil
        ? Number(customGasoilValue)
        : data.cotizacion_gasoil_litro,
    };
    // calcula datos faltantes y los envia al context como ConjuntoMaquinaria[].
    const finalFinalData = calcularCostoTotalMaquinaria(finalData);

    setData((prev) => [...prev, finalFinalData]);
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
      <TitleContainer type="CargaConjunto" />
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
                    <FormLabel className="text-muted-foreground text-xs">Dólar</FormLabel>
                    <div className="flex flex-col gap-4 md:flex-row ">
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
                          className={`text-sm font-normal  p-5 w-full border-2 ${field.value ? 'border-green-200' : 'border-blue-200'} ${form.formState.errors.cotizacion_usd ? 'border-red-500' : ''} `}
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
                        className={`w-full text-sm font-normal p-5 border transition-all duration-200 ${
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
                    <FormLabel className="text-muted-foreground text-xs">Gasoil</FormLabel>
                    <div className="flex flex-col gap-4 md:flex-row">
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
                          className={`text-sm font-normal p-5 w-full border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                        >
                          <SelectValue placeholder="Selecciona cotización" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* {gasoilCollection?.map((gasoil, index) => (
                            <SelectItem
                              key={gasoil.localidad + index}
                              value={gasoil.precio.toString()}
                            >
                              ${gasoil.precio} - {gasoil.localidad}
                            </SelectItem>
                          ))} */}
                          <SelectItem value="custom">Otro (especificar)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        className={`w-full text-sm font-normal p-5 border transition-all duration-200 ${
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
          <div className="col-span-full h-full flex flex-col gap-4 md:flex-row xl:grid xl:grid-cols-2">
            <div className="w-full flex flex-col gap-4 ">
              <FormField
                control={form.control}
                name="id_tractor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-xs">Tractor</FormLabel>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(value) => {
                        const tractor =
                          maquinaria.data?.tractores.find((t) => t.id_tractor === value) || null;
                        setSelectedTractor(tractor);

                        if (tractor) {
                          field.onChange(value);
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
                        className={`text-sm font-normal py-5 pr-0 w-full overflow-hidden border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                      >
                        <SelectValue placeholder="Selecciona tractor" />
                      </SelectTrigger>
                      <SelectContent>
                        {maquinaria.data?.tractores.map((tractor: Tractor) => (
                          <SelectItem
                            key={`${tractor.id_tractor} ${tractor.nombre}`}
                            value={tractor.id_tractor}
                          >
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
                    <FormLabel className="text-muted-foreground text-xs">CV del tractor</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customTractorCV}
                          placeholder={`${selectedTractor ? 'Ingrese CV' : 'Selecciona tractor'}`}
                          value={field.value ?? ''}
                          className={`w-full text-sm font-normal p-5 border transition-all duration-200 ${
                            customTractorCV
                              ? 'bg-white text-black border-gray-300'
                              : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                          }`}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? '' : value);
                          }}
                        />

                        <EditButton
                          onClick={() => setCustomTractorCV((prev) => !prev)}
                          hidden={selectedTractor == null}
                        />
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
                    <FormLabel className="text-muted-foreground text-xs">
                      Precio del tractor USD
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customTractorUSD}
                          placeholder={`${selectedTractor ? 'Ingrese precio USD' : 'Selecciona tractor'}`}
                          value={field.value ?? ''}
                          className={`w-full text-sm font-normal p-5 border rounded-md transition-all duration-200 ${
                            customTractorUSD
                              ? 'bg-white text-black border-gray-300'
                              : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                          }`}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? '' : value);
                          }}
                        />

                        <EditButton
                          onClick={() => setCustomTractorUSD((prev) => !prev)}
                          hidden={selectedTractor == null}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valor_residual_pct_t"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-xs">
                      Valor residual (%)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customTractorResiduoPCT}
                          placeholder={`${selectedTractor ? 'Ingrese porcentaje residual' : 'Selecciona tractor'}`}
                          value={field.value ?? ''}
                          className={`w-full text-sm font-normal p-5 border transition-all duration-200 ${
                            customTractorResiduoPCT
                              ? 'bg-white text-black border-gray-300'
                              : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                          }`}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? '' : value);
                          }}
                        />

                        <EditButton
                          onClick={() => setCustomTractorResiduoPCT((prev) => !prev)}
                          hidden={selectedTractor == null}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col gap-4  ">
              <FormField
                control={form.control}
                name="id_implemento"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-muted-foreground text-xs">Implemento</FormLabel>
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(value) => {
                        const implemento =
                          maquinaria.data?.implementos.find((i) => i.id_implemento === value) ||
                          null;
                        setSelectedImplemento(implemento);

                        if (implemento) {
                          field.onChange(value);
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
                        className={`text-sm font-normal py-5 pr-0 w-full overflow-hidden border-2 ${field.value ? 'border-green-200' : 'border-blue-200'}`}
                      >
                        <SelectValue placeholder={'Selecciona implemento'} />
                      </SelectTrigger>
                      <SelectContent>
                        {maquinaria.data?.implementos.map((implemento: Implemento) => (
                          <SelectItem
                            key={`${implemento.id_implemento} ${implemento.nombre}`}
                            value={implemento.id_implemento}
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
                    <FormLabel className="text-muted-foreground text-xs">Consumo lt/h.CV</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customImplementoConsumo}
                          placeholder={`${selectedImplemento ? 'Ingrese consumo en lt/h.CV' : 'Selecciona implemento'}`}
                          value={field.value ?? ''}
                          className={`w-full text-sm font-normal p-5 border transition-all duration-200 ${
                            customImplementoConsumo
                              ? 'bg-white text-black border-gray-300'
                              : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                          }`}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? '' : value);
                          }}
                        />

                        <EditButton
                          onClick={() => setCustomImplementoConsumo((prev) => !prev)}
                          hidden={selectedImplemento == null}
                        />
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
                    <FormLabel className="text-muted-foreground text-xs">
                      Precio del implemento USD
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="input"
                          readOnly={!customImplementoUSD}
                          placeholder={`${selectedImplemento ? 'Ingrese precio USD' : 'Selecciona implemento'}`}
                          value={field.value ?? ''}
                          className={`w-full text-sm font-normal p-5 border transition-all duration-200 ${
                            customImplementoUSD
                              ? 'bg-white text-black border-gray-300'
                              : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                          }`}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? '' : value);
                          }}
                        />

                        <EditButton
                          onClick={() => setCustomImplementoUSD((prev) => !prev)}
                          hidden={selectedImplemento == null}
                        />
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
                    <FormLabel className="text-muted-foreground text-xs">
                      Valor residual (%)
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          readOnly={!customImplementoResiduoPCT}
                          placeholder={`${selectedImplemento ? 'Ingrese porcentaje residual' : 'Selecciona implemento'}`}
                          value={field.value ?? ''}
                          className={`w-full text-sm font-normal p-5 border transition-all duration-200 ${
                            customImplementoResiduoPCT
                              ? 'bg-white text-black border-gray-300'
                              : 'text-xs bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed'
                          }`}
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? '' : value);
                          }}
                        />

                        <EditButton
                          onClick={() => setCustomImplementoResiduoPCT((prev) => !prev)}
                          hidden={selectedImplemento == null}
                        />
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
