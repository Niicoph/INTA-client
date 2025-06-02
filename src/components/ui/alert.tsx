import { AlertCircle } from 'lucide-react';

interface AlertProps {
  text: string;
  className?: string; // Opcional
}

export default function Alert({ text, className = '' }: AlertProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-64 py-10 border border-dashed rounded-md bg-muted/50 text-muted-foreground h-full gap-2 ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <AlertCircle className="w-6 h-6" />
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}
