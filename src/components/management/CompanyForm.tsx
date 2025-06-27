"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createCompany } from "../../utils/api";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Divider,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { FiSave, FiX, FiMapPin, FiBriefcase } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

type CompanyFormData = {
  name: string;
  address: string;
  phone: string;
  email: string;
  companyType: string;
  description: string;
};

export default function CompanyForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>();

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: CompanyFormData) => {
    setServerError(null);
    try {
      await toast.promise(createCompany(data), {
        loading: "Salvando empresa...",
        success: () => {
          reset();
          return "Empresa cadastrada com sucesso!";
        },
        error: "Erro ao cadastrar empresa",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const companyTypes = [
    { value: "shipping", label: "Transportadora Marítima" },
    { value: "port", label: "Operadora Portuária" },
    { value: "logistics", label: "Logística" },
    { value: "storage", label: "Armazenagem" },
    { value: "other", label: "Outro" },
  ];

  return (
    <div className="flex justify-center px-4 py-6">
      <Toaster position="top-right" />
      <Card className="w-full max-w-3xl shadow-md border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-t-md">
          <div className="flex items-center gap-3">
            <FiBriefcase className="text-blue-600 text-2xl" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Cadastrar Nova Empresa
            </h2>
          </div>
          <Button
            size="sm"
            variant="light"
            color="danger"
            startContent={<FiX />}
            onPress={() => reset()}
          >
            Limpar
          </Button>
        </CardHeader>

        <Divider className="bg-gray-200 dark:bg-gray-700" />

        <CardBody className="px-6 py-6 bg-white dark:bg-gray-900 rounded-b-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {serverError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded">
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                {...register("name", {
                  required: "Nome da empresa é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Nome deve ter pelo menos 3 caracteres",
                  },
                })}
                label=""
                placeholder="Ex: Porto Seguro S.A."
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                variant="bordered"
              />

              <Select
                {...register("companyType", {
                  required: "Tipo de empresa é obrigatório",
                })}
                label=""
                placeholder="Selecione o tipo"
                isInvalid={!!errors.companyType}
                errorMessage={errors.companyType?.message}
                variant="bordered"
                className="z-10"
              >
                {companyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                type="email"
                label=""
                placeholder="contato@empresa.com"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                variant="bordered"
              />

              <Input
                {...register("phone", {
                  required: "Telefone é obrigatório",
                  pattern: {
                    value: /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/,
                    message: "Telefone inválido",
                  },
                })}
                label=""
                placeholder="(+258) 84 123 4567"
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
                variant="bordered"
              />
            </div>

            <Textarea
              {...register("description")}
              label="Descrição"
              placeholder="Descreva brevemente a empresa (opcional)"
              variant="bordered"
              minRows={3}
            />

            <Input
              {...register("address", {
                required: "Endereço é obrigatório",
                minLength: {
                  value: 10,
                  message: "Endereço deve ser mais completo",
                },
              })}
              label=""
              placeholder="Rua, número, bairro, cidade - província"
              startContent={<FiMapPin className="text-gray-400" />}
              isInvalid={!!errors.address}
              errorMessage={errors.address?.message}
              variant="bordered"
            />

            <Divider />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="flat"
                color="default"
                onPress={() => reset()}
                startContent={<FiX />}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={isSubmitting}
                startContent={<FiSave />}
                className="font-medium"
              >
                Cadastrar Empresa
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
