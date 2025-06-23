import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import Alert from '../ui/alert';
import type { Aplicacion, Plan, Tratamiento } from '@/types/sanitizante';
import { type TooltipProps } from 'recharts';

import { useMemo } from 'react';

const tailwindColorMap = [
  { hex: '#3b82f6', class: 'text-blue-500' },
  { hex: '#10b981', class: 'text-emerald-500' },
  { hex: '#f59e0b', class: 'text-amber-500' },
  { hex: '#ef4444', class: 'text-red-500' },
  { hex: '#8b5cf6', class: 'text-violet-500' },
  { hex: '#ec4899', class: 'text-pink-500' },
  { hex: '#22d3ee', class: 'text-cyan-500' },
  { hex: '#a3e635', class: 'text-lime-500' },
  { hex: '#f472b6', class: 'text-rose-500' },
  { hex: '#fb923c', class: 'text-orange-500' },
  { hex: '#34d399', class: 'text-green-500' },
  { hex: '#facc15', class: 'text-yellow-500' },
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const plan: Plan = payload[0].payload.plan;
  return (
    <div className="rounded-md bg-white p-2 shadow-md">
      <div className="border-l-2 border-dashed border-blue-500 pl-2 flex flex-col gap-1">
        {/* CADA PLAN */}
        <div className="text-foreground font-mono font-medium mb-1">
          Plan {plan.id_plan}
        </div>
        {plan.tratamientos.map((tto: Tratamiento, index) => (
          /* CADA TRATAMIENTO */
          <div key={index} className="border-l-1 border-dashed border-blue-500 pl-2 flex flex-col gap-1">
            <div
              className={`${tailwindColorMap[index % tailwindColorMap.length].class} flex justify-between gap-4 font-medium tabular-nums`}
            >
              <div className={`font-mono font-medium mb-1`}>
                Tto. {tto.id_tratamiento}
              </div>
              <span>${Number(tto.costo_total).toLocaleString('es-AR', { maximumFractionDigits: 2 })}/ha</span>
            </div>
            {/* CADA APLICACION DE PRODUCTO */}
            <div className="border-l-1 border-dashed border-blue-500 pl-2 flex flex-col gap-1">
              {tto.aplicaciones.map((app: Aplicacion, index) => (
                <div key={index} className="flex justify-between gap-4 text-foreground font-medium tabular-nums">
                  <span>{app.producto.nombre}</span>
                  <span>${Number(app.costo_total).toLocaleString('es-AR', { maximumFractionDigits: 2 })}/ha</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums border-t border-dashed border-blue-500"></div>
            </div>
          </div>
        ))}
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums border-t border-dashed border-blue-500">
          <span className="text-[#3b82f6]">Total</span>
          <span className="text-[#3b82f6]">
            $
            {Number(plan.costo_total).toLocaleString('es-AR', {
              maximumFractionDigits: 2,
            })}/ha
          </span>
        </div>
      </div>
    </div>
  );
};

export default function ChartSanidad({ planes }: { planes: Plan[] }) {
  const { chartData, tratamientoKeys } = useMemo(() => {
    const keys = new Set<string>();
    const data = planes?.map((plan) => {
      const row: Record<string, string | number | Plan> = {
        plan: plan, //Guardo plan para usarlo en el Tooltip
        id_plan: plan.id_plan,
        costo_plan: plan.costo_total,
      };

      plan.tratamientos.forEach((tto) => {
        row[tto.id_tratamiento] = tto.costo_total;
        keys.add(tto.id_tratamiento);
      });

      return row;
    });

    return {
      chartData: data,
      tratamientoKeys: Array.from(keys),
    };
  }, [planes]);

  return planes?.length > 0 ? (
    <ChartContainer
      config={{}}
      className={`h-full w-full ${planes.length > 12 ? 'w-[1000px]' : ''}`}
    >
      <BarChart data={chartData} margin={{ top: 20, left: 20}}>
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(escala) => `$${escala.toLocaleString('es-AR')}/ha`}
        />
        <XAxis
          dataKey="id_plan"
          tickLine={false}
          tickMargin={7}
          axisLine={false}
          tickFormatter={(value) => `Plan ${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        {tratamientoKeys.map((key, index) => (
          <Bar key={key} dataKey={key} fill={`${tailwindColorMap[index % tailwindColorMap.length].hex}`} radius={4} barSize={30} cursor="pointer">
          </Bar>
        ))}
      </BarChart>
    </ChartContainer>
  ) : (
    <Alert text="No hay conjuntos para mostrar." />
  );
}
