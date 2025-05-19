import { Label } from "@/components/ui/label";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { type Maquinaria } from "@/types/maquinaria";
import { type Sanidad } from "@/types/sanidad"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface ChartData {
    data:  Maquinaria[] | Sanidad[] ; //Por ahora, luego con Fertilizantes y Sanitizacion se refactorizar
}

export function Chart({ data }: ChartData) {

    return(
        <>
            <Label htmlFor="conjunto" className="text-muted-foreground">
                Costo/Hora
            </Label>
            <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
            <BarChart accessibilityLayer data={data}>
                {/* Grilla */}
                <CartesianGrid vertical={false} />
                {/* Ejes (valores) */}
                {/* Eje Y con formato en $ */}
                <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) =>
                    `$${value.toLocaleString("es-AR")}`
                }
                />

                {/* Eje X */}
                <XAxis
                dataKey="conjunto"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                />
                {/* tool tip that displays profit value comparision */}
                <ChartTooltip content={<ChartTooltipContent />} />
                {/* limit the max width using barSize */}
                <Bar
                dataKey="costohora"
                // fill="var(--color-desktop)"
                fill={"#348fe2"}
                radius={4}
                barSize={40}
                stackId="a" // Agrupa con las otras, las centra
                />
            </BarChart>
            </ChartContainer>
        </>
    );
}
