import LogoSipan from '/Sipan.png';
import { Menu } from 'lucide-react';

import CardHomeHorizontal from '@/components/Cards/CardHomeHorizontal';
import CardHomeVertical from '@/components/Cards/CardHomeVertical';
const cards = [
  {
    src: 'src/assets/utils/Maquinaria.png',
    alt: 'Maquinaria Icon',
    color: '#F18813',
    title: 'Maquinaria',
    description: 'Este módulo estima',
    path: '/maquinaria',
  },
  {
    src: 'src/assets/utils/Sanidad.png',
    alt: 'Sanidad Icon',
    color: '#28A635',
    title: 'Sanidad',
    description: 'Este módulo calcula',
    path: '/sanitizacion',
  },
  {
    src: 'src/assets/utils/Fertilizacion.png',
    alt: 'Fertilización Icon',
    color: '#2D64A2',
    title: 'Fertilización',
    description: 'Este módulo estima',
    path: '/fertilizacion',
  },
];

export default function Home() {
  return (
    <div className="flex justify-center bg-[#F3F7FD]">
      <main className="flex flex-col justify-between min-h-screen bg-[#F3F7FD] w-full xxl:max-w-4/6">
        <header className="w-full flex items-center justify-center p-4">
          <div className="lg:w-5/6 2xl:w-4/6 w-full flex items-center justify-between">
            <img src={LogoSipan} alt="Sipan Logo" className="h-8" />
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#home" className="gilroy-semibold text-[#4A4A4A]">
                Home
              </a>
              <a href="#aboutus" className="gilroy-semibold text-[#4A4A4A]">
                Quienes Somos
              </a>
              <a href="#modulo" className="gilroy-semibold text-[#4A4A4A]">
                Modulos
              </a>
              <a href="#unidades" className="gilroy-semibold text-[#4A4A4A]">
                Unidades
              </a>
            </nav>
            <Menu className="h-8 w-8 text-[#4A4A4A] lg:hidden" />
          </div>
        </header>
        <section className="flex flex-1 flex-col md:flex-0">
          <div className="px-4 py-10 smm:hidden">
            <h1 className="text-[#4A4A4A] text-3xl text-justify gilroy-extrabold">
              Calculadoras de costos <br className="smm:hidden" />
              <span className="relative inline-block">
                <span className="absolute bottom-0 left-0 w-full h-4 bg-[#7CC8A7] rounded-t-lg z-0"></span>
                <span className="relative text-[#006936] z-10">Agricolas</span>
              </span>
            </h1>
          </div>
          <div className="w-full relative">
            <div className="h-[340px] w-full max-w-sm smm:h-[400px] md:h-[500px] 2xl:h-[600px] xl:max-w-3xl">
              <picture>
                <source media="(min-width: 1536px)" srcSet="/src/assets/utils/bg-2xl2.png" />
                <source media="(min-width: 1024px)" srcSet="/src/assets/utils/bg-xl.png" />
                <source media="(min-width: 640px)" srcSet="/src/assets/utils/bg-md.png" />
                <img
                  src="/src/assets/utils/bg.png"
                  alt="Hero background"
                  className="absolute h-full object-cover z-0"
                />
              </picture>
              <div className="absolute right-0 flex flex-col items-center justify-between  h-full z-10 pr-4 py-6 smm:hidden">
                <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-4 text-[#4A4A4A]">
                  <h2 className="gilroy-bold text-lg sm:text-xl">Sostenibilidad</h2>
                  <p className="gilroy-regular text-xs sm:text-sm">Generá planes de producción</p>
                </div>

                <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-4 text-[#4A4A4A]">
                  <h2 className="gilroy-bold text-lg">Análisis</h2>
                  <p className="gilroy-regular text-xs sm:text-sm">Generá planes de producción</p>
                </div>
                <div className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-4 text-[#4A4A4A]">
                  <h2 className="gilroy-bold text-lg ">Precisión</h2>
                  <p className="gilroy-regular text-xs sm:text-sm">Generá planes de producción</p>
                </div>
              </div>
              <div className="absolute right-0  gap-4 h-full z-10 pr-4 hidden smm:flex justify-center lg:w-full">
                <div className="lg:w-5/6 2xl:w-4/6 smm:flex justify-end gap-4">
                  <div className="flex flex-col justify-center gap-4">
                    <div className="h-10 border-b-2 border-[#4A4A4A]  w-fit">
                      <h1 className="text-[#4A4A4A] text-2xl md:text-3xl lg:text-4xl flex gap-2  text-justify gilroy-extrabold">
                        Calculadoras de costos
                        <span className="relative text-[#006936] z-10">Agricolas</span>
                      </h1>
                    </div>
                    <div className="flex gap-4">
                      {cards.map((card, index) => (
                        <CardHomeVertical
                          key={index}
                          src={card.src}
                          alt={card.alt}
                          color={card.color}
                          title={card.title}
                          description={card.description}
                          path={card.path}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-10 smm:h-14 lg:h-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1000 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <g fill="#006936">
                <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
                <path
                  d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z"
                  opacity=".5"
                ></path>
                <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
                <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
              </g>
            </svg>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center gap-10 px-4 py-10 smm:hidden">
          {cards.map((card, index) => (
            <CardHomeHorizontal
              key={index}
              src={card.src}
              alt={card.alt}
              color={card.color}
              title={card.title}
              description={card.description}
              path={card.path}
            />
          ))}
        </section>
        <section className="hidden smm:flex justify-center items-center gap-6 p-4">
          <div className="w-full grid grid-cols-2 lg:w-5/6 2xl:grid-cols-4 2xl:w-4/6 gap-10">
            <div>
              <h2 className="gilroy-bold text-black text-2xl">Maquinaria</h2>
              <p className="gilroy-regular text-[#4A4A4A] text-base">
                Estimá y compará los costos operativos de distintos equipos según las labores del
                campo. Obtené una visión clara del impacto económico de tus decisiones.
              </p>
            </div>
            <div>
              <h2 className="gilroy-bold text-black text-2xl">Fertilización</h2>
              <p className="gilroy-regular text-[#4A4A4A] text-base">
                Calculá el gasto total de fertilizantes por hectárea y compará distintas estrategias
                nutricionales para maximizar la eficiencia técnica y económica del plan.
              </p>
            </div>
            <div>
              <h2 className="gilroy-bold text-black text-2xl">Fitosanitarios</h2>
              <p className="gilroy-regular text-[#4A4A4A] text-base">
                Evaluá planes de control fitosanitario, analizá costos por producto y estrategia, y
                optimizá tus decisiones en función del rendimiento y el presupuesto.
              </p>
            </div>
            <div>
              <h2 className="gilroy-bold text-black text-2xl">Sostenibilidad</h2>
              <p className="gilroy-regular text-[#4A4A4A] text-base">
                Planificá tu producción con un enfoque sostenible. Medí el uso de recursos y promové
                prácticas responsables sin descuidar la rentabilidad.
              </p>
            </div>
          </div>
        </section>
        <footer className="w-full flex items-center justify-center p-4 border-t border-border">
          <p className="gilroy-regular text-sm text-[#4A4A4A] ">
            © 2025 Sipan. Todos los derechos reservados.
          </p>
        </footer>
      </main>
    </div>
  );
}
