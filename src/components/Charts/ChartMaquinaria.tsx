import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { type ConjuntoMaquinaria } from '@/types/maquinaria';
import { type ChartConfig, ChartContainer } from '@/components/ui/chart';
import { type TooltipProps } from 'recharts';

const chartConfig = {
  costo_total_hora: {
    label: 'Costo $/hora',
    color: '#2563eb',
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const cjto: ConjuntoMaquinaria = payload[0].payload;
  return (
    <div className="rounded-md bg-white p-2 shadow-md">
      <div className="border-l-2 border-dashed border-blue-500 pl-2 flex flex-col gap-1">
        {/* KEYS DE TRACTOR */}
        <div className="text-red-500 font-mono font-medium mb-1">{cjto.tractor.nombre}</div>
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums">
          <span>Amortizacion</span>
          <span>
            $
            {Number(cjto.tractor.amortizacion).toLocaleString('es-AR', {
              maximumFractionDigits: 2,
            })}
            /h
          </span>
        </div>
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums">
          <span>Mantenimiento</span>
          <span>
            $
            {Number(cjto.tractor.costo_mantenimiento).toLocaleString('es-AR', {
              maximumFractionDigits: 2,
            })}
            /h
          </span>
        </div>

        {/* KEYS DE IMPLEMENTO */}
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums border-t border-dashed border-blue-500"></div>
        <div className="text-yellow-500 font-mono font-medium mb-1">{cjto.implemento.nombre}</div>
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums">
          <span>Amortizacion</span>
          <span>
            $
            {Number(cjto.implemento.amortizacion).toLocaleString('es-AR', {
              maximumFractionDigits: 2,
            })}
            /h
          </span>
        </div>
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums">
          <span>Mantenimiento</span>
          <span>
            $
            {Number(cjto.implemento.costo_mantenimiento).toLocaleString('es-AR', {
              maximumFractionDigits: 2,
            })}
            /h
          </span>
        </div>

        {/* Costo combustible Cjto */}
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums border-t border-dashed border-blue-500"></div>
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums">
          <span>Combustible</span>
          <span>
            ${Number(cjto.costo_combustible).toLocaleString('es-AR', { maximumFractionDigits: 2 })}
            /h
          </span>
        </div>

        {/* Total Cjto */}
        <div className="flex justify-between gap-4 text-foreground font-medium tabular-nums border-t border-dashed border-blue-500">
          <span className="text-[#3b82f6]">Total </span>
          <span className="text-[#3b82f6]">
            $
            {cjto.costo_total_hora.toLocaleString('es-AR', {
              maximumFractionDigits: 2,
            })}
            /h
          </span>
        </div>
      </div>
    </div>
  );
};

export function ChartMaquinaria({
  conjuntosMaquinaria,
}: {
  conjuntosMaquinaria: ConjuntoMaquinaria[];
}) {
  const scrollThreshold = 12;
  const shouldScroll = conjuntosMaquinaria.length > scrollThreshold;

  return (
    <ChartContainer
      config={chartConfig}
      className={`h-full w-full${shouldScroll ? ' w-[1000px]' : ''}`}
    >
      <BarChart data={conjuntosMaquinaria} margin={{ top: 20, left: 20 }}>
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={1}
          tickFormatter={(value) => `$${value.toLocaleString('es-AR')}/h`}
        />
        <XAxis
          dataKey="id_conjunto"
          tickLine={false}
          tickMargin={7}
          axisLine={false}
          tickFormatter={(value) => `Cjto. ${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="costo_total_hora" fill={'#3b82f6'} radius={4} barSize={30} cursor="pointer">          
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export default ChartMaquinaria;
