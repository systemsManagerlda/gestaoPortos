// app/registration-system/page.tsx
"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
// import DriverForm from "../drivers/page";
// import WarehouseForm from "../warehouses/page";
import NavbarPortuario from "@/components/navBar/NavbarPortuario";
import CompanyForm from "@/components/management/CompanyForm";

export default function RegistrationSystem() {
  // const router = useRouter();
  // const [activeTab, setActiveTab] = useState<string>("companies");

  // const handleTabChange = (key: string) => {
  //   setActiveTab(key);
  //   router.push(`/${key}`);
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      
     <NavbarPortuario activeTab="drivers" />

      <main className="flex-1 p-6">
        <CompanyForm />
        {/* {activeTab === "companies" && <CompanyForm />}
        {activeTab === "drivers" && <DriverForm />}
        {activeTab === "warehouses" && <WarehouseForm />} */}
      </main>
    </div>
  );
}