import CotizacionesIcon from '../../assets/Icons/Outlined/cotizaciones.png';
import TitleContainer from '../ui/TitleContainer/TitleContainer';
import CardCotizaciones from './CardCotizaciones';

import { useDollar } from '@/hooks/useDollar';
import { useGasoil } from '@/hooks/useGasoil';
import { type Dollar } from '@/types/dollar';
import { type Gasoil } from '@/types/gasoil';
import { Fuel } from 'lucide-react';
import { DollarSignIcon } from 'lucide-react';
import { CardSkeleton } from '../ui/CardSkeleton/CardSkeleton';

export default function ContainerCotizaciones() {
  const dollarCollection = useDollar();
  const gasoilCollectionNQN = useGasoil('NEUQUEN');
  const gasoilCollectionRN = useGasoil('VIEDMA');

  return (
    <div className="rounded-md flex flex-col border border-border">
      <TitleContainer icon={CotizacionesIcon} title="Cotizaciones" />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {dollarCollection.isLoading &&
          Array.from({ length: 1 }).map((_, index) => <CardSkeleton key={index} />)}

        {!dollarCollection.isLoading &&
          dollarCollection.data?.map((dollar: Dollar, index: number) => {
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
              <>
                <CardCotizaciones
                  key={dollar.casa + index}
                  name="Dólar Oficial - Venta"
                  value={dollar.venta}
                  date={date}
                  time={time}
                  icon={<DollarSignIcon color="#ffffff" size={22} />}
                  color="006936"
                />
                <CardCotizaciones
                  key={dollar.casa + index + 1}
                  name="Dólar Oficial - Compra"
                  value={dollar.compra}
                  date={date}
                  time={time}
                  icon={<DollarSignIcon color="#ffffff" size={22} />}
                  color="006936"
                />
              </>
            );
          })}
        {gasoilCollectionNQN.isLoading &&
          Array.from({ length: 1 }).map((_, index) => <CardSkeleton key={index} />)}

        {!gasoilCollectionNQN.isLoading &&
          gasoilCollectionNQN.data?.slice(0, 1).map((gasoil: Gasoil, index) => {
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
              <CardCotizaciones
                key={gasoil.localidad + index}
                name={`${gasoil.empresabandera} - ${gasoil.localidad}`}
                value={gasoil.precio}
                date={gasoil.direccion}
                time={date}
                icon={<Fuel color="#ffffff" size={22} />}
                color="E86C2A"
              />
            );
          })}
        {gasoilCollectionRN.isLoading &&
          Array.from({ length: 1 }).map((_, index) => <CardSkeleton key={index} />)}

        {!gasoilCollectionRN.isLoading &&
          gasoilCollectionRN.data?.slice(0, 1).map((gasoil: Gasoil, index) => {
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
              <CardCotizaciones
                key={gasoil.localidad + index}
                name={gasoil.empresabandera + ' - ' + gasoil.localidad}
                value={gasoil.precio}
                date={gasoil.direccion}
                time={date}
                icon={<Fuel color="#ffffff" size={22} />}
                color="E86C2A"
              />
            );
          })}
      </div>
    </div>
  );
}
