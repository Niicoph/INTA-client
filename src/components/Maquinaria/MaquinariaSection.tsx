import { useState } from "react";
import CargaDatosIcon from "../../assets/Icons/Outlined/cargaDatos.png";
import GraficoBarrasIcon from "../../assets/Icons/Outlined/graficoBarras.png";

import TitleContainer from "../TitleContainer/TitleContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/ui/columns";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import ExchangeRateCard from "../ExchangeRate/ExchangeRateCard";
import type { Result } from "@/services/fetchBCRAapi";

/* Valores de testing para DataTable */
const tableData = [
  {
    potencia: 60,
    implemento: "Arado",
    valorimplemento: 100,
    coeficiente: 0.0043,
    minutos: 5,
    residuo: 3,
    consumo: 2,
    costohora: 186,
  },
  {
    potencia: 50,
    implemento: "Rastra de disco",
    valorimplemento: 120,
    coeficiente: 0.004,
    minutos: 10,
    residuo: 11,
    consumo: 3.8,
    costohora: 237,
  },
  {
    potencia: 60,
    implemento: "Pulverizadora",
    valorimplemento: 150,
    coeficiente: 0.003,
    minutos: 7,
    residuo: 11,
    consumo: 3.5,
    costohora: 209,
  },
  {
    potencia: 70,
    implemento: "Arado",
    valorimplemento: 100,
    coeficiente: 0.0042,
    minutos: 10,
    residuo: 11,
    consumo: 5,
    costohora: 214,
  },
];

const chartData = [
  { month: "A", desktop: 186 },
  { month: "B", desktop: 580 },
  { month: "C", desktop: 237 },
  { month: "D", desktop: 700 },
  { month: "E", desktop: 209 },
  { month: "F", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface MaquinariaSectionProps {
  data: Result | null;
  loading: boolean;
  error: string | null;
}

export default function MaquinariaSection({
  data,
  loading,
  error,
}: MaquinariaSectionProps) {
  const [implemento, setImplemento] = useState("arado");
  const [valorDolar, setValorDolar] = useState("");
  const [customImplementoValue, setCustomImplementoValue] = useState("");
  const [customDolarValue, setCustomDolarValue] = useState("");

  const isCustom = implemento === "custom";
  const isCustomDolar = valorDolar === "custom";

  return (
    <>
      <ExchangeRateCard data={data} loading={loading} error={error} />
      <TitleContainer title="Carga de datos" icon={CargaDatosIcon}>
        <div className="w-full rounded-b-lg p-4 gap-4  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 ">
          <div className="flex flex-col gap-4">
            <Label htmlFor="cv">Potencia Tractor</Label>
            <Input
              type="number"
              id="cv"
              placeholder="Introduce potencia"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="implemento">Implemento</Label>
            <Select onValueChange={(value) => setImplemento(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un implemento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arado">Arado</SelectItem>
                <SelectItem value="rastra">Rastra de disco</SelectItem>
                <SelectItem value="pulverizadora">Pulverizadora</SelectItem>
                <SelectItem value="custom">Otro (especificar)</SelectItem>
              </SelectContent>
            </Select>

            {isCustom && (
              <Input
                type="text"
                placeholder="Especificar implemento"
                value={customImplementoValue}
                onChange={(e) => setCustomImplementoValue(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="valor-implemento">Valor del implemento</Label>
            <Input
              type="number"
              id="valor-implemento"
              placeholder="Introduce valor"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="coeficiente">Gasto coeficiente</Label>
            <Input
              type="number"
              id="coeficiente"
              placeholder="Introduce gasto"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="minutos-utiles">Minutos útiles</Label>
            <Input
              type="number"
              id="minutos-utiles"
              placeholder="Introduce minutos"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="valor-residual">Valor residual</Label>
            <Input
              type="number"
              id="valor-residual"
              placeholder="Introduce porcentaje"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="consumo-combustible">Consumo litro / hora</Label>
            <Input
              type="number"
              id="consumo-combustible"
              placeholder="Introduce litros"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="valor-dolar">Valor Dolar</Label>
            <Select onValueChange={(value) => setValorDolar(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una cotización" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Oficial">Oficial - $valor</SelectItem>
                <SelectItem value="MEP">MEP - $valor</SelectItem>
                <SelectItem value="Agro">Agro - $valor</SelectItem>
                <SelectItem value="custom">Otro (especificar)</SelectItem>
              </SelectContent>
            </Select>

            {isCustomDolar && (
              <Input
                type="number"
                placeholder="Especificar cotización"
                value={customDolarValue}
                onChange={(e) => setCustomDolarValue(e.target.value)}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="nuevo-conjunto">Nuevo Conjunto</Label>
            <Button className="bg-[#348fe2]">Agregar Conjunto</Button>
          </div>
        </div>
      </TitleContainer>
      <TitleContainer title="Comparaciones" icon={GraficoBarrasIcon}>
        <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col">
          <Tabs
            defaultValue="tab1"
            className="w-full h-full flex flex-col gap-4"
          >
            <TabsList className="rounded-sm w-full h-12 text-lg">
              <TabsTrigger value="tab1" className="rounded-sm">
                Gráfico
              </TabsTrigger>
              <TabsTrigger value="tab2" className="rounded-sm">
                Tabla
              </TabsTrigger>
              <TabsTrigger value="tab3" className="rounded-sm">
                Gráfico y Tabla
              </TabsTrigger>
            </TabsList>

            {/* Comparaciones visuales de conjunto */}

            <TabsContent
              value="tab1"
              aria-label="Gráfico"
              className="flex flex-col gap-4"
            >
              <Label htmlFor="conjunto">
                Conjuntos
                <Label htmlFor="conjunto" className="text-muted-foreground">
                  - Costo/Hora
                </Label>
              </Label>

              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  {/* Grilla */}
                  <CartesianGrid vertical={false} />
                  {/* Ejes (valores) */}
                  {/* Eje Y con formato en $ */}
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) =>
                      `$${value.toLocaleString("es-AR")}`
                    }
                  />

                  {/* Eje X */}
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  {/* tool tip that displays profit value comparision */}
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {/* limit the max width using barSize */}
                  <Bar
                    dataKey="desktop"
                    // fill="var(--color-desktop)"
                    fill={"#348fe2"}
                    radius={4}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </TabsContent>

            <TabsContent
              value="tab2"
              aria-label="Tabla"
              className="flex flex-col gap-4"
            >
              <DataTable columns={columns} data={tableData} />
            </TabsContent>

            {/*TOTALMENTE EXPERIMENTAL, DEBERIA MODULARIZARSE,
            Solo es un copypaste del tab1 y tab2 dentro del tab3*/}
            <TabsContent
              value="tab3"
              aria-label="Gráfico"
              className="flex flex-col gap-4"
            >
              <Label htmlFor="conjunto" className="text-muted-foreground">
                Costo/Hora
              </Label>

              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  {/* Grilla */}
                  <CartesianGrid vertical={false} />
                  {/* Ejes (valores) */}
                  {/* Eje Y con formato en $ */}
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) =>
                      `$${value.toLocaleString("es-AR")}`
                    }
                  />

                  {/* Eje X */}
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  {/* tool tip that displays profit value comparision */}
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {/* limit the max width using barSize */}
                  <Bar
                    dataKey="desktop"
                    // fill="var(--color-desktop)"
                    fill={"#348fe2"}
                    radius={4}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
              <DataTable columns={columns} data={tableData} />
            </TabsContent>
          </Tabs>
        </div>
      </TitleContainer>
    </>
  );
}
