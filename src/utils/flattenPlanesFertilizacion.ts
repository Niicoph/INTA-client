import { type Plan } from "@/types/fertilizacion";
import {type FilaPlan } from "@/types/fertilizacion";

export function flattenPlanes(planes: Plan[]): FilaPlan[] {
  const rows = planes.flatMap(plan =>
    plan.tratamientos.flatMap(tratamiento =>
      tratamiento.aplicaciones.map(aplicacion => ({
        id_plan: plan.id_plan,
        id_tratamiento: tratamiento.id_tratamiento,
        plan_rowspan: 0,
        tratamiento_fecha: tratamiento.fecha,
        tratamiento_rowspan: 0,
        aplicacion: aplicacion,
        costo_tratamiento: tratamiento.costo_total,
        costo_x_ha: plan.costo_total,
        cotizacion_usd: plan.cotizacion_usd
      }))
    )
  );
  const planCount = new Map<string, number>();
  const tratamientoCount = new Map<string, number>();

  for (const row of rows) {
    const planKey = row.id_plan;
    const tratamientoKey = `${row.id_plan}::${row.id_tratamiento}`;

    planCount.set(planKey, (planCount.get(planKey) ?? 0) + 1);
    tratamientoCount.set(tratamientoKey, (tratamientoCount.get(tratamientoKey) ?? 0) + 1);
  }

  const seenPlans = new Set<string>();
  const seenTratamientos = new Set<string>();

  for (const row of rows) {
    const planKey = row.id_plan;
    const tratamientoKey = `${row.id_plan}::${row.id_tratamiento}`;

    if (!seenPlans.has(planKey)) {
      row.plan_rowspan = planCount.get(planKey)!;
      seenPlans.add(planKey);
    }

    if (!seenTratamientos.has(tratamientoKey)) {
      row.tratamiento_rowspan = tratamientoCount.get(tratamientoKey)!;
      seenTratamientos.add(tratamientoKey);
    }
  }

  return rows;
}
