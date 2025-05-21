import { Chart } from "@/components/ui/Chart/Chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/DataTable/DataTable";
import { columnsSanidad } from "@/components/ui/DataTable/columnsSanidad";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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

export default function ChartSanidad() {
  return (
    <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col">
      <Tabs
        defaultValue="tab1"
        className="w-full h-full flex flex-col relative"
      >
        <div className=" w-full flex flex-col gap-2  pt-[3px] md:flex-row">
          {/* Definición de tabs */}
          <TabsList className="rounded-sm  h-10 text-lg w-full md:w-fit">
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

          {/* Botón de descarga */}
          <Button variant="outline" className="ml-auto h-10 w-full md:w-fit">
            Descargar
            <Download size={24} strokeWidth={2} />
          </Button>
        </div>
        {/* Contenido de tabs */}
        <TabsContent
          value="tab1"
          aria-label="GraficoTabla"
          className="flex flex-col gap-4 "
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
  );
}
