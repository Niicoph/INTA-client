import ContainerCotizaciones from '@/components/Containers/ContainerCotizaciones';
import { ProductosProvider } from '@/context/ProductosContext';
import FormProductos from '@/components/Forms/Sanitizacion/FormProducto';
import FormPlan from '@/components/Forms/Sanitizacion/FormPlan';
import VisualizacionSanitizacion from '@/components/Containers/VisualizacionSanitizacion';

export default function Sanitizacion() {
  return (
    <section className="grid grid-cols-1 gap-4 w-full h-full xl:flex">
      <div className="flex flex-col 2xl:flex-row gap-4 h-full w-full 2xl:w-1/2">
        <ProductosProvider>
            <div className='flex flex-col gap-4 2xl:w-2/5'>
              <ContainerCotizaciones dollar={true}/>
              <FormProductos />
            </div>
            <div className='grid grid-cols-1 gap-4 2xl:w-3/5'>
              <FormPlan />
            </div>
          
        </ProductosProvider>
      </div>
      <div className="w-full 2xl:flex 2xl:flex-row 2xl:w-1/2">
        <VisualizacionSanitizacion />
      </div>
    </section>
  );
}
