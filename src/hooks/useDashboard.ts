import { useEffect, useRef, useState } from "react"
import type { DashboardResponse } from "@/api/types"
import { fetchDashboardCards } from "@/api/dashboard"

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<number | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const requestIdRef = useRef(0)

  useEffect(() => {
    let alive = true

    async function load(isInitial = false) {
      const requestId = ++requestIdRef.current
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        if (isInitial) {
          setLoading(true)
        } else {
          setIsRefreshing(true)
        }
        setError(null)

        const json = await fetchDashboardCards({ signal: controller.signal })
        if (!alive || requestId !== requestIdRef.current) return
        setData(json)
      } catch (e: any) {
        if (!alive || requestId !== requestIdRef.current) return
        if (e?.name === "AbortError") return
        setError(e?.message ?? "Erro desconhecido")
      } finally {
        if (!alive || requestId !== requestIdRef.current) return
        if (isInitial) {
          setLoading(false)
        } else {
          setIsRefreshing(false)
        }
      }
    }

    load(true)
    intervalRef.current = window.setInterval(() => {
      load(false)
    }, 60000)

    return () => {
      alive = false
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      abortRef.current?.abort()
    }
  }, [])

  return { data, loading, isRefreshing, error }
}
