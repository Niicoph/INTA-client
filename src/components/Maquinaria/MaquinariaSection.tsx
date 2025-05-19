import { useState } from "react";
import CargaDatosIcon from "../../assets/Icons/Outlined/cargaDatos.png";
import GraficoBarrasIcon from "../../assets/Icons/Outlined/graficoBarras.png";

import TitleContainer from "../TitleContainer/TitleContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chart } from "../Chart/Chart";

import { DataTable } from "@/components/DataTable/DataTable";
import { columnsMaquinaria } from "@/components/DataTable/columnsMaquinaria";

import ExchangeRateCard from "../ExchangeRate/ExchangeRateCard";

/* Valores de testing para DataTable */
const dataMaquinaria = [
  {
    conjunto: "A",
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
    conjunto: "B",
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
    conjunto: "C",
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
    conjunto: "D",
    potencia: 80,
    implemento: "Rastra de disco",
    valorimplemento: 100,
    coeficiente: 0.0042,
    minutos: 10,
    residuo: 11,
    consumo: 5,
    costohora: 37,
  },
  {
    conjunto: "E",
    potencia: 70,
    implemento: "Pulverizadora",
    valorimplemento: 120,
    coeficiente: 0.006,
    minutos: 10,
    residuo: 16,
    consumo: 5,
    costohora: 214,
  },
  {
    conjunto: "F",
    potencia: 70,
    implemento: "Arado",
    valorimplemento: 230,
    coeficiente: 0.0073,
    minutos: 10,
    residuo: 11,
    consumo: 5,
    costohora: 180,
  },
];

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

          <Tabs defaultValue="tab1" className="w-full h-full flex flex-col gap-4">
            {/* Definición de tabs */}
            <TabsList className="rounded-sm w-full h-12 text-lg">
              <TabsTrigger value="tab1" className="rounded-sm">
                Gráfico y Tabla
              </TabsTrigger>
              <TabsTrigger value="tab2" className="rounded-sm">
                Tabla
              </TabsTrigger>
              <TabsTrigger value="tab3" className="rounded-sm">
                Gráfico
              </TabsTrigger>
            </TabsList>

            {/* Contenido de tabs */}
            <TabsContent value="tab1" aria-label="GraficoTabla" className="flex flex-col gap-4">
              <Chart data = {dataMaquinaria}/>
              <DataTable columns={columnsMaquinaria} data={dataMaquinaria} />
            </TabsContent>

            <TabsContent value="tab2" aria-label="Tabla" className="flex flex-col gap-4" >
              <DataTable columns={columnsMaquinaria} data={dataMaquinaria} />
            </TabsContent>

            <TabsContent value="tab3" aria-label="Grafico" className="flex flex-col gap-4">
              <Chart data = {dataMaquinaria}/>
            </TabsContent>
          </Tabs>
        </div>
      </TitleContainer>
    </>
  );
}
