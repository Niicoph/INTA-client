import { type ReactNode } from 'react';

interface TitleContainerProps {
  className?: string;
  children?: ReactNode;
  title: string;
  icon: string;
}

export default function TitleContainer({ title, className, icon, children }: TitleContainerProps) {
  return (
    <div className="w-full border border-border rounded-md  flex flex-col">
      <div
        className={` border-b bg-muted border-border rounded-t-lg flex items-baseline justify-start py-2 px-4 gap-2 inter-regular ${className}`}
      >
        <img src={icon} alt="Icon" className="w-5 h-5 " />
        <h2 className="text-md text-muted-foreground">{title}</h2>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}
