// components/NavbarPortuario.tsx
"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Tabs,
  Tab,
} from "@nextui-org/react";
import {
  FiBriefcase,
  FiTruck,
  FiPackage,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

interface NavbarPortuarioProps {
  activeTab: string;
}

export default function NavbarPortuario({ activeTab }: NavbarPortuarioProps) {
  const router = useRouter();

  const handleTabChange = (key: string) => {
    router.push(`/${key}`);
  };

  return (
    <Navbar isBordered className="bg-gray-900 text-white">
      <NavbarBrand>
        <FiBriefcase className="text-white mr-2" />
        <p className="font-bold">Sistema Portuário</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Tabs
          aria-label="Menu de cadastro"
          selectedKey={activeTab}
          onSelectionChange={(key) => handleTabChange(String(key))}
          color="primary"
          variant="light"
        >
          <Tab
            key="companies"
            title={
              <div className="flex items-center gap-2">
                <FiBriefcase />
                <span>Empresas</span>
              </div>
            }
          />
          <Tab
            key="drivers"
            title={
              <div className="flex items-center gap-2">
                <FiTruck />
                <span>Motoristas</span>
              </div>
            }
          />
          <Tab
            key="warehouses"
            title={
              <div className="flex items-center gap-2">
                <FiPackage />
                <span>Armazéns</span>
              </div>
            }
          />
        </Tabs>
      </NavbarContent>
    </Navbar>
  );
}