'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MaquinariaSchema } from '@/schemas/MaquinariaNew/schema';
import { type MaquinariaFormData } from '@/schemas/MaquinariaNew/types';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useMaquinaria } from '@/hooks/useMaquinaria';
import { type Implemento, type Tractor } from '@/types/maquinaria';

export default function FormMaquinariaNew() {
  const [valorDolar, setValorDolar] = useState('');
  const [customDolarValue, setCustomDolarValue] = useState(0);
  const isCustomDolar = valorDolar === 'custom';

  const maquinaria = useMaquinaria();
  const [selectedTractor, setSelectedTractor] = useState<Tractor | null>(null);  
  const [selectedImplemento, setSelectedImplemento] = useState<Implemento | null>(null);

  const form = useForm<MaquinariaFormData>({
    resolver: zodResolver(MaquinariaSchema),
    defaultValues: {
      cotizacion_usd: undefined,

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
    };
    console.log(finalData);
    form.reset();
    setCustomDolarValue(0);
  };

  useEffect(() => {
    // Cada vez que cambian los valores, verificamos si ambos están completos
    const isFormComplete = !(selectedTractor === null || selectedImplemento === null || valorDolar === '');
    setIsFormComplete(isFormComplete);  // Estado para habilitar o deshabilitar el botón
  }, [selectedTractor, selectedImplemento, valorDolar]);

  const [isFormComplete, setIsFormComplete] = useState(false);

  return (
    
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full rounded-b-lg p-4 grid gap-6 grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 border-amber-400 border-2"
      >

        {/* cotizacion_usd */}
        <div>
          <h1> Cotización </h1>
          <div className="w-full rounded-b-lg p-4 grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
          <FormField
            control={form.control}
            name="cotizacion_usd"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Valor Dólar</FormLabel>
                <div className="flex gap-2">
                  <Select
                    onValueChange={(val) => {
                      setValorDolar(val);
                      if (val === 'custom') {
                        field.onChange(null);
                      } else {
                        field.onChange(Number(val));
                      }
                    }}
                  >
                    {/* <FormControl> */}
                    <SelectTrigger className="text-xs w-full">
                      <SelectValue placeholder="Selecciona una cotización" />
                    </SelectTrigger>
                    {/* </FormControl> */}
                    <SelectContent>
                      <SelectItem value="1050">Oficial - $1050</SelectItem>
                      <SelectItem value="custom">Otro (especificar)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    disabled={!isCustomDolar}
                    placeholder="Especificar cotización"
                    type="number"
                    //   value={customDolarValue}
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
          </div>
        </div>

        {/* Tractor */}
        <div>
          <h1> Datos del tractor </h1>
          <div className='w-full rounded-b-lg p-4 grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
            {/* tractor.id = tractor.marca+ " " +tractor.modelo */}
            <FormField
              control={form.control}
              name="tractor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tractor</FormLabel>                  
                    <Select
                      value={field.value}
                      onValueChange={(value) => {                        
                        field.onChange(value);
                        const tractor = maquinaria.data?.find(t => t.id === value) || null;
                        setSelectedTractor(tractor);                                         
                      }}
                    >
                      {/* <FormControl> */}
                      <SelectTrigger className="text-xs w-full">
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
                        value={selectedTractor?.potencia_CV?? ""}
                        onChange={(value) => {
                          field.onChange(Number(value));
                          console.log(field);
                        }}
                        disabled
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
                      value={selectedTractor?.precio_usd ?? ""}
                      onChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      disabled
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
                      value={selectedTractor?.coef_gastos_conservacion ?? ""}
                      onChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      disabled
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
                      value={selectedTractor?.valor_residual_pct ?? ""}
                      onChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      disabled
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
                      value={selectedTractor?.horas_utiles?? ""}
                      onChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      disabled
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
          <h1> Datos del implemento </h1>
          <div className='w-full rounded-b-lg p-4 grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
            <FormField
              control={form.control}
              name="implemento"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Implemento</FormLabel>              
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        const implemento = selectedTractor?.implementos.find(i => i.nombre === value) || null;
                        setSelectedImplemento(implemento);
                      }}
                    >
                      <SelectTrigger className="text-xs w-full">
                        <SelectValue placeholder={selectedTractor? "Selecciona un implemento": "Primero selecciona un tractor"
                          } />
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

            {/* Valor Implemento */}
            <FormField
              control={form.control}
              name="precio_usd_i"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio del implemento USD</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Selecciona un implemento de la lista"
                      value={selectedImplemento?.precio_usd ?? ""}
                      onChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      disabled
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
                      value={selectedImplemento?.coef_gastos_conservacion ?? ""}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      disabled
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
                      value={selectedImplemento?.valor_residual_pct ?? ""}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      disabled
                    />
                  </FormControl>
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
                      value={selectedImplemento?.consumo_litros_hora_CV ?? ""}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      disabled
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
                      value={selectedImplemento?.horas_utiles ?? ""}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Botón */}
        <div className="col-span-full flex flex-col gap-2">
          <Button className="w-full" type="submit" variant={'submit'} disabled={!isFormComplete}>
            Agregar Conjunto
          </Button>
        </div>
      </form>
    </Form>
  );
}
