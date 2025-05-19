import { type JSX } from "react";

interface InfoCardProps {
  type: string;
  value: string;
  time: string;
  icon: string | JSX.Element;
  color: string;
}

export default function CotizacionesCard({
  type,
  value,
  time,
  icon,
  color,
}: InfoCardProps) {
  return (
    <div className="w-full flex items-stretch justify-between border-b border-border">
      <div className="flex gap-2 w-full p-4 justify-between items-stretch">
        <div className="w-full">
          <div className="flex gap-2">
            <div
              className="p-3 rounded-md flex justify-center items-center"
              style={{ backgroundColor: `#${color}` }}
            >
              {icon}
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-lg inter-semibold text-muted-foreground">
                {type}
              </span>
              <span className="text-xs inter-regular text-zinc-400">
                {time}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-2/4">
          <span className="text-2xl inter-bold">${value},00</span>
        </div>
      </div>
    </div>
  );
}
