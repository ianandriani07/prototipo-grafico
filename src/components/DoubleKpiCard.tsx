import * as React from "react"
import { Pie, PieChart } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type DonutSpec = {
  label: React.ReactNode
  value: number
  total: number
  color: string
  trackColor?: string
}

type DualDonutCardProps = {
  title: React.ReactNode
  value: number | string
  left: DonutSpec
  right: DonutSpec
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function makeDonutData(spec: DonutSpec) {
  const total = spec.total <= 0 ? 1 : spec.total
  const v = clamp(spec.value, 0, total)

  return [
    { name: "filled", value: v, fill: spec.color },
    {
      name: "track",
      value: total - v,
      fill: spec.trackColor ?? "rgba(148, 163, 184, 0.18)", // slate-400/18
    },
  ]
}

function Donut({ spec }: { spec: DonutSpec }) {
  const data = makeDonutData(spec)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="aspect-square w-[132px]">
        <PieChart width={132} height={132}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={42}
            outerRadius={62}
            stroke="transparent"
            startAngle={90}
            endAngle={-270}
            isAnimationActive={false}
          />
        </PieChart>
      </div>

      <div className="text-sm font-medium text-slate-300 text-center">
        {spec.label}
      </div>
    </div>
  )
}

export function DualDonutCard({
  title,
  value,
  left,
  right,
}: DualDonutCardProps) {
  return (
    <Card className="bg-slate-800 text-slate-100 w-full border-transparent">
      <CardHeader className="pb-0 pt-0 flex justify-between gap-2">
        <CardTitle className="text-xl font-bold leading-tight">
          {title}
        </CardTitle>

        <div className="text-3xl font-extrabold leading-none text-violet-400">
          {value}
        </div>
      </CardHeader>

      <CardContent className="pt-1 pb-0">

        <div className="flex items-center justify-center gap-8 py-2">
          <Donut spec={left} />
          <Donut spec={right} />
        </div>
      </CardContent>
    </Card>
  )
}
