export type SeriePoint = {
  dia: string
  valor: number
}

export type DashboardCard = {
  codigo: string
  titulo: string
  valor_atual: number
  media_ultimos_5_dias: number | null
  crescimento_percentual: number | null
  serie: SeriePoint[]
}

export type DashboardResponse = {
  dia_atual: string
  janela_de_dias: number
  cards: DashboardCard[]
}
