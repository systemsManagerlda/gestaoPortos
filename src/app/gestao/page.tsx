import Layout from "@/components/layout/Layout"
import RegistrationSystem from "./cadastro"
// import CompanyForm from "@/components/management/CompanyForm"
// import CompanyList from "@/components/management/CompanyList"

export default function CompaniesPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* <CompanyForm />
        <hr />
        <h2 className="text-xl font-bold">Empresas cadastradas</h2>
        <CompanyList /> */}
        <RegistrationSystem />
      </div>
    </Layout>
  )
}
