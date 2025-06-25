import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CardHomeHorizontalProps {
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

export default function CardHomeHorizontal({
  src,
  alt,
  color,
  title,
  description,
  path,
}: CardHomeHorizontalProps) {
  return (
    <div className="w-full h-fit rounded-xl relative flex shadow-card">
      <div
        className={`${color.bg} px-4 flex justify-center items-center h-full rounded-l-xl`}
      >
        <div className={`${color.border} rounded-full border-4 bg-white h-25 w-25 flex items-center justify-center overflow-hidden`}>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain p-2"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-between pl-10 py-4 pr-6">
        <h2 className={`${color.text} gilroy-semibold text-2xl`}>
          {title}
        </h2>
        <p className="gilroy-regular text-xs text-left text-[#8C8C8C]">{description}</p>
        <Link
          to={path}
          className={`${color.bg} gilroy-semibold text-sm text-white px-4 py-2 rounded-lg mt-2 flex w-fit items-center gap-2`}
        >
          Calculadora <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
