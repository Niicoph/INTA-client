import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import { ProductosProvider } from '@/context/ProductosContext';
import FormProductos from '@/components/Forms/Sanitizacion/FormProducto';
import FormPlan from '@/components/Forms/Sanitizacion/FormPlan';
import VisualizacionSanitizacion from '@/components/Containers/VisualizacionSanitizacion';

export default function Sanitizacion() {
  return (
    <section className="grid grid-cols-1 gap-4 w-full h-full xl:flex">
      <div className="flex flex-row gap-4 h-full w-full xl:w-3/5">
        <ProductosProvider>
            <div className='grid grid-cols-1 gap-4 w-1/3'>
              <ContainerCotizaciones dollar={true}/>
              <FormProductos />
            </div>
            <div className='grid grid-cols-1 gap-4 w-2/3'>
              <FormPlan />
            </div>
          
        </ProductosProvider>
      </div>
      <div className="w-full xl:flex xl:flex-row xl:w-2/5">
        <VisualizacionSanitizacion />
      </div>
    </section>
  );
}
