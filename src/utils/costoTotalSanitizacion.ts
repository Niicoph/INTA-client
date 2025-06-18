import type { PlanFormData } from "@/schemas/Sanitizacion/types";
import { type CostoPlan } from "@/types/sanitizante";


export const calcularCostoTotalSanitizacion = ( data: PlanFormData ): CostoPlan => {
    // 1. Calcular costo por unidad de cada producto
    // 2. Calcular costo total por tratamiento
    // 3. Calcular costo total por plan

    const costosTratamientos = data.tratamientos.map(tratamiento => {
        const costoTotal = tratamiento.aplicaciones.reduce((total, aplicacion) => {
            const costoPorUnidad = aplicacion.producto.precio_usd_envase / aplicacion.producto.volumen_envase;
            return total + (costoPorUnidad * aplicacion.producto.dosis_x_hl* aplicacion.volumen_aplicado);
        }, 0);
        return {
            tratamiento,
            costo_total: costoTotal,
        };
    });

    const costoTotalPlan = costosTratamientos.reduce((total, costo_tratamiento) => {
        return total + costo_tratamiento.costo_total;
    }, 0);

    const costoPlan = {
        plan: data,
        costos_tratamientos: costosTratamientos,
        costo_total: costoTotalPlan
    }

    return costoPlan;
};
