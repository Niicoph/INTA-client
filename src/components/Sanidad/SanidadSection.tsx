import { useState } from "react";
import CargaDatosIcon from "../../assets/Icons/Outlined/cargaDatos.png";
import GraficoBarrasIcon from "../../assets/Icons/Outlined/graficoBarras.png";

import TitleContainer from "../ui/TitleContainer/TitleContainer";
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
import { Chart } from "../ui/Chart/Chart";

import { DataTable } from "@/components/ui/DataTable/DataTable";
import { columnsSanidad } from "@/components/ui/DataTable/columnsSanidad";

import CotizacionesContainer from "../Cotizaciones/CotizacionesContainer";

/* Valores de testing para DataTable */
const dataSanidad = [
  {
    conjunto: "A",
    ppioActivo: "Aceite de Verano",
    unidad: "Kilos",
    precioDolar: 100,
    dosis: 0.0043,
    volumen: 5,
    tratamientos: 3,
    costohora: 186,
  },
  {
    conjunto: "B",
    ppioActivo: "Abamectina",
    unidad: "Kilos",
    precioDolar: 100,
    dosis: 0.0043,
    volumen: 5,
    tratamientos: 3,
    costohora: 237,
  },
  {
    conjunto: "C",
    ppioActivo: "Carbaryl",
    unidad: "Kilos",
    precioDolar: 100,
    dosis: 0.0043,
    volumen: 5,
    tratamientos: 3,
    costohora: 209,
  },
  {
    conjunto: "D",
    ppioActivo: "Cyanantraniprole",
    unidad: "Kilos",
    precioDolar: 100,
    dosis: 0.0043,
    volumen: 5,
    tratamientos: 3,
    costohora: 37,
  },
];

export default function SanidadSection() {
  const [principioActivo, setPrincipioActivo] = useState("");
  const [unidad, setUnidad] = useState("");
  const [customPrincipioActivo, setCustomPrincipioActivo] = useState("");
  const [customUnidad, setCustomUnidad] = useState("");

  const isCustomPrincipioActivo = principioActivo === "custom";
  const isCustomUnidad = unidad === "custom";

  return (
    <>
      <CotizacionesContainer />
      <TitleContainer title="Carga de datos" icon={CargaDatosIcon}>
        <div className="w-full rounded-b-lg p-4 gap-4  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 ">
          <div className="flex flex-col gap-4">
            <Label htmlFor="ppioActivo">Principio Activo</Label>
            <Select onValueChange={(value) => setPrincipioActivo(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un principio activo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aceiteVerano">Aceite de Verano</SelectItem>
                <SelectItem value="abamectina">Abamectina</SelectItem>
                <SelectItem value="polisufuroCalcio">
                  Polisulfuro calcio
                </SelectItem>
                <SelectItem value="carbaryl">Carbaryl</SelectItem>
                <SelectItem value="cyantraniprole">Cyanantraniprole</SelectItem>
                <SelectItem value="custom">Otro (especificar)</SelectItem>
              </SelectContent>
            </Select>
            {isCustomPrincipioActivo && (
              <Input
                type="string"
                placeholder="Especificar principio activo"
                value={customPrincipioActivo}
                onChange={(e) => setCustomPrincipioActivo(e.target.value)}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="unidad">Unidad</Label>
            <Select onValueChange={(value) => setUnidad(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona la unidad de medida" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="litros">Litros</SelectItem>
                <SelectItem value="kilos">Kilos</SelectItem>
                <SelectItem value="custom">Otro (especificar)</SelectItem>
              </SelectContent>
            </Select>
            {isCustomUnidad && (
              <Input
                type="string"
                placeholder="Especificar unidad"
                value={customUnidad}
                onChange={(e) => setCustomUnidad(e.target.value)}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="precioDolar">Precio en dolares</Label>
            <Input
              type="number"
              id="precioDolares"
              step="0.01"
              placeholder="Introduce el precio en dolares"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="dosis">Dosis hl</Label>
            <Input
              type="number"
              id="dosis"
              step="0.001"
              placeholder="Introduce la dosis en hl"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="volumen">Volumen</Label>
            <Input
              type="number"
              id="volumen"
              placeholder="Introduce el volumen"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="tratamientos">Tratamientos</Label>
            <Input
              type="number"
              id="tratamientos"
              placeholder="Numero de tratamiento"
              className="appearance-none placeholder:text-sm" // aplicar clase segun navegador
            />
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
            <TabsContent
              value="tab1"
              aria-label="GraficoTabla"
              className="flex flex-col gap-4"
            >
              <Chart data={dataSanidad} />
              <DataTable columns={columnsSanidad} data={dataSanidad} />
            </TabsContent>

            <TabsContent
              value="tab2"
              aria-label="Tabla"
              className="flex flex-col gap-4"
            >
              <DataTable columns={columnsSanidad} data={dataSanidad} />
            </TabsContent>

            <TabsContent
              value="tab3"
              aria-label="Grafico"
              className="flex flex-col gap-4"
            >
              <Chart data={dataSanidad} />
            </TabsContent>
          </Tabs>
        </div>
      </TitleContainer>
    </>
  );
}
