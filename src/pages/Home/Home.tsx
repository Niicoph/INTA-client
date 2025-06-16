import LogoSipan from '/Sipan.png';
import { Menu } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-[#F3F7FD]">
      <header className="w-full flex items-center justify-between p-4">
        <img src={LogoSipan} alt="Sipan Logo" className="h-8" />
        <Menu className="h-8 w-8 text-[#4A4A4A]" />
      </header>
      <section className="px-4 py-10">
        <h1 className="text-[#4A4A4A] text-3xl text-justify gilroy-extrabold">
          Calculadoras de costos <br />
          <span className="relative inline-block">
            <span className="absolute bottom-0 left-0 w-full h-4 bg-[#7CC8A7] rounded-t-lg z-0"></span>
            <span className="relative text-[#006936] z-10">Agricolas</span>
          </span>
        </h1>
      </section>

      <section className="relative h-[50vh] w-full overflow-hidden sm:h-[70vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]  ">
        <picture>
          <source media="(min-width: 640px)" srcSet="/src/assets/utils/bg-sm.png" />
          <img
            src="/src/assets/utils/bg.png"
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </picture>
        <div className="absolute top-10 right-4 flex flex-col items-center justify-center gap-16 z-10">
          <div>
            <h2 className="gilroy-bold text-lg text-black ">Sostenibilidad</h2>
            <p className="gilroy-regular text-base text-[#4A4A4A]">Generá planes de producción</p>
          </div>
          <div>
            <h2 className="gilroy-bold text-lg text-black">Análisis</h2>
            <p className="gilroy-regular text-base text-[#4A4A4A]">Generá planes de producción</p>
          </div>
          <div>
            <h2 className="gilroy-bold text-lg text-black">Precisión</h2>
            <p className="gilroy-regular text-base text-[#4A4A4A]">Generá planes de producción</p>
          </div>
        </div>
      </section>

      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
          <path
            d="M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z"
            fill="#3F4953"
          ></path>
        </svg>
      </div>
    </main>
  );
}
