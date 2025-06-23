import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CardHomeVerticalProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  color: {
    bg: string,
    text: string,
    border: string,
  };
  path: string;
}

export default function CardHomeVertical({
  src,
  alt,
  title,
  description,
  color,
  path,
}: CardHomeVerticalProps) {
  return (
    <div className="max-w-[200px] min-h-[270px] rounded-xl flex flex-col shadow-card relative bg-white mdd:max-w-[200px] mdd:min-h-[300px] lgg:max-w-[220px] lgg:min-h-[320px] xl:max-w-[250px] xl:min-h-[350px]  ">
      <div
        className={`${color.bg} w-full py-2 rounded-t-xl flex justify-center items-center`}
        
      >
        <div className={`${color.border} rounded-full border-4 bg-white h-25 w-25 flex items-center justify-center overflow-hidden`}>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain p-2"
          />
        </div>
      </div>
      <div className="h-full flex flex-col justify-between py-4 px-6">
        <h2 className={`gilroy-semibold text-2xl ${color.text}`}>
          {title}
        </h2>
        <p className="p-2 gilroy-regular text-xs text-left text-[#8C8C8C]">{description}</p>
        <Link
          to={path}
          className={`${color.bg} gilroy-semibold text-sm text-white px-4 justify-center py-2 rounded-lg mt-2 flex w-full items-center gap-2`}          
        >
          Calculadora <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
