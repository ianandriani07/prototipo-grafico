import type { VercelRequest, VercelResponse } from "@vercel/node"

const DEBUG_API_CARDS = process.env.DEBUG_API_CARDS === "true"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const start = Date.now()

  // =========================
  // 1) LOG INCOMING REQUEST
  // =========================
  if (DEBUG_API_CARDS) {
    console.log("==============================================")
    console.log("➡️  [API /api/cards] INCOMING")
    console.log("Method:", req.method)
    console.log("URL:", req.url)
    console.log("Query:", req.query)
    console.log("Headers:", JSON.stringify(req.headers, null, 2))
  }

  try {
    if (req.method !== "GET") {
      if (DEBUG_API_CARDS) {
        console.warn("❌ Método não permitido:", req.method)
      }
      return res.status(405).json({ error: "Método não permitido" })
    }

    const backend = process.env.BACKEND_URL
    const user = process.env.API_USER
    const pass = process.env.API_PASS

    if (!backend || !user || !pass) {
      if (DEBUG_API_CARDS) {
        console.error("❌ ENV faltando", {
          hasBackend: !!backend,
          hasUser: !!user,
          hasPass: !!pass,
        })
      }
      return res
        .status(500)
        .json({ error: "Env BACKEND_URL/API_USER/API_PASS não configuradas" })
    }

    // monta search string com segurança
    const search = new URLSearchParams(req.query as any).toString()
    const targetUrl = `${backend}/api/dashboard/cards${search ? `?${search}` : ""}`

    const auth = Buffer.from(`${user}:${pass}`).toString("base64")

    const headersToBackend: Record<string, string> = {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    }

    // =========================
    // 2) LOG OUTGOING REQUEST (BACKEND)
    // =========================
    if (DEBUG_API_CARDS) {
      console.log("")
      console.log("🚀 [BACKEND REQUEST] O QUE VAI SER ENVIADO")
      console.log("URL:", targetUrl)
      console.log("Method: GET")
      console.log(
        "Headers:",
        JSON.stringify(
          {
            ...headersToBackend,
            // mascara por padrão (pra não vazar segredo)
            Authorization: `Basic ${auth.slice(0, 6)}***`,
            // se você quiser ver o auth inteiro, comenta a linha acima e usa a de baixo:
            // Authorization: headersToBackend.Authorization,
          },
          null,
          2
        )
      )
      console.log("Timeout(ms): 8000")
      console.log("==============================================")
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    try {
      const r = await fetch(targetUrl, {
        method: "GET",
        headers: headersToBackend,
        signal: controller.signal,
      })

      const contentType = r.headers.get("content-type") ?? ""
      const bodyText = await r.text()
      const elapsed = Date.now() - start

      // =========================
      // 3) LOG BACKEND RESPONSE
      // =========================
      if (DEBUG_API_CARDS) {
        console.log("✅ [BACKEND RESPONSE]")
        console.log("Status:", r.status)
        console.log("Content-Type:", contentType)
        console.log("Time(ms):", elapsed)
        console.log("Body preview:", bodyText.slice(0, 400))
        console.log("==============================================")
      }
  console.log("==============================================")
  console.log("➡️  [API /api/cards] INCOMING")
  console.log("Method:", req.method)
  console.log("URL:", req.url)
  console.log("Query:", req.query)
  console.log("Headers:", JSON.stringify(req.headers, null, 2))

  try {
    if (req.method !== "GET") {
      console.warn("❌ Método não permitido:", req.method)
      return res.status(405).json({ error: "Método não permitido" })
    }

    const backend = process.env.BACKEND_URL
    const user = process.env.API_USER
    const pass = process.env.API_PASS

    if (!backend || !user || !pass) {
      console.error("❌ ENV faltando", {
        hasBackend: !!backend,
        hasUser: !!user,
        hasPass: !!pass,
      })
      return res
        .status(500)
        .json({ error: "Env BACKEND_URL/API_USER/API_PASS não configuradas" })
    }

    // monta search string com segurança
    const search = new URLSearchParams(req.query as any).toString()
    const targetUrl = `${backend}/api/dashboard/cards${search ? `?${search}` : ""}`

    const auth = Buffer.from(`${user}:${pass}`).toString("base64")

    const headersToBackend: Record<string, string> = {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    }

    // =========================
    // 2) LOG OUTGOING REQUEST (BACKEND)
    // =========================
    console.log("")
    console.log("🚀 [BACKEND REQUEST] O QUE VAI SER ENVIADO")
    console.log("URL:", targetUrl)
    console.log("Method: GET")
    console.log(
      "Headers:",
      JSON.stringify(
        {
          ...headersToBackend,
          // mascara por padrão (pra não vazar segredo)
          Authorization: `Basic ${auth.slice(0, 6)}***`,
          // se você quiser ver o auth inteiro, comenta a linha acima e usa a de baixo:
          // Authorization: headersToBackend.Authorization,
        },
        null,
        2
      )
    )
    console.log("Timeout(ms): 8000")
    console.log("==============================================")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    try {
      const r = await fetch(targetUrl, {
        method: "GET",
        headers: headersToBackend,
        signal: controller.signal,
      })

      const contentType = r.headers.get("content-type") ?? ""
      const bodyText = await r.text()
      const elapsed = Date.now() - start

      // =========================
      // 3) LOG BACKEND RESPONSE
      // =========================
      console.log("✅ [BACKEND RESPONSE]")
      console.log("Status:", r.status)
      console.log("Content-Type:", contentType)
      console.log("Time(ms):", elapsed)
      console.log("Body preview:", bodyText.slice(0, 400))
      console.log("==============================================")

      res.status(r.status)
      if (contentType) res.setHeader("Content-Type", contentType)
      return res.send(bodyText)
    } catch (e: any) {
      const msg =
        e?.name === "AbortError" ? "Timeout abortado" : String(e?.message ?? e)
      const status = e?.name === "AbortError" ? 504 : 502

      if (DEBUG_API_CARDS) {
        console.error("🔥 [BACKEND ERROR]", msg)
        console.log("==============================================")
      }
      const msg = e?.name === "AbortError" ? "Timeout abortado" : String(e?.message ?? e)
      const status = e?.name === "AbortError" ? 504 : 502

      console.error("🔥 [BACKEND ERROR]", msg)
      console.log("==============================================")
      return res.status(status).json({ error: msg })
    } finally {
      clearTimeout(timeoutId)
    }
  } catch (e: any) {
    if (DEBUG_API_CARDS) {
      console.error("💥 Erro inesperado:", String(e?.message ?? e))
      console.log("==============================================")
    }
    console.error("💥 Erro inesperado:", String(e?.message ?? e))
    console.log("==============================================")
    return res.status(500).json({ error: "Erro inesperado" })
  }
}
