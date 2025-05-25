import { Chart } from '@/components/ui/Chart/Chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/ui/DataTable/DataTable';
import { columnsMaquinaria } from '@/components/ui/DataTable/columnsMaquinaria';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useContext, useRef } from 'react';
import { MaquinariaContext } from '@/context/MaquinariaContext';
import { calcularCostoTotalMaquinaria } from '@/utils/costoTotalMaquinaria';

import domtoimage from 'dom-to-image-more';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.vfs;
//pdfMake.vfs = pdfFonts.pdfMake.vfs; error en pdfMake

import type { CostoEconomico } from '@/types/maquinaria';

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
      const dataUrl = await domtoimage.toPng(captureRef.current, {
        quality: 1,
        style: {
          // Opcional: fuerza un fondo blanco para evitar temas oscuros
          backgroundColor: '#ffffff',
        },
        filter: (el:any) => {
          if (!(el instanceof Element)) return false; // ignoramos nodos que no son elementos

          const style = window.getComputedStyle(el);
          return (
            style.color.includes('oklab') ||
            style.backgroundColor.includes('oklab') ||
            style.color.includes('oklch') ||
            style.backgroundColor.includes('oklch')
          );
        },
      });

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
          { image: dataUrl, width: 500, height: 500},
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
          <Button variant="outline" className="ml-auto h-10 w-full md:w-fit" onClick={exportToPDF}>
            PDF
            <Download size={24} strokeWidth={2} />
          </Button>
        </div>
        {/* Contenido de tabs */}
        <TabsContent
          value="tab1"
          aria-label="GraficoTabla"
          className="flex flex-col gap-4 max-w-[642px]"
        >
          <div ref={captureRef}>
            <Chart costosEconomicos={costosEconomicos} />
            </div>
            <DataTable columns={columnsMaquinaria} data={costosEconomicos} />
          
        </TabsContent>

        <TabsContent value="tab2" aria-label="Tabla" className="flex flex-col gap-4">
          <DataTable columns={columnsMaquinaria} data={costosEconomicos} />
        </TabsContent>

        <TabsContent value="tab3" aria-label="Grafico" className="flex flex-col gap-4">
          <Chart costosEconomicos={costosEconomicos} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
