import CardHomeHorizontal from '@/components/Cards/CardHomeHorizontal';
import CardHomeVertical from '@/components/Cards/CardHomeVertical';
const cards = [
  {
    src: 'src/assets/utils/Maquinaria.png',
    alt: 'Maquinaria Icon',
    color: {
      bg: 'bg-orange-400',
      text: 'text-orange-400',
      border: 'border-orange-400',
    },
    title: 'Calculadora de Costos de Maquinaria',
    description: 'Estime y compare los costos operativos de distintos conjuntos de maquinaria según las labores de campo.',
    path: '/maquinaria',
  },
  {
    src: 'src/assets/utils/Sanidad.png',
    alt: 'Sanidad Icon',
    color: {
      bg: 'bg-green-400',
      text: 'text-green-400',
      border: 'border-green-400',
    },
    title: 'Calculadora de Costos de Planes Sanitarios',
    description: 'Evalúe planes de control fitosanitario, analice costos por producto y estrategia, y optimice sus decisiones en función del rendimiento y del presupuesto.',
    path: '/sanitizacion',
  },
  {
    src: 'src/assets/utils/Fertilizacion.png',
    alt: 'Fertilización Icon',
    color: {
      bg: 'bg-blue-400',
      text: 'text-blue-400',
      border: 'border-blue-400',
    },
    title: 'Calculadora de Costos de Planes de Fertilización',
    description: 'Calcule el gasto total de fertilizantes por hectárea y compare estrategias para optimizar la eficiencia técnica y económica.',
    path: '/fertilizacion',
  },
];

const features = [
  {
    title: 'Precisión Científica',
    description: 'Cálculos exactos basados en metodologías validadas por INTA.'
  },
  {
    title: 'Análisis Inteligente',
    description: 'Reportes detallados con visualizaciones avanzadas para la toma de decisiones estratégicas.'
  },
  {
    title: 'Soporte Económico para la Gestión',
    description: 'Información económica clave para mejorar la planificación y gestión estratégica del negocio agropecuario.'
  },
];

export default function Home() {
  return (
    <div className="flex justify-center bg-[#F3F7FD]">
      <div className="flex flex-col justify-between min-h-screen bg-[#F3F7FD] w-full xxl:max-w-4/6">        
        <section className="flex flex-1 flex-col md:flex-0">
          <div className="px-4 py-10 md:hidden">
            <h1 className="text-[#4A4A4A] text-3xl text-justify gilroy-extrabold">
              Calculadoras de costos <br className="smm:hidden" />
              <span className="relative inline-block">
                <span className="absolute bottom-0 left-0 w-full h-4 bg-[#7CC8A7] rounded-t-lg z-0"></span>
                <span className="relative text-[#006936] z-10">Agrícolas</span>
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
                  alt="Fondo home"
                  className="absolute h-full object-cover z-0"
                />
              </picture>

              <div className="absolute flex flex-col items-end mr-3 gap-4 h-full md:hidden">
                 {features.map((feat, index) => (
                    <div key={index} className="w-2/3 bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-4 text-[#4A4A4A]">
                      <h2 className="gilroy-bold text-lg sm:text-xl">{feat.title}</h2>
                      <p className="gilroy-regular text-xs sm:text-sm">{feat.description}</p>
                    </div>
                  ))}
              </div>

              <div className="absolute right-0 gap-4 h-full z-10 pr-4 hidden md:flex justify-end lg:w-full">
                <div className="lg:w-5/6 2xl:w-4/6 md:flex justify-center gap-4">
                  <div className="flex flex-col justify-center gap-4">
                    <div className="h-10 border-b-2 border-[#4A4A4A] w-fit">
                      <h1 className="text-[#4A4A4A] text-2xl md:text-3xl lg:text-4xl flex gap-2 text-justify gilroy-extrabold">
                        Calculadoras de costos
                        <span className="relative text-[#006936] z-10">Agrícolas</span>
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
        <section className="flex flex-col items-center justify-center gap-10 px-4 py-10 md:hidden">
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
        <section className="hidden md:flex justify-center m-5">
          <div className="w-full grid grid-cols-3 lg:w-5/6 2xl:w-4/6 gap-5">
            {features.map((feat, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-md shadow-lg rounded-xl p-4 text-[#4A4A4A]">
                <h3 className="gilroy-bold text-black text-2xl">{feat.title}</h3>
                <p className="m-2 gilroy-regular text-[#4A4A4A] text-base">
                  {feat.description}
                </p>
              </div>
            ))}          
          </div>
        </section>
      </div>
    </div>
  );
}
