import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { type costoEconomico } from '@/types/maquinaria';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export function Chart({ costosEconomicos }: { costosEconomicos: costoEconomico[] }) {
  return (
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
            dataKey="conjunto"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="total"
            // fill="var(--color-desktop)"
            fill={'#3b82f6'}
            radius={4}
            barSize={40}
            stackId="a"
          />
        </BarChart>
      </ChartContainer>
    </>
  );
}
