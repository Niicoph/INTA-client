'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MaquinariaSchema } from '@/schemas/Maquinaria/schema';
import { type MaquinariaFormData } from '@/schemas/Maquinaria/types';

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

export default function FormMaquinaria() {
  const [implemento, setImplemento] = useState('');
  const [valorDolar, setValorDolar] = useState('');
  const [customImplementoValue, setCustomImplementoValue] = useState('');
  const [customDolarValue, setCustomDolarValue] = useState(0);
  const isCustom = implemento === 'custom';
  const isCustomDolar = valorDolar === 'custom';

  const form = useForm<MaquinariaFormData>({
    resolver: zodResolver(MaquinariaSchema),
    defaultValues: {
      valorDolar: undefined,
      potenciaTractor: undefined,
      implemento: '',
      valorImplemento: undefined,
      gastoCoeficiente: undefined,
      valorResidual: undefined,
      consumo: undefined,
      minutosUtiles: undefined,
    },
  });

  const handleFormSubmit = (data: MaquinariaFormData) => {
    const finalData = {
      ...data,
      implemento: isCustom ? customImplementoValue : data.implemento,
      valorDolar: isCustomDolar ? Number(customDolarValue) : data.valorDolar,
    };

    form.reset();
    setCustomImplementoValue('');
    setCustomDolarValue(0);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full rounded-b-lg p-4 grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="valorDolar"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Valor Dólar</FormLabel>
              <div className="flex gap-2">
                <Select
                  onValueChange={(val) => {
                    setValorDolar(val);
                    if (val === 'custom') {
                      field.onChange(undefined);
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
                    <SelectItem value="350">Oficial - $350</SelectItem>
                    <SelectItem value="950">MEP - $950</SelectItem>
                    <SelectItem value="850">Agro - $850</SelectItem>
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

        {/* Potencia Tractor */}
        <FormField
          control={form.control}
          name="potenciaTractor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potencia Tractor</FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduce potencia"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Implemento */}
        <FormField
          control={form.control}
          name="implemento"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Implemento</FormLabel>
              <div className="flex gap-2 ">
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    setImplemento(value);
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="text-xs w-full">
                    <SelectValue placeholder="Selecciona un implemento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arado">Arado</SelectItem>
                    <SelectItem value="rastra">Rastra de disco</SelectItem>
                    <SelectItem value="pulverizadora">Pulverizadora</SelectItem>
                    <SelectItem value="custom">Otro (especificar)</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  disabled={!isCustom}
                  placeholder="Especificar implemento"
                  value={customImplementoValue}
                  onChange={(e) => setCustomImplementoValue(e.target.value)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Valor Implemento */}
        <FormField
          control={form.control}
          name="valorImplemento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor del implemento</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Introduce valor"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Gasto Coeficiente */}
        <FormField
          control={form.control}
          name="gastoCoeficiente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gasto coeficiente</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Introduce coeficiente"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Valor Residual */}
        <FormField
          control={form.control}
          name="valorResidual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor residual</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Introduce valor residual"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Consumo */}
        <FormField
          control={form.control}
          name="consumo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consumo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Introduce litros"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Minutos útiles */}
        <FormField
          control={form.control}
          name="minutosUtiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minutos útiles</FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduce minutos"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Botón */}
        <div className="col-span-full flex flex-col gap-2">
          <Button className="w-full" type="submit" variant={'submit'}>
            Agregar Conjunto
          </Button>
        </div>
      </form>
    </Form>
  );
}
