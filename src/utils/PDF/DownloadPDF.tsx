import ExportMaquinariaToPDF from './ExportMaquinariaToPDF';
import ExportSanitizanteToPDF from './ExportSanitizanteToPDF';
import ExportFertilizanteToPDF from './ExportFertilizanteToPDF';

// exportar a pdf
export default function DownloadPDF(data: any[], chart: SVGSVGElement, module: string) {
  if (module === 'maquinaria') {
    return ExportMaquinariaToPDF(data, chart);
  }

  if (module === 'sanitizante') {
    return ExportSanitizanteToPDF(data, chart);
  }

  if (module === 'fertilizante') {
    return ExportFertilizanteToPDF(data, chart);
  }
}
