import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { type CostoEconomico } from '@/types/maquinaria';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Alert from '../Alert';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export function Chart({ costosEconomicos }: { costosEconomicos: CostoEconomico[] }) {
  return costosEconomicos && costosEconomicos.length > 0 ? (
    <>
      <ChartContainer config={chartConfig} className="max-h-[250px] w-full ">
        <BarChart accessibilityLayer data={costosEconomicos}>
          {/* Grilla */}
          <CartesianGrid vertical={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => `$${value.toLocaleString('es-AR')}`}
          />
          <XAxis
            dataKey="id_conjunto"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="costo_total_hora"
            // fill="var(--color-desktop)"
            fill={'#3b82f6'}
            radius={4}
            barSize={40}
          />
        </BarChart>
      </ChartContainer>
    </>
  ) : (
    <Alert text="No hay conjuntos para mostrar." />
  );
}
