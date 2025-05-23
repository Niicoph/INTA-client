import { Chart } from '@/components/ui/Chart/Chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/DataTable/DataTable';
import { columnsMaquinaria } from '@/components/ui/DataTable/columnsMaquinaria';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useContext } from 'react';
import { MaquinariaContext } from '@/context/MaquinariaContext';

export default function ChartMaquinaria() {
  const maquinariaContext = useContext(MaquinariaContext);

  if (!maquinariaContext) {
    return null;
  }

  const { data } = maquinariaContext;

  /**
   * Calcula el costo economico total de la maquinaria
   * @param data - Datos de la maquinaria
   * @returns [] : costoEconomicoTotalObj : {costoEconomicoTotal: number}
   */
  const costosEconomicos = data.map((conjunto, index) => {
    // COSTO ECONOMICO IMPLEMENTO
    const valorResidual = (conjunto.valor_residual_pct_i * conjunto.precio_usd_i) / 100;
    const amortizacion =
      ((conjunto.precio_usd_i - valorResidual) / conjunto.horas_utiles_i) * conjunto.cotizacion_usd;
    const costoCombustible =
      conjunto.potencia_CV * conjunto.consumo_litros_hora_CV * conjunto.cotizacion_usd;
    const costoMantenimiento =
      conjunto.coef_gastos_conservacion_i * conjunto.precio_usd_i * conjunto.cotizacion_usd;
    const costoEconomico = amortizacion + costoCombustible + costoMantenimiento;
    // COSTO ECONOMICO TRACTOR
    const valorResidualTractor = (conjunto.valor_residual_pct_t * conjunto.precio_usd_t) / 100;
    const amortizacionTractor =
      ((conjunto.precio_usd_t - valorResidualTractor) / conjunto.horas_utiles_t) *
      conjunto.cotizacion_usd;
    const costoMantenimientoTractor =
      conjunto.coef_gastos_conservacion_t * conjunto.precio_usd_t * conjunto.cotizacion_usd;
    const costoEconomicoTractor = amortizacionTractor + costoMantenimientoTractor;
    // COSTO ECONOMICO TOTAL
    const costoEconomicoTotalObj = {
      total: costoEconomico + costoEconomicoTractor,
      conjunto: `${index + 1}`,
    };
    return costoEconomicoTotalObj;
  });

  return (
    <div className="w-full rounded-b-lg p-4 gap-4 flex flex-col">
      <Tabs defaultValue="tab1" className="w-full h-full flex flex-col relative">
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
        <TabsContent value="tab1" aria-label="GraficoTabla" className="flex flex-col gap-4 ">
          <Chart costosEconomicos={costosEconomicos} />
          {/* <DataTable columns={columnsMaquinaria} data={dataMaquinaria} /> */}
        </TabsContent>

        <TabsContent value="tab2" aria-label="Tabla" className="flex flex-col gap-4">
          {/* <DataTable columns={columnsMaquinaria} data={dataMaquinaria} /> */}
        </TabsContent>

        <TabsContent value="tab3" aria-label="Grafico" className="flex flex-col gap-4">
          <Chart costosEconomicos={costosEconomicos} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
