import { useDashboard } from "@/hooks/useDashboard"
import { DashboardGrid } from "@/components/DashboardGrid"

export function App() {
  const { data, loading, error } = useDashboard()

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6">
      {loading && <div className="text-slate-300">Carregando...</div>}
      {error && <div className="text-rose-400">Erro: {error}</div>}
      {data && <DashboardGrid data={data} />}
    </div>
  )
}
