export default async function handler(req: Request): Promise<Response> {
  const backend = process.env.BACKEND_URL
  const user = process.env.API_USER
  const pass = process.env.API_PASS

  if (!backend || !user || !pass) {
    return Response.json(
      { error: "Env BACKEND_URL/API_USER/API_PASS não configuradas" },
      { status: 500 }
    )
  }

  const auth = btoa(`${user}:${pass}`)

  const r = await fetch(`${backend}/api/dashboard/cards`, {
    headers: { Authorization: `Basic ${auth}` },
  })

  const contentType = r.headers.get("content-type") ?? "application/json"
  const body = await r.text()

  return new Response(body, {
    status: r.status,
    headers: { "Content-Type": contentType },
  })
}
