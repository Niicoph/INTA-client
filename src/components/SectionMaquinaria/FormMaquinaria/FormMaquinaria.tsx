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

export default function FormMaquinaria() {
  const [implemento, setImplemento] = useState("arado");
  const [valorDolar, setValorDolar] = useState("");
  const [customImplementoValue, setCustomImplementoValue] = useState("");
  const [customDolarValue, setCustomDolarValue] = useState("");
  const isCustom = implemento === "custom";
  const isCustomDolar = valorDolar === "custom";
  return (
    <div className="w-full rounded-b-lg p-4 grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
      {/* Valor Dólar */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="valor-dolar">Valor Dólar</Label>
        <Select onValueChange={(value) => setValorDolar(value)}>
          <SelectTrigger className="w-full text-xs ">
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

      {/* Potencia Tractor */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="cv">Potencia Tractor</Label>
        <Input
          type="number"
          id="cv"
          placeholder="Introduce potencia"
          className="appearance-none placeholder:text-xs"
        />
      </div>

      {/* Implemento */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="implemento">Implemento</Label>
        <Select onValueChange={(value) => setImplemento(value)}>
          <SelectTrigger className="w-full text-xs ">
            <SelectValue
              placeholder="Selecciona un implemento"
              className="placeholder:text-xs"
            />
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
            className="appearance-none placeholder:text-xs"
            value={customImplementoValue}
            onChange={(e) => setCustomImplementoValue(e.target.value)}
          />
        )}
      </div>

      {/* Valor implemento */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="valor-implemento">Valor del implemento</Label>
        <Input
          type="number"
          id="valor-implemento"
          placeholder="Introduce valor"
          className="appearance-none placeholder:text-xs"
        />
      </div>

      {/* Gasto coeficiente */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="coeficiente">Gasto coeficiente</Label>
        <Input
          type="number"
          id="coeficiente"
          placeholder="Introduce gasto"
          className="appearance-none placeholder:text-xs"
        />
      </div>
      {/* Valor residual */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="valor-residual">Valor residual</Label>
        <Input
          type="number"
          id="valor-residual"
          placeholder="Introduce porcentaje"
          className="appearance-none placeholder:text-xs"
        />
      </div>

      <div className="flex flex-row gap-2">
        {/* Consumo de combustible */}
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="consumo-combustible">Consumo</Label>
          <Input
            type="number"
            id="consumo-combustible"
            placeholder="Introduce lts"
            className="appearance-none placeholder:text-xs"
          />
        </div>
        {/* Minutos útiles */}
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="minutos-utiles">Minutos útiles</Label>
          <Input
            type="number"
            id="minutos-utiles"
            placeholder="Introduce min"
            className="appearance-none placeholder:text-xs"
          />
        </div>
      </div>
      {/* Botón */}
      <div className="flex flex-col gap-2 ">
        <Label htmlFor="nuevo-conjunto">Nuevo Conjunto</Label>
        <Button className="w-full" variant={"submit"}>
          Agregar Conjunto
        </Button>
      </div>
    </div>
  );
}
