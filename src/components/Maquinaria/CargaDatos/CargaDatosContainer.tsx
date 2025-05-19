import { useState } from "react";
import CargaDatosIcon from "../../../assets/Icons/Outlined/cargaDatos.png";
import TitleContainer from "@/components/ui/TitleContainer/TitleContainer";
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

export default function CargaDatosContainer() {
  const [implemento, setImplemento] = useState("arado");
  const [valorDolar, setValorDolar] = useState("");
  const [customImplementoValue, setCustomImplementoValue] = useState("");
  const [customDolarValue, setCustomDolarValue] = useState("");
  const isCustom = implemento === "custom";
  const isCustomDolar = valorDolar === "custom";
  return (
    <TitleContainer title="Carga de datos" icon={CargaDatosIcon}>
      <div className="w-full rounded-b-lg p-4 gap-4  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 ">
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

        <div className="flex justify-between gap-4">
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
        </div>
        <div className="flex justify-between gap-4">
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
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="nuevo-conjunto">Nuevo Conjunto</Label>
          <Button className="bg-[#348fe2]">Agregar Conjunto</Button>
        </div>
      </div>
    </TitleContainer>
  );
}
