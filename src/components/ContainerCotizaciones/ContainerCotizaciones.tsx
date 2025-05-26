import CotizacionesIcon from '../../assets/Icons/Outlined/cotizaciones.png';
import TitleContainer from '@/components/ui/TitleContainer/TitleContainer';

import CardCotizaciones from './CardCotizaciones';
import { type Dollar } from '@/types/dollar';
import { useDollar } from '@/hooks/useDollar';
import { DollarSignIcon } from 'lucide-react';
import { type Gasoil } from '@/types/gasoil';
import { useGasoil } from '@/hooks/useGasoil';
import { Fuel } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
export default function ContainerCotizaciones() {
  const dollarCollection = useDollar();
  const gasoilCollectionNQN = useGasoil('NEUQUEN');
  const gasoilCollectionRN = useGasoil('RIO NEGRO');

  if (dollarCollection.isError || gasoilCollectionNQN.isError || gasoilCollectionRN.isError)
    return <div>Ocurrió un error</div>;
  if (!dollarCollection.data || !gasoilCollectionNQN.data || !gasoilCollectionRN.data) return null;

  return (
    <TitleContainer title="Cotizaciones" icon={CotizacionesIcon}>
      <Carousel>
        <CarouselContent>
          {dollarCollection.data.map((dollar: Dollar) => {
            const dateObj = new Date(dollar.fechaActualizacion);
            const time = dateObj.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            });

            const rawDate = dateObj.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const [day, , monthRaw, , year] = rawDate.split(' ');
            const capitalizedMonth = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
            const date = `${capitalizedMonth} ${day}, ${year}`;

            return (
              <CarouselItem key={dollar.casa} className="lg:basis-1/2 pl-0">
                <CardCotizaciones
                  isLoading={dollarCollection.isLoading}
                  key={dollar.casa}
                  name={dollar.nombre}
                  value={dollar.venta}
                  date={date}
                  time={time}
                  icon={<DollarSignIcon color="#ffffff" size={22} />}
                  color="96C1AC"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel>

      <Carousel>
        <CarouselContent>
          {gasoilCollectionNQN.data.map((gasoil: Gasoil, index) => {
            const dateObj = new Date(gasoil.fecha_vigencia);
            const rawDate = dateObj.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const [day, , monthRaw, , year] = rawDate.split(' ');
            const capitalizedMonth = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
            const date = `${capitalizedMonth} ${day}, ${year}`;

            return (
              <CarouselItem
                key={`${index + 1}` + gasoil.empresabandera}
                className="lg:basis-1/2 p-0 "
                id="gasoilNQN"
              >
                <CardCotizaciones
                  isLoading={dollarCollection.isLoading}
                  key={gasoil.empresabandera + ' - ' + gasoil.localidad}
                  name={gasoil.empresabandera + ' - ' + gasoil.localidad}
                  value={gasoil.precio}
                  date={gasoil.direccion}
                  time={date}
                  icon={<Fuel color="#ffffff" size={22} />}
                  color="96C1AC"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel>
      {/* <Carousel>
        <CarouselContent>
          {gasoilCollectionRN.data.map((gasoil: Gasoil, index) => {
            const dateObj = new Date(gasoil.fecha_vigencia);
            const rawDate = dateObj.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const [day, , monthRaw, , year] = rawDate.split(' ');
            const capitalizedMonth = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1);
            const date = `${capitalizedMonth} ${day}, ${year}`;

            return (
              <CarouselItem
                key={`${index + 1}` + gasoil.empresabandera}
                className="lg:basis-1/2 pl-0"
                id="gasoilRN"
              >
                <CardCotizaciones
                  isLoading={dollarCollection.isLoading}
                  key={gasoil.empresabandera + ' - ' + gasoil.localidad}
                  name={gasoil.empresabandera + ' - ' + gasoil.localidad}
                  value={gasoil.precio}
                  date={gasoil.direccion}
                  time={date}
                  icon={<Fuel color="#ffffff" size={22} />}
                  color="96C1AC"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-5" />
        <CarouselNext className="-right-5" />
      </Carousel> */}
    </TitleContainer>
  );
}
