import { useAuth } from "../../context/AuthContext";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FiLogOut, FiUser, FiSettings, FiBell } from "react-icons/fi";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Olá, <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.name || "Usuário"}</span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          isIconOnly 
          variant="light" 
          className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Notificações"
        >
          <FiBell className="text-lg" />
        </Button>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full">
              <Avatar
                size="sm"
                src={user?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                className="border-2 border-blue-500 dark:border-blue-400"
                showFallback
                name={user?.name || "Usuário"}
              />
              <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name || "Usuário"}
              </span>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Menu do usuário">
            <DropdownItem 
              key="profile" 
              startContent={<FiUser className="text-lg" />}
              className="text-gray-700 dark:text-gray-300"
            >
              Meu Perfil
            </DropdownItem>
            <DropdownItem
              key="settings"
              startContent={<FiSettings className="text-lg" />}
              className="text-gray-700 dark:text-gray-300"
            >
              Configurações
            </DropdownItem>
            <DropdownItem 
              key="logout" 
              startContent={<FiLogOut className="text-lg" />}
              className="text-red-500 dark:text-red-400"
              onClick={logout}
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}