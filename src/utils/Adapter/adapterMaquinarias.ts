import { type MaquinariaList, type Tractor, type Implemento  } from '@/types/maquinaria';
import { type MaquinariaSipan } from '@/types/sipan';

interface adapterMaquinariasInterface {
  data: MaquinariaSipan[]
}

export function adapterMaquinarias({ data }: adapterMaquinariasInterface) : MaquinariaList {
  //Adapta datos provenientes del SIPAN al tipado utilizado durante el desarrollo
  const maquinarias: MaquinariaList = {
    tractores: [],
    implementos: [],
  };

  data?.forEach((maq: MaquinariaSipan) => {
    if (maq.consumo === null) {
      const tractor: Tractor = {
        id_tractor: `${maquinarias.tractores.length+1}`,
        nombre: maq.indicador,
        potencia_CV: parseInt(maq.indicador.match(/\d+/)?.[0] || '0', 10),
        precio_usd: parseFloat(maq.precio),
        coef_gastos_conservacion: parseFloat(maq.coeficiente),
        horas_utiles: parseInt(maq.vidautil),
        valor_residual_pct: parseInt(maq.valorresidual)
      };
      maquinarias.tractores[maquinarias.tractores.length] = tractor;
    } else {
      const implemento: Implemento = {
        id_implemento: `${maquinarias.implementos.length+1}`,
        nombre: maq.indicador,
        precio_usd: parseFloat(maq.precio),
        coef_gastos_conservacion: parseFloat(maq.coeficiente),
        horas_utiles: parseInt(maq.vidautil),
        valor_residual_pct: parseInt(maq.valorresidual),
        consumo_litros_hora_CV: parseFloat(maq.consumo)
      };
      maquinarias.implementos[maquinarias.implementos.length] = implemento;      
    }
  });

  return maquinarias;
};