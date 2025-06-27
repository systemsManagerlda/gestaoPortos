import { useForm } from "react-hook-form"

export default function RegisterForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")} placeholder="Nome" className="border p-2 w-full" />
      <input {...register("email")} type="email" placeholder="Email" className="border p-2 w-full" />
      <input {...register("password")} type="password" placeholder="Senha" className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 w-full">Cadastrar</button>
    </form>
  )
}
