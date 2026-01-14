import type { DashboardResponse } from "./types"

export async function fetchDashboardCards(): Promise<DashboardResponse> {
  // chama a function da Vercel (mesmo domínio)
  const res = await fetch("/api/cards")
  const contentType = res.headers.get("content-type") ?? ""
  const bodyText = await res.text()
  const isJson = contentType.includes("application/json")

  if (!res.ok) {
    let details = ""

    if (isJson) {
      try {
        const parsed = JSON.parse(bodyText) as { error?: string }
        if (parsed?.error) {
          details = `: ${parsed.error}`
        }
      } catch {
        details = bodyText ? `: ${bodyText.slice(0, 200)}` : ""
      }
    } else if (bodyText) {
      details = `: ${bodyText.slice(0, 200)}`
    }

    throw new Error(`Erro ao buscar dashboard: HTTP ${res.status}${details}`)
  }

  if (!isJson) {
    const preview = bodyText ? `: ${bodyText.slice(0, 200)}` : ""
    throw new Error(`Resposta inválida do servidor${preview}`)
  }

  return JSON.parse(bodyText) as DashboardResponse
}
