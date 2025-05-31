import { type JSX } from 'react';

interface InfoCardProps {
  name: string;
  value: number;
  time: string;
  date: string;
  icon: string | JSX.Element;
  color?: string;
}

export default function CotizacionesCard({ name, value, time, icon, date, color }: InfoCardProps) {
  return (
    <div className="w-full flex items-stretch justify-between border-b border-border md:border-r">
      <div className="flex w-full p-4 justify-between items-stretch">
        <div className="w-full ">
          <div className="flex gap-2">
            <div
              className="p-3 rounded-md flex justify-center items-center"
              style={{ backgroundColor: `#${color}` }}
            >
              {icon}
            </div>
            <div className="w-full flex flex-col justify-between">
              <span className="text-md inter-semibold text-foreground truncate inline-block max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[250px]">
                {name}
              </span>
              <span className="text-xs inter-regular text-zinc-400 truncate inline-block max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[250px]">
                {date}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-30 items-end">
          <span className="text-xl inter-bold text-foreground">${value}</span>
          <span className="text-xs inter-regular text-zinc-400">{time}</span>
        </div>
      </div>
    </div>
  );
}
