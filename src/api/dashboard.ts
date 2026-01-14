import type { DashboardResponse } from "./types"

export async function fetchDashboardCards(): Promise<DashboardResponse> {
  // chama a function da Vercel (mesmo domínio)
  const res = await fetch("/api/cards")

  if (!res.ok) {
    throw new Error(`Erro ao buscar dashboard: HTTP ${res.status}`)
  }

  return (await res.json()) as DashboardResponse
}
