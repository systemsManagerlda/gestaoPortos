"use client";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import NavbarPortuario from "@/components/navBar/NavbarPortuario";
import CompanyForm from "@/components/management/CompanyForm";
import Layout from "@/components/layout/Layout";
import CompanyList from "@/components/management/CompanyList";
import { Button } from "@nextui-org/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegistrationSystem() {
  const [showForm, setShowForm] = useState(true);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />

        <NavbarPortuario activeTab="companies" />

        <main className="flex-1 p-6">
          {/* Botão de alternância */}
          <div className="flex justify-end mb-4">
            <Button
              variant="flat"
              color="primary"
              onPress={() => setShowForm(!showForm)}
              startContent={showForm ? <FiEyeOff /> : <FiEye />}
            >
              {showForm ? "Ver Tabela" : "Ver Formulário"}
            </Button>
          </div>

          {/* Condicional de exibição */}
          {showForm ? <CompanyForm /> : <CompanyList />}
        </main>
      </div>
    </Layout>
  );
}
