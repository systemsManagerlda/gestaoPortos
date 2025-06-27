"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers, FiTruck, FiFileText, FiSettings, FiLogOut } from "react-icons/fi";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: <FiHome size={18} /> },
  { label: "Gestão", href: "/gestao", icon: <FiUsers size={18} /> },
  { label: "Monitoramento", href: "/monitoring", icon: <FiTruck size={18} /> },
  { label: "Relatórios", href: "/relatorios", icon: <FiFileText size={18} /> },
];

export default function DashboardSidebar({ isCollapsed }: { isCollapsed?: boolean }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <aside className={`h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Cabeçalho */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
        {isCollapsed ? (
          <FiTruck size={24} className="text-blue-600 dark:text-blue-400" />
        ) : (
          <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <FiTruck size={20} />
            <span>Logística Portuária</span>
          </h1>
        )}
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
              isActive(href)
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span className={`flex-shrink-0 ${isActive(href) ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
              {icon}
            </span>
            {!isCollapsed && <span className="text-sm truncate">{label}</span>}
          </Link>
        ))}
      </nav>

      <Divider className="dark:bg-gray-700" />

      {/* Rodapé do Sidebar */}
      <div className="p-2 space-y-1">
        <Link
          href="/settings"
          className={`flex items-center gap-3 p-2 rounded-lg ${
            isActive("/settings")
              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <FiSettings size={18} />
          {!isCollapsed && "Configurações"}
        </Link>
        
        <button className="flex items-center gap-3 p-2 rounded-lg w-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FiLogOut size={18} />
          {!isCollapsed && "Sair"}
        </button>

        {/* Perfil do Usuário */}
        {!isCollapsed && (
          <div className="flex items-center gap-2 p-2 mt-2">
            <Avatar
              isBordered
              size="sm"
              src="https://i.pravatar.cc/150?img=5"
              className="w-8 h-8 border-blue-500"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate dark:text-white">Usuário Admin</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@portos.com</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}