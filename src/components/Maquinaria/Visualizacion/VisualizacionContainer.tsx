import GraficoBarrasIcon from "../../../assets/Icons/Outlined/graficoBarras.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chart } from "@/components/ui/Chart/Chart";
import { DataTable } from "@/components/ui/DataTable/DataTable";
import { columnsMaquinaria } from "@/components/ui/DataTable/columnsMaquinaria";
import TitleContainer from "@/components/ui/TitleContainer/TitleContainer";

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

export default function VisualizacionContainer() {
  return (
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
          <TabsContent
            value="tab1"
            aria-label="GraficoTabla"
            className="flex flex-col gap-4"
          >
            <Chart data={dataMaquinaria} />
            <DataTable columns={columnsMaquinaria} data={dataMaquinaria} />
          </TabsContent>

          <TabsContent
            value="tab2"
            aria-label="Tabla"
            className="flex flex-col gap-4"
          >
            <DataTable columns={columnsMaquinaria} data={dataMaquinaria} />
          </TabsContent>

          <TabsContent
            value="tab3"
            aria-label="Grafico"
            className="flex flex-col gap-4"
          >
            <Chart data={dataMaquinaria} />
          </TabsContent>
        </Tabs>
      </div>
    </TitleContainer>
  );
}
