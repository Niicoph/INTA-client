import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CardHomeHorizontalProps {
  src: string;
  alt: string;
  color: string;
  title: string;
  description: string;
}

export default function CardHomeHorizontal({
  src,
  alt,
  color,
  title,
  description,
}: CardHomeHorizontalProps) {
  return (
    <div className="w-full h-44 rounded-xl relative flex shadow-card">
      <div
        className="px-4 flex justify-center items-center h-full rounded-l-xl"
        style={{ backgroundColor: color }}
      >
        <div className="rounded-full border-4 bg-white h-20 w-20" style={{ borderColor: color }}>
          <img src={src} alt={alt} className="object-cover" />
        </div>
      </div>
      <div className="w-full flex flex-col justify-between pl-10 py-4 pr-6">
        <h2 className="gilroy-semibold text-2xl" style={{ color: color }}>
          {title}
        </h2>
        <p className="gilroy-regular text-xs text-left text-[#8C8C8C]">{description}</p>
        <Link
          to="/dashboard#maquinaria"
          className="gilroy-semibold text-sm text-white px-4 py-2 rounded-lg mt-2 flex w-fit items-center gap-2"
          style={{ backgroundColor: color }}
        >
          Calculadora <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
