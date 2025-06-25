import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet, Download } from "lucide-react";

export function ExportarPopover({
  downloadPDF,
  downloadXLS,
}: {
  downloadPDF: () => void;
  downloadXLS: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10">
          <Download size={24} strokeWidth={2}/>
          Descargar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-[350px] md:w-fit gap-2 ">
        <Button onClick={downloadPDF} className="h-10  bg-red-600 hover:bg-red-700 text-white">
          <FileText size={24} strokeWidth={2} />
          PDF
        </Button>

        <Button onClick={downloadXLS} className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white">
          <FileSpreadsheet size={24} strokeWidth={2} />
          XMLX
        </Button>
      </PopoverContent>
    </Popover>
  );
}