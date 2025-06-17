interface LegendProps {
  text: string;
}

export default function Legend({ text }: LegendProps) {
  return (
    <div className="w-full flex gap-2 items-center ">
      <div className="h-3 w-3 bg-blue-500 flex-shrink-0" />
      <span className="text-xs text-gray-700">{text}</span>
    </div>
  );
}
