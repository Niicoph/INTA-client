import {type PlanFormData} from "@/schemas/Fertilizacion/types";
import {type Plan, type Tratamiento, type Aplicacion} from "@/types/fertilizacion";

export const calcularCostoTotalFertilizacion = (data: PlanFormData) : Plan => {
    let costo_plan = 0;
    const tratamientos: Tratamiento[] = data.tratamientos.map((tto) => {
        let costo_tto = 0;
        const aplicaciones: Aplicacion[] = tto.aplicaciones.map((app, index) => {
            const costoPorUnidad = (app.producto.precio_usd_envase * data.cotizacion_usd) / app.producto.volumen_envase;
            const costo_app = (costoPorUnidad * app.dosis_x_ha)
            costo_tto += costo_app;

            return {
                id_aplicacion: `${index+1}`,
                producto: app.producto,
                dosis_x_ha: app.dosis_x_ha,
                // volumen_aplicado: app.volumen_aplicado,
                costo_total: costo_app,
            };
        });
        costo_plan += costo_tto;

        return {
            id_tratamiento: tto.id_tratamiento,
            aplicaciones: aplicaciones,
            costo_total: costo_tto,
            fecha: tto.fecha,
        };
    });

    const plan = {
        id_plan: data.id_plan,
        tratamientos: tratamientos,
        costo_total: costo_plan,
        cotizacion_usd: data.cotizacion_usd
    }
    return plan;
}
