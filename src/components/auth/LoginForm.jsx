import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

export default function LoginForm() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })
    if (!res.error) router.push("/dashboard")
    else alert("Login failed!")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("email")} type="email" placeholder="Email" className="border p-2 w-full" />
      <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">Entrar</button>
    </form>
  )
}
