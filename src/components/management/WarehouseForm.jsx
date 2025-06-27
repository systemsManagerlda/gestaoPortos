import { useForm } from "react-hook-form"
import { useState } from "react"
import { createWarehouse } from "../../utils/api"

export default function WarehouseForm() {
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
      await createWarehouse(data)
      setSuccessMsg("Armazém criado com sucesso!")
      reset()
    } catch {
      setServerError("Erro ao criar armazém, tente novamente.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cadastrar Armazém</h2>

      {serverError && <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{serverError}</p>}
      {successMsg && <p className="bg-green-100 text-green-700 p-2 mb-4 rounded">{successMsg}</p>}

      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-semibold">Nome do Armazém</label>
        <input
          id="name"
          {...register("name", { required: "Nome é obrigatório" })}
          className={`w-full border p-2 rounded ${errors.name ? "border-red-500" : "border-gray-300"}`}
          placeholder="Nome do armazém"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block mb-1 font-semibold">Localização</label>
        <input
          id="location"
          {...register("location", { required: "Localização é obrigatória" })}
          className={`w-full border p-2 rounded ${errors.location ? "border-red-500" : "border-gray-300"}`}
          placeholder="Exemplo: Porto 1"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
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
