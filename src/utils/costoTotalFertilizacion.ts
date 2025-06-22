import {type PlanFormData} from "@/schemas/Fertilizacion/types";
import {type Plan} from "@/types/fertilizacion";


export const calcularCostoTotalFertilizacion = (data: PlanFormData) : Plan => {
    const tratamientos = data.tratamientos.map(tratamiento => {
        let costo_tto = 0;
        const aplicaciones = tratamiento.aplicaciones.map((aplicacion) => {
            const costoPorUnidad = (aplicacion.producto.precio_usd_envase * data.cotizacion_usd) / aplicacion.producto.volumen_envase;
            const costo_app = (costoPorUnidad * aplicacion.producto.dosis_x_ha)
            costo_tto += costo_app;
            return {
                producto: aplicacion.producto,
                // volumen_aplicado: aplicacion.volumen_aplicado,
                costo_total: costo_app,
            };
        }, 0);
        return {
            id_tratamiento: tratamiento.id_tratamiento,
            aplicaciones: aplicaciones,
            costo_total: costo_tto,
            fecha: tratamiento.fecha,
            cotizacion_usd: data.cotizacion_usd
        };
    });

    const costoTotalPlan = tratamientos.reduce((total, tratamiento) => {
        return total + tratamiento.costo_total;
    }, 0);

    const plan = {
        id_plan: data.id_plan,
        tratamientos: tratamientos,
        costo_total: costoTotalPlan,
        cotizacion_usd: data.cotizacion_usd
    }
    return plan;
}
