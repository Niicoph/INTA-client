import type { PlanFormData } from "@/schemas/Sanitizacion/types";
import { type Plan } from "@/types/sanitizante";


export const calcularCostoTotalSanitizacion = ( data: PlanFormData ): Plan => {
    const tratamientos = data.tratamientos.map(tratamiento => {
        let costoTotal = 0;
        const aplicaciones = tratamiento.aplicaciones.map((aplicacion) => {
            const costoPorUnidad = (aplicacion.producto.precio_usd_envase * data.cotizacion_usd ) / aplicacion.producto.volumen_envase;
            costoTotal += costoPorUnidad;
            return {
                producto: aplicacion.producto,
                volumen_aplicado: aplicacion.volumen_aplicado,
                costo_total: (costoPorUnidad * aplicacion.producto.dosis_x_hl * aplicacion.volumen_aplicado)
            };
        }, 0);
        return {
            id_tratamiento: tratamiento.id_tratamiento,
            aplicaciones: aplicaciones,
            costo_total: costoTotal,
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
};