import { useForm } from "react-hook-form"
import { useState } from "react"
import { createDriver } from "../../utils/api"

export default function DriverForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const [serverError, setServerError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const onSubmit = async (data) => {
    setServerError(null)
    setSuccessMsg(null)
    try {
      await createDriver(data)
      setSuccessMsg("Motorista criado com sucesso!")
      reset()
    } catch {
      setServerError("Erro ao criar motorista, tente novamente.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cadastrar Motorista</h2>

      {serverError && <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{serverError}</p>}
      {successMsg && <p className="bg-green-100 text-green-700 p-2 mb-4 rounded">{successMsg}</p>}

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-semibold">Nome</label>
        <input
          id="name"
          {...register("name", { required: "Nome é obrigatório" })}
          className={`w-full border p-2 rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
          placeholder="Nome do motorista"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="license" className="block mb-1 font-semibold">Número da Carteira</label>
        <input
          id="license"
          {...register("license", { required: "Número da carteira é obrigatório" })}
          className={`w-full border p-2 rounded ${errors.license ? "border-red-500" : "border-gray-300"}`}
          placeholder="Exemplo: ABC1234"
        />
        {errors.license && <p className="text-red-500 text-sm mt-1">{errors.license.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Salvando..." : "Salvar"}
      </button>
    </form>
  )
}
