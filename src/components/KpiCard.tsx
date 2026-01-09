import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type BadgeVariant = "success" | "warning" | "danger"

type MetricCardProps = {
  title: React.ReactNode
  subtitle: string
  value: number | string
  badgeText?: React.ReactNode
  badgeVariant?: BadgeVariant
  children: React.ReactNode
}

const badgeClasses: Record<BadgeVariant, string> = {
  success: "bg-emerald-500/20 text-emerald-400",
  warning: "bg-amber-500/20 text-amber-400",   // laranja do print
  danger:  "bg-rose-500/20 text-rose-400",     // vermelho (bonito no dark)
}

export function MetricCard({
  title,
  subtitle,
  value,
  badgeText,
  badgeVariant = "success",
  children,
}: MetricCardProps) {
  return (
    <Card className="bg-slate-800 text-slate-100 w-full border-transparent">
      <CardHeader className="pb-0 pt-0 flex justify-between gap-2">
        <CardTitle className="text-xl font-bold leading-tight">{title}</CardTitle>

        {badgeText && (
          <Badge
            className={[
              "mt-1 px-3 py-1 text-sm font-semibold rounded-full",
              badgeClasses[badgeVariant],
            ].join(" ")}
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
