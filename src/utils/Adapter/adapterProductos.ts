import { type Producto as ProductoS } from '@/types/sanitizante';
import { type Producto as ProductoF } from '@/types/fertilizacion';
import { type ProductoSipan } from '@/types/sipan';

interface adapterProductosInterface {
	data: ProductoSipan[]
}

export function adapterProductosSanidad({ data }: adapterProductosInterface) : ProductoS[] {
	//Adapta datos provenientes del SIPAN al tipado utilizado durante el desarrollo
	const productos: ProductoS[] = [];	
	data?.forEach((prod: ProductoSipan) => {
		if (prod.rubro === 'Sanidad') {
			const sanitizante: ProductoS = {
				id_sanitizante: `${productos.length+1}`,
				nombre: prod.indicador,
				precio_usd_envase: ((prod.precio === null)? 0 : parseFloat(prod.precio)),
				volumen_envase: 1,
				unidad: ((prod.unidadsigla === null)? '': prod.unidadsigla),
				dosis_x_hl: 0,
				tipo: ''
			};
			productos[productos.length] = sanitizante;
		}
	});
	return productos;
};

export function adapterProductosFertilizantes({ data }: adapterProductosInterface): ProductoF[] {
	//Adapta datos provenientes del SIPAN al tipado utilizado durante el desarrollo
	const productos: ProductoF[] = [];
	data?.forEach((prod: ProductoSipan) => {
		if (prod.rubro === 'Fertilizantes') {
			const fertilizante: ProductoF = {
				id_fertilizante: `${productos.length}+1`,
				nombre: prod.indicador,
				precio_usd_envase: ((prod.precio === null)? 0 : parseFloat(prod.precio)),
				volumen_envase: 1,
				unidad: ((prod.unidadsigla === null)? '': prod.unidadsigla),
				dosis_x_ha: 0
			};
			productos[productos.length] = fertilizante;
		}
	});
	return productos;
};