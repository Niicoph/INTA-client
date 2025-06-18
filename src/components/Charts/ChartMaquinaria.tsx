import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Tooltip } from 'recharts';
import { type CostoEconomico } from '@/types/maquinaria';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import Alert from '../ui/alert';
import { type TooltipProps } from 'recharts';

const chartConfig = {
  costo_total_hora: {
    label: 'Costo $/hora',
    color: '#2563eb',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-md bg-white p-1 shadow-md">
      <div className="border-l-2 border-dashed border-blue-500 pl-1.5">
        <div className="text-foreground font-mono font-medium tabular-nums ">
          Conjunto {data.id_conjunto}
        </div>
        <div className="text-muted-foreground font-mono font-medium tabular-nums ">
          Costo $/hora
        </div>
        <div className="text-foreground font-mono font-medium tabular-nums ">
          $
          {data.costo_total_hora.toLocaleString('es-AR', {
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
    </div>
  );
};

export function ChartMaquinaria({ costosEconomicos }: { costosEconomicos: CostoEconomico[] }) {
  const scrollThreshold = 12;
  const shouldScroll = costosEconomicos.length > scrollThreshold;

  return costosEconomicos && costosEconomicos.length > 0 ? (
    <ChartContainer
      config={chartConfig}
      className={`h-full w-full ${shouldScroll ? ' w-[1000px]' : ''}`}
    >
      <BarChart accessibilityLayer data={costosEconomicos} margin={{ top: 20 }}>
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
          tickMargin={7}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="costo_total_hora" fill={'#3b82f6'} radius={4} barSize={30} cursor="pointer">
          <LabelList
            position="top"
            offset={6}
            className="fill-foreground"
            fontSize={11}
            content={(props) => {
              const { x, y, value } = props;
              return (
                <text
                  x={x}
                  y={y}
                  dy={-6}
                  dx={12}
                  textAnchor="middle"
                  className="fill-foreground font-mono "
                >
                  ${Number(value).toLocaleString('es-AR')}
                </text>
              );
            }}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  ) : (
    <Alert text="No hay conjuntos para mostrar." />
  );
}

export default ChartMaquinaria;
