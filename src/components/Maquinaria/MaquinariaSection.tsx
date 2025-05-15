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

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import ExchangeRateCard from "../ExchangeRate/ExchangeRateCard";

const chartData = [
  { month: "A", desktop: 186 },
  { month: "B", desktop: 305 },
  { month: "C", desktop: 237 },
  { month: "D", desktop: 73 },
  { month: "E", desktop: 209 },
  { month: "F", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function MaquinariaSection() {
  const [implemento, setImplemento] = useState("arado");
  const [valorDolar, setValorDolar] = useState("");
  const [customImplementoValue, setCustomImplementoValue] = useState("");
  const [customDolarValue, setCustomDolarValue] = useState("");

  const isCustom = implemento === "custom";
  const isCustomDolar = valorDolar === "custom";

  return (
    <>
    <ExchangeRateCard />
      <TitleContainer title="Carga de datos" icon={CargaDatosIcon}>
        <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col">
          <Label htmlFor="cv">Potencia Tractor</Label>
          <Input
            type="number"
            id="cv"
            placeholder="Introduce potencia"
            className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
          />
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
          <Label htmlFor="valor-implemento">Valor del implemento</Label>
          <Input
            type="number"
            id="valor-implemento"
            placeholder="Introduce valor"
            className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
          />
          <Label htmlFor="coeficiente">Gasto coeficiente</Label>
          <Input
            type="number"
            id="coeficiente"
            placeholder="Introduce gasto"
            className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
          />
          <Label htmlFor="minutos-utiles">Minutos útiles</Label>
          <Input
            type="number"
            id="minutos-utiles"
            placeholder="Introduce minutos"
            className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
          />
          <Label htmlFor="valor-residual">Valor residual</Label>
          <Input
            type="number"
            id="valor-residual"
            placeholder="Introduce porcentaje"
            className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
          />
          <Label htmlFor="consumo-combustible">Consumo litro / hora</Label>
          <Input
            type="number"
            id="consumo-combustible"
            placeholder="Introduce litros"
            className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
          />
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

          <Button className="bg-[#2563EB]">Agregar Conjunto</Button>
        </div>
      </TitleContainer>
      <TitleContainer title="Grafica comparativa" icon={GraficoBarrasIcon}>
        <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col">
          <Label htmlFor="conjunto">Lista de conjuntos</Label>
          <Label htmlFor="conjunto" className="text-muted-foreground">
            Costo/hora
          </Label>

          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              {/* Grilla */}
              <CartesianGrid vertical={false} />
              {/* Ejes (valores) */}
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
                fill="var(--color-desktop)"
                radius={4}
                barSize={40}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </TitleContainer>
    </>
  );
}
