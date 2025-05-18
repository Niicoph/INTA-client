import UsdIcon from "../../assets/Icons/Filled/usd.png";
import GasoilIcon from "../../assets/Icons/Filled/diesel.png";

interface InfoCardProps {
  type: string;
  value: string;
  time: string;
}

export default function InfoCard({ type, value, time }: InfoCardProps) {
  let currencyIcon = UsdIcon;
  if (type === "Oficial") { 
    type = "Dolar Oficial";
    currencyIcon = UsdIcon;    
  } else if (type === "Diesel NEUQUEN") {
    type = "Gasoil en Neuquén";
    currencyIcon = GasoilIcon;
  } else if ( type === "Diesel RIO NEGRO") { 
    type =  "Gasoil en Río Negro";
    currencyIcon = GasoilIcon;
  }
  
  return (
    <div className="border border-border w-full rounded-sm  flex items-center justify-between">
      <div className="flex justify-between gap-2 w-full p-2 border-r border-border">
        <img src={currencyIcon} alt="dolar-usd" className="w-6 h-6" />
        <div className="w-full">
          <span className="text-md font-semibold">{type}</span>
        </div>
        <span className="w-full text-md text-muted-foreground text-end">
          {time}
        </span>
      </div>
      <span className="text-md  font-semibold w-2/4 px-4">${value}</span>
    </div>
  );
}
