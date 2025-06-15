interface LegendProps {
  text: string;
}

export default function Legend({ text }: LegendProps) {
  return (
    <div className="w-full flex items-center">
      <div className="h-3 w-3 bg-blue-500" />
      <span className="ml-2 text-xs text-gray-700">{text}</span>
    </div>
  );
}
