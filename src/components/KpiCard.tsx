import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type MetricCardProps = {
  title: React.ReactNode
  subtitle: string
  value: number | string
  badgeText?: React.ReactNode
  children: React.ReactNode
}

export function MetricCard({
  title,
  subtitle,
  value,
  badgeText,
  children,
}: MetricCardProps) {
  return (
    <Card className="bg-slate-800 text-slate-100 w-[420px]">
      <CardHeader className="pb-0 pt-0 flex justify-between gap-2">
        <CardTitle className="text-xl font-bold leading-tight">
          {title}
        </CardTitle>

        {badgeText && (
          <Badge
            className="
              mt-1
              bg-emerald-500/20
              text-emerald-400
              px-3
              py-1
              text-sm
              font-semibold
              rounded-full
            "
          >
            {badgeText}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="pt-1 pb-0">
        <div className="mb-4">
          <div className="text-6xl font-extrabold leading-none">{value}</div>
          <div className="mt-2 text-sm text-slate-400">{subtitle}</div>
        </div>

        {children}
      </CardContent>
    </Card>
  )
}
