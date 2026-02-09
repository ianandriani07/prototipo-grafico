"use client"

import * as React from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface LoginPageProps {
  onLogin?: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ username?: string; password?: string }>({})

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {}
    if (!username.trim()) {
      newErrors.username = "Nome de usuário é obrigatório"
    }
    if (!password.trim()) {
      newErrors.password = "Senha é obrigatória"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    onLogin?.()
  }

  return (
    <div className="relative min-h-screen w-full bg-background-2">
      {/* Mobile-first: full screen form */}
      <div className="flex min-h-screen flex-col">
        {/* Header with brand - Mobile optimized */}
        <header className="flex items-center justify-center px-6 pt-12 pb-8 lg:pt-8 ">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-third">
              <span className="text-lg font-black text-secundary-foreground">E</span>
            </div>
            <span className="text-xl font-bold text-primary-foreground">Extradigital</span>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex flex-1 flex-col lg:flex-row">
          {/* Form section - Mobile first */}
          <div className="flex flex-1 flex-col justify-center px-6 pb-12 lg:max-w-md lg:px-12">
            <div className="w-full max-w-sm mx-auto lg:max-w-none">
              {/* Welcome text */}
              <div className="mb-8 space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-primary-foreground">
                  Bem-vindo de volta
                </h1>
                <p className="text-sm text-muted-foreground">
                  Entre com suas credenciais para acessar o sistema
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-primary-foreground">
                    Usuário
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                      if (errors.username) {
                        setErrors((prev) => ({ ...prev, username: undefined }))
                      }
                    }}
                    aria-invalid={!!errors.username}
                    disabled={isLoading}
                    className={cn(
                      "h-12 bg-secondary-2 border-none text-primary-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-[#FFBE00] focus:border-[#FFBE00]",
                      errors.username && "border-destructive focus:ring-destructive"
                    )}
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-primary-foreground">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (errors.password) {
                          setErrors((prev) => ({ ...prev, password: undefined }))
                        }
                      }}
                      aria-invalid={!!errors.password}
                      disabled={isLoading}
                      className={cn(
                        "h-12 bg-secondary-2 border-border text-foreground placeholder:text-muted-foreground pr-12 focus:ring-2 focus:ring-primary focus:border-primary",
                        errors.password && "border-destructive focus:ring-destructive"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                      disabled={isLoading}
                      className="data-[state=checked]:bg-third"
                    />
                    <Label
                      htmlFor="remember"
                      className="cursor-pointer text-sm text-muted-foreground"
                    >
                      Lembrar senha
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-third transition-colors hover:text-third/80" 
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                {/* Submit button - Primary yellow CTA */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full text-base font-semibold bg-third text-background-2 hover:bg-third/90 focus:ring-2 focus:ring-third focus:ring-offset-2 focus:ring-offset-background"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>

              {/* Footer text */}
              <p className="mt-8 text-center text-xs text-muted-foreground">
                Ao entrar, você concorda com nossos{" "}
                <button type="button" className="text-third hover:underline">
                  Termos de Uso
                </button>{" "}
                e{" "}
                <button type="button" className="text-third hover:underline">
                  Política de Privacidade
                </button>
              </p>
            </div>
          </div>

          {/* Brand section - Desktop only */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-background-3 lg:p-12">
            <div className="max-w-md space-y-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-third">
                <span className="text-3xl font-black text-secondary-foreground">E</span>
              </div>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-primary-foreground">
                Sistema de Gestão de Atendimentos
              </h2>
              <p className="text-pretty text-muted-foreground">
                Gerencie seus atendimentos de forma eficiente, acompanhe métricas em tempo real
                e otimize o fluxo de trabalho do seu cartório.
              </p>
              
              {/* Stats preview */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { label: "TME", value: "18 min" },
                  { label: "TMA", value: "32 min" },
                  { label: "Hoje", value: "87" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-secondary-2 px-4 py-3"
                  >
                    <div className="text-2xl font-bold text-third">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
