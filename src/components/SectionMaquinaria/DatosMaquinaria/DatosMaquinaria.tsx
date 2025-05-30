import VisualizacionesIcon from '../../../assets/Icons/Outlined/graficoBarras.png';
import { Chart } from '@/components/ui/Chart/Chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/DataTable/DataTable';
import { columnsMaquinaria } from '@/components/ui/DataTable/columnsMaquinaria';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useContext, useRef } from 'react';
import { MaquinariaContext } from '@/context/MaquinariaContext';
import { calcularCostoTotalMaquinaria } from '@/utils/costoTotalMaquinaria';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs;

import type { CostoEconomico } from '@/types/maquinaria';
import { mejorarImagenPDF } from '@/utils/mejorarImagenPDF';

export default function ChartMaquinaria() {
  const maquinariaContext = useContext(MaquinariaContext);
  const captureRef = useRef<HTMLDivElement>(null); // useRef para capturar el div del gráfico y la tabla

  if (!maquinariaContext) {
    return null;
  }

  const { data } = maquinariaContext;
  const costosEconomicos: CostoEconomico[] = calcularCostoTotalMaquinaria(data);

  // exportar a pdf
  const exportToPDF = async () => {
    if (!captureRef.current) {
      console.error('Elemento no encontrado para capturar');
      return;
    }

    console.log('Botón PDF clickeado');

    try {
      const dataUrl = await mejorarImagenPDF(captureRef.current);

      const tableBody = [
        ['Conjunto', 'Costo total por hora ($)'],
        ...costosEconomicos.map((item) => [
          item.id_conjunto,
          item.costo_total_hora.toLocaleString('es-AR', { minimumFractionDigits: 2 }),
        ]),
      ];

      const docDefinition: any = {
        content: [
          { text: 'Reporte de Maquinaria', style: 'header' },
          { image: dataUrl, width: 500 },
          { text: 'Tabla de Costos', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto'],
              body: tableBody,
            },
            layout: 'lightHorizontalLines',
          },
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
        },
      };

      pdfMake.createPdf(docDefinition).download('maquinaria.pdf');
    } catch (error) {
      console.error('Error al generar la imagen o el PDF:', error);
    }
  };

  return (
    <div className="rounded-md flex flex-col border border-border overflow-hidden">
      <TitleContainer icon={VisualizacionesIcon} title="Visualización Gráfica" />
      <div className="w-full h-full rounded-b-lg p-4 gap-4 flex flex-col overflow-hidden">
        <Tabs defaultValue="tab1" className="w-full flex flex-col flex-1 min-h-0 justify-between">
          <div className="w-full flex flex-col gap-4 md:flex-row">
            <TabsList className="rounded-sm h-10 text-lg w-full md:w-fit">
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
            <Button
              variant="outline"
              className="ml-auto h-10 w-full md:w-fit"
              onClick={exportToPDF}
            >
              PDF
              <Download size={24} strokeWidth={2} />
            </Button>
          </div>
          <TabsContent
            value="tab1"
            aria-label="GraficoTabla"
            className="w-full min-w-0 grid grid-rows-2 gap-4 overflow-hidden h-[31rem]"
          >
            <div ref={captureRef} className=" overflow-x-auto">
              <Chart costosEconomicos={costosEconomicos} />
            </div>
            <div className=" overflow-x-auto">
              <DataTable columns={columnsMaquinaria} data={costosEconomicos} />
            </div>
          </TabsContent>

          <TabsContent
            value="tab2"
            aria-label="Tabla"
            className="flex flex-col gap-4  overflow-y-auto h-[31rem]"
          >
            <div className="overflow-x-auto h-full">
              <DataTable columns={columnsMaquinaria} data={costosEconomicos} />
            </div>
          </TabsContent>

          <TabsContent
            value="tab3"
            aria-label="Grafico"
            className="flex flex-col gap-4  overflow-y-auto h-[31rem]"
          >
            <Chart costosEconomicos={costosEconomicos} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
