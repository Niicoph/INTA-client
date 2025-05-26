import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { type CostoEconomico } from '@/types/maquinaria';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Alert from '../alert';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export function Chart({ costosEconomicos }: { costosEconomicos: CostoEconomico[] }) {
  return costosEconomicos && costosEconomicos.length > 0 ? (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart accessibilityLayer data={costosEconomicos} margin={{ top: 20 }}>
        {/* Grilla */}
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={1}
          tickFormatter={(value) => `$${value.toLocaleString('es-AR')}`}
        />
        <XAxis
          dataKey="id_conjunto"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
        <Bar
          dataKey="costo_total_hora"
          name="Costo $/hora"
          // fill="var(--color-desktop)"
          fill={'#3b82f6'}
          radius={4}
          barSize={40}
        />
      </BarChart>
    </ChartContainer>
  ) : (
    <Alert text="No hay conjuntos para mostrar." className="h-full" />
  );
}
