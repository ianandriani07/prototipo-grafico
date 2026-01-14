import { useEffect, useState } from "react"
import type { DashboardResponse } from "@/api/types"
import { fetchDashboardCards } from "@/api/dashboard"

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const json = await fetchDashboardCards()
        if (!alive) return
        setData(json)
      } catch (e: any) {
        if (!alive) return
        setError(e?.message ?? "Erro desconhecido")
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }

    load()

    return () => {
      alive = false
    }
  }, [])

  return { data, loading, error }
}
