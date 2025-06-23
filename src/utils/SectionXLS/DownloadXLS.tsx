import exportFertilizanteToXLS from './ExportFertilizanteToXLS';
import exportMaquinariaToXLS from './ExportMaquinariaToXLS';
import exportSanitizanteToXLS from './ExportSanitizanteToXLS';

export default function DownloadXLS(data: any[], module: string) {
  if (module === 'maquinaria') {
    return exportMaquinariaToXLS(data);
  }

  if (module === 'sanitizante') {
    return exportSanitizanteToXLS(data);
  }

  if (module === 'fertilizante') {
    // return console.log(data);
    return exportFertilizanteToXLS(data);
  }
}
