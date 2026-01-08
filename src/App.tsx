import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts"
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { MetricCard } from "@/components/KpiCard" // caminho exemplo

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "#7c3aed" },
} satisfies ChartConfig

export function App() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6 grid grid-cols-3 gap-4">
      <MetricCard
        title={<>Atendimentos</>}
        badgeText={<>+18% últimos <br /> 5 dias</>}
        value={244}
        subtitle="Total de atendimentos realizados"
      >
        <ChartContainer config={chartConfig} className="h-52 w-full">
           <AreaChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
            >
              <CartesianGrid vertical={false} strokeOpacity={0.15} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                tickFormatter={(v) => v.slice(0, 3)}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
                width={32}
              />

              <Area
                type="linear"
                dataKey="desktop"
                stroke="var(--color-desktop)"
                fill="var(--color-desktop)"
                fillOpacity={0.35}
                strokeWidth={2}
              />

            </AreaChart>          
        </ChartContainer>
      </MetricCard>
      <MetricCard
        title={
          <>
            Atendimentos <br /> Perdidos
          </>
        }
        badgeText={
          <>
            +18% últimos <br /> 5 dias
          </>
        }
        value={31}
        subtitle="Atendimentos não realizados"
      >
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
          >
            <CartesianGrid vertical={false} strokeOpacity={0.15} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              tickFormatter={(v) => v.slice(0, 3)}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              width={32}
            />

            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={[6, 6, 0, 0]}
              barSize={26}
            />
          </BarChart>
        </ChartContainer>
      </MetricCard>
    </div>
  )
}
