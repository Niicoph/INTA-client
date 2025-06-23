import { type ReactNode } from 'react';

interface CalcLayoutProps {
  ContainerCotizaciones: ReactNode;
  Form: ReactNode;
  Visualizacion: ReactNode;
}

export default function CalcLayout({
  ContainerCotizaciones,
  Form,
  Visualizacion,
}: CalcLayoutProps) {
  return (
    <div className="w-full flex h-full flex-col gap-4 md:max-w-3xl xl:max-w-7xl xl:h-[950px] 2xl:max-w-[1500px]">
      <section className="grid grid-cols-1 gap-4 w-full h-full xl:flex">
        <div className="flex flex-col gap-4 h-full w-full xl:w-1/3 justify-between">
          {ContainerCotizaciones}
          {Form}
        </div>
        <div className="w-full xl:flex xl:flex-row xl:w-2/3">{Visualizacion}</div>
      </section>
    </div>
  );
}
