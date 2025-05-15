import UsdIcon from "../../assets/Icons/Filled/usd.png";

interface InfoCardProps {
  type: string;
  value: string;
}

export default function InfoCard({ type, value }: InfoCardProps) {
  return (
    <div className="border border-border w-full rounded-sm  flex items-center justify-between">
      <div className="flex gap-2 w-full p-2 border-r border-border">
        <img src={UsdIcon} alt="dolar-usd" className="w-6 h-6" />
        <span className="text-md font-semibold">Dolar {type}</span>
      </div>
      <span className="text-md font-semibold w-2/4 px-4">${value}</span>
    </div>
  );
}
