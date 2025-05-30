interface TitleContainerProps {
  title: string;
  icon: string;
  className?: string;
}

export default function TitleContainer({ title, icon, className }: TitleContainerProps) {
  return (
    <div
      className={`border-b bg-muted border-border rounded-t-lg flex items-baseline justify-start py-2 px-4 gap-2 inter-regular ${className}`}
    >
      <img src={icon} alt="Icon" className="w-5 h-5" />
      <h2 className="text-md text-muted-foreground">{title}</h2>
    </div>
  );
}
