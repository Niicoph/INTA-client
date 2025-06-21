import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import Alert from '../ui/alert';
import type { Plan } from '@/types/sanitizante';
import { type TooltipProps } from 'recharts';

import { useMemo } from 'react';

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const plan = payload[0].payload.plan;
  return (
    <div className="rounded-md bg-white p-2 shadow-md">
      <div className="border-l-2 border-dashed border-blue-500 pl-2 flex flex-col gap-1">
        <div className="text-foreground font-mono font-medium mb-1">{plan}</div>
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex justify-between gap-4 text-foreground font-medium tabular-nums"
          >
            <span>{item.dataKey}</span>
            <span>${Number(item.value).toLocaleString('es-AR', { maximumFractionDigits: 2 })}</span>
          </div>
        ))}
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums border-t border-dashed border-blue-500">
          <span className="text-[#3b82f6]">Total</span>
          <span className="text-[#3b82f6]">
            $
            {Number(payload[0].payload.costo_plan).toLocaleString('es-AR', {
              maximumFractionDigits: 2,
            })}
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
      const row: Record<string, string | number> = {
        plan: `Plan ${plan.id_plan}`,
        costo_plan: plan.costo_total,
      };

      plan.tratamientos.forEach((tto) => {
        const key = `Tto. ${tto.id_tratamiento}`;
        row[key] = tto.costo_total;
        keys.add(key);
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
      <BarChart data={chartData} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${v.toLocaleString('es-AR')}`}
        />
        <XAxis dataKey="plan" tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        {tratamientoKeys.map((key) => (
          <Bar key={key} dataKey={key} fill={`#3b82f6`} radius={4} barSize={30} cursor="pointer">
            <LabelList
              position="top"
              offset={6}
              className="fill-foreground"
              fontSize={11}
              formatter={(value: number) => `$${Number(value).toLocaleString('es-AR')}`}
            />
          </Bar>
        ))}
      </BarChart>
    </ChartContainer>
  ) : (
    <Alert text="No hay conjuntos para mostrar." />
  );
}
