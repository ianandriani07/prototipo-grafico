export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method && req.method !== "GET") {
      return Response.json({ error: "Método não permitido" }, { status: 405 })
    }

    const backend = process.env.BACKEND_URL
    const user = process.env.API_USER
    const pass = process.env.API_PASS

    if (!backend || !user || !pass) {
      return Response.json(
        { error: "Env BACKEND_URL/API_USER/API_PASS não configuradas" },
        { status: 500 }
      )
    }

    const url = new URL(req.url)
    const auth = Buffer.from(`${user}:${pass}`).toString("base64")
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    try {
      const r = await fetch(
        `${backend}/api/dashboard/cards${url.search}`,
        {
          headers: { Authorization: `Basic ${auth}` },
          signal: controller.signal,
        }
      )

      const contentType = r.headers.get("content-type") ?? "application/json"
      const body = await r.text()

      return new Response(body, {
        status: r.status,
        headers: { "Content-Type": contentType },
      })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao chamar backend"
      const status = message.includes("aborted") ? 504 : 502

      return Response.json({ error: message }, { status })
    } finally {
      clearTimeout(timeoutId)
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro inesperado"
    return Response.json({ error: message }, { status: 500 })
  }
}
