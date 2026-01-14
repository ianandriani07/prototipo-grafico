import { MetricCard } from "@/components/KpiCard"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import type { DashboardResponse } from "@/api/types"

const chartConfig = {
  valor: { label: "Valor", color: "#7c3aed" },
} satisfies ChartConfig

function badgeVariantFromGrowth(g: number | null): "success" | "warning" | "danger" {
  if (g === null) return "warning"
  if (g < 0) return "danger"
  return "success"
}

function badgeTextFromGrowth(g: number | null, janela: number) {
  if (g === null) return <>—</>
  const sinal = g > 0 ? "+" : ""
  return (
    <>
      {sinal}
      {g.toFixed(1)}% últimos <br /> {janela} dias
    </>
  )
}

function formatDia(diaISO: string) {
  // "2026-01-06" -> "06/01"
  const [, m, d] = diaISO.split("-")
  return `${d}/${m}`
}

type ChartKind = "area" | "bar" | "pie"

function chartKindFor(codigo: string): ChartKind {
  if (codigo === "Atendimentos") return "area"
  if (codigo === "Atendimentos perdidos") return "bar"
  return "pie"
}

function renderChart(card: DashboardResponse["cards"][number]) {
  const kind = chartKindFor(card.codigo)
  const data = card.serie.map((p) => ({ dia: formatDia(p.dia), valor: p.valor }))

  if (kind === "area") {
    return (
      <ChartContainer config={chartConfig} className="h-52 w-full">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid vertical={false} strokeOpacity={0.15} />
          <XAxis
            dataKey="dia"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            width={32}
          />
          <Area
            type="linear"
            dataKey="valor"
            stroke="var(--color-valor)"
            fill="var(--color-valor)"
            fillOpacity={0.35}
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    )
  }

  if (kind === "bar") {
    return (
      <ChartContainer config={chartConfig} className="h-52 w-full">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid vertical={false} strokeOpacity={0.15} />
          <XAxis
            dataKey="dia"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            width={32}
          />
          <Bar
            dataKey="valor"
            fill="var(--color-valor)"
            radius={[6, 6, 0, 0]}
            barSize={26}
          />
        </BarChart>
      </ChartContainer>
    )
  }

  // pie (default) — temporário: donut "Hoje vs Restante"
  const total = data.reduce((acc, x) => acc + (x.valor ?? 0), 0)
  const last = data.at(-1)?.valor ?? 0
  const rest = Math.max(total - last, 0)

  const pieData = [
        { name: "Hoje", value: last, fill: "rgba(124, 58, 237, 1)" },
        { name: "Restante", value: rest, fill: "rgba(124, 58, 237, 0.25)" },
    ]

    return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-52 w-full">
            <PieChart>
            <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                stroke="rgba(124, 58, 237, 0.15)"
            />
            </PieChart>
        </ChartContainer>
    )
}

export function DashboardGrid({ data }: { data: DashboardResponse }) {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data.cards.map((card) => (
        <MetricCard
          key={card.codigo}
          title={<>{card.titulo}</>}
          value={card.valor_atual ?? "-"}
          subtitle={`Atualizado em ${data.dia_atual}`}
          badgeVariant={badgeVariantFromGrowth(card.crescimento_percentual)}
          badgeText={badgeTextFromGrowth(card.crescimento_percentual, data.janela_de_dias)}
        >
          {renderChart(card)}
        </MetricCard>
      ))}
    </div>
  )
}
