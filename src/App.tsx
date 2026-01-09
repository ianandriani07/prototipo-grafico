import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Area, AreaChart, Pie, PieChart } from "recharts"
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { MetricCard } from "@/components/KpiCard"
import { DualDonutCard } from "./components/DoubleKpiCard"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const donutConfig = {
  value: { label: "Atendimentos" },
  realizados: { label: "Realizados", color: "var(--color-desktop)" },
  perdidos: { label: "Perdidos", color: "var(--color-desktop)" },
  cancelados: { label: "Cancelados", color: "var(--color-desktop)" },
} satisfies ChartConfig

const donutData = [
  { name: "Realizados", value: 275, fill: "rgba(124, 58, 237, 1)" },
  { name: "Perdidos", value: 200, fill: "rgba(124, 58, 237, 0.7)" },
  { name: "Cancelados", value: 90, fill: "rgba(124, 58, 237, 0.45)" },
]


const chartConfig = {
  desktop: { label: "Desktop", color: "#7c3aed" },
} satisfies ChartConfig

export function App() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-3 gap-8">
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
          title={<>Atendimentos Perdidos</>}
          badgeText={<>-18% últimos <br /> 5 dias</>}
          value={128}
          subtitle="Atendimentos não realizados"
          badgeVariant="danger"
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
        <MetricCard
          title={<>Técnicos Disponíveis</>}
          badgeText={<>+8% últimos <br /> 5 dias</>}
          badgeVariant="warning"
          value={12}
          subtitle="Técnicos ativos no momento"
        >
          <ChartContainer
            config={donutConfig}
            className="mx-auto aspect-square h-52 w-full"
          >
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        </MetricCard>
        <div className="col-span-3 grid grid-cols-2 gap-8">
          <DualDonutCard
            title={<>Freshdesk</>}
            value={244}
            left={{
              label: "+14% últimos 5 dias",
              value: 170,
              total: 244,
              color: "#10b981",
              trackColor: "rgba(16, 185, 129, 0.18)",
            }}
            right={{
              label: "+28% últimos 5 dias",
              value: 74,
              total: 244,
              color: "#f59e0b",
              trackColor: "rgba(245, 158, 11, 0.18)",
            }}
          />

          <DualDonutCard
            title={<>Freshdesk</>}
            value={244}
            left={{
              label: "+14% últimos 5 dias",
              value: 200,
              total: 244,
              color: "#10b981",
              trackColor: "rgba(16, 185, 129, 0.18)",
            }}
            right={{
              label: "+294% últimos 5 dias",
              value: 294,
              total: 244,
              color: "#7c3aed",
              trackColor: "rgba(124, 58, 237, 0.18)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
