import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CardHomeVerticalProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  color: string;
}

export default function CardHomeVertical({
  src,
  alt,
  title,
  description,
  color,
}: CardHomeVerticalProps) {
  return (
    <div className="w-[170px] h-[270px] rounded-xl flex flex-col shadow-card relative bg-white mdd:w-[200px] mdd:h-[300px] lgg:w-[220px] lgg:h-[320px] xl:w-[250px] xl:h-[350px]  ">
      <div
        className="w-full py-2 rounded-t-xl flex justify-center items-center"
        style={{ backgroundColor: color }}
      >
        <div className="rounded-full border-4 bg-white h-20 w-20" style={{ borderColor: color }}>
          <img src={src} alt={alt} className="object-cover" />
        </div>
      </div>
      <div className="h-full flex flex-col justify-between py-4 px-6">
        <h2 className="gilroy-semibold text-2xl" style={{ color }}>
          {title}
        </h2>
        <p className="gilroy-regular text-xs text-left text-[#8C8C8C]">{description}</p>
        <Link
          to="/dashboard#maquinaria"
          className="gilroy-semibold text-sm text-white px-4 justify-center py-2 rounded-lg mt-2 flex w-full items-center gap-2"
          style={{ backgroundColor: color }}
        >
          Calculadora <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
