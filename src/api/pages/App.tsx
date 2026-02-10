//import { useAuth } from "@/auth/AuthProvider"
import { LoginPage } from "./LoginPage"
import { useDashboard } from "@/hooks/useDashboard"
import { DashboardGrid } from "@/components/DashboardGrid"

export function App() {
  const isAuthenticated  = null;

  if (isAuthenticated) {
    return <LoginPage />
  }

  const { data, loading, isRefreshing, error } = useDashboard()

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6">
      {loading && <div className="text-slate-300">Carregando...</div>}
      {error && <div className="text-rose-400">Erro: {error}</div>}
      {data && (
        <div className="flex flex-col items-center gap-3">
          <DashboardGrid data={data} />
          {isRefreshing && (
            <div className="text-xs text-slate-400">Atualizando...</div>
          )}
        </div>
      )}
    </div>
  )
}
