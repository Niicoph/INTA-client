import { useState } from "react";
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

export default function FormFertilizacion() {
  const [principioActivo, setPrincipioActivo] = useState("");
  const [unidad, setUnidad] = useState("");
  const [customPrincipioActivo, setCustomPrincipioActivo] = useState("");
  const [customUnidad, setCustomUnidad] = useState("");
  const isCustomPrincipioActivo = principioActivo === "custom";
  const isCustomUnidad = unidad === "custom";
  return (
    <div className="w-full rounded-b-lg p-4 gap-4  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 ">
      <div className="flex flex-col gap-4">
        <Label htmlFor="ppioActivo">Principio Activo</Label>
        <Select onValueChange={(value) => setPrincipioActivo(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un principio activo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sulfonitrato">Sulfonitrato</SelectItem>
            <SelectItem value="triple-15">Triple 15</SelectItem>
            <SelectItem value="nitratoCalcio">Nitrato calcio</SelectItem>
            <SelectItem value="basfFoliar">Basf foliar</SelectItem>
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
        <Label htmlFor="dosis">Dosis ha</Label>
        <Input
          type="number"
          id="dosis"
          step="0.01"
          placeholder="Introduce la dosis en hl"
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
  );
}
