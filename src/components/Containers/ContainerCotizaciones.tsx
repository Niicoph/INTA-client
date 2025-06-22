import CotizacionesIcon from '../../assets/Icons/Outlined/cotizaciones.png';
import TitleContainer from '../ui/TitleContainer/TitleContainer';
import CardCotizaciones from '../Cards/CardCotizaciones';

import { useDollar } from '@/hooks/useDollar';
import { useGasoil } from '@/hooks/useGasoil';
import { type Gasoil } from '@/types/gasoil';
import { Fuel } from 'lucide-react';
import { DollarSignIcon } from 'lucide-react';
import { CardSkeleton } from '../Loadings/CardSkeleton/CardSkeleton';

interface Props {
  dollar?: boolean;
  gasoil?: boolean;
}

export default function ContainerCotizaciones({ dollar = false, gasoil = false }: Props) {
  const dollarCollection = useDollar();
  const gasoilCollectionNQN = useGasoil('NEUQUEN');
  return (
    <div className="rounded-md flex flex-col border border-border">
      <TitleContainer icon={CotizacionesIcon} title="Cotizaciones" />

      <div className="flex flex-col">
        {dollar &&
          dollarCollection.isLoading &&
          Array.from({ length: 1 }).map((_, index) => <CardSkeleton key={index} />)}

        {dollar && !dollarCollection.isLoading && (
          <CardCotizaciones
            name={dollarCollection.data.name}
            value={dollarCollection.data.value}
            date={dollarCollection.data.date}
            icon={<DollarSignIcon color="#ffffff" size={22} />}
            color="006936"
          />
        )}

        {gasoil &&
          gasoilCollectionNQN.isLoading &&
          Array.from({ length: 1 }).map((_, index) => <CardSkeleton key={index} />)}

        {gasoil &&
          !gasoilCollectionNQN.isLoading &&
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
                key={'neuquen' + index}
                name={`${gasoil.empresabandera} - ${gasoil.localidad}`}
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
