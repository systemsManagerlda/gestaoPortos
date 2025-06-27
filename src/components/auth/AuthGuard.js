"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export function AuthGuard({ children }) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    )
  }

  if (status === "authenticated") {
    return <>{children}</>
  }

  // Enquanto redireciona, não renderiza nada
  return null
}
