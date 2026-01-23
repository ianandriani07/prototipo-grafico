// src/pages/LoginPage.tsx
import { useState } from "react"
import { Switch } from "@/components/ui/switch"
//import { useAuth } from "@/auth/AuthProvider"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
//import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function LoginPage() {

    /*
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    
    try {
      // TODO: trocar por tua API real:
      // const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, ...)
      // const { token } = await resp.json()

      const fakeToken = "token-demo"
      login(fakeToken)
    } catch (err) {
      setError("Falha ao autenticar.")
    } finally {
      setLoading(false)
    }
  }
    */

  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Glow roxo (igual vibe do dashboard) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124, 58, 237, 0.18), transparent 60%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(124, 58, 237, 0.12), transparent 55%)
          `,
        }}
      />

      {/* Grid sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      
      {/* Mobile-first: full screen form */}
      <div className="relative flex min-h-screen flex-col">
        {/* Header with brand - Mobile optimized */}
        <header className="flex items-center justify-center px-6 pt-12 pb-8 lg:pt-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-black text-primary-foreground">E</span>
            </div>
            <span className="text-xl font-bold text-foreground">ExtraDigital</span>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex flex-1 flex-col lg:flex-row">
          {/* Form section - Mobile first */}
          <div className="flex flex-1 flex-col justify-center px-6 pb-12 lg:max-w-md lg:px-12">
            <Card className="w-full max-w-sm mx-auto lg:max-w-none border-none bg-transparent shadow-none py-0 gap-0">
              <CardHeader className="px-0 pb-8 gap-1">
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  Bem-vindo de volta
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Entre com suas credenciais para acessar o sistema
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0">
                <form className="space-y-5">
                  {/* Username field */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-foreground">
                      Usuário
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Digite seu usuário"
                    />
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        placeholder="Digite sua senha"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-primary hover:bg-transparent"
                      >
                      </Button>
                    </div>
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch />
                      <Label
                        htmlFor="remember"
                        className="cursor-pointer text-sm text-muted-foreground font-normal"
                      >
                        Lembrar senha
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm font-medium text-primary p-0 h-auto"
                    >
                      Esqueceu a senha?
                    </Button>
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full text-base font-semibold"
                  >
                  </Button>
                </form>
              </CardContent>

            </Card>
          </div>

          {/* Brand section - Desktop only */}
          <Card className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:p-12 rounded-none border-none shadow-none">
            <CardContent className="max-w-md space-y-6 text-center p-0">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
                <span className="text-3xl font-black text-primary-foreground">E</span>
              </div>
              <CardTitle className="text-balance text-2xl font-bold tracking-tight text-foreground">
                Sistema de Gestão de Atendimentos
              </CardTitle>
              <CardDescription className="text-pretty text-muted-foreground text-base">
                Gerencie seus atendimentos de forma eficiente, acompanhe métricas em tempo real
                e otimize o fluxo de trabalho do seu cartório.
              </CardDescription>
              
              {/* Stats preview */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { label: "TME", value: "18 min" },
                  { label: "TMA", value: "32 min" },
                  { label: "Hoje", value: "87" },
                ].map((stat) => (
                  <Card
                    key={stat.label}
                    className="px-4 py-3 border-none bg-secondary shadow-none gap-0"
                  >
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}




