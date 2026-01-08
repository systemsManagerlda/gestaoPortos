import React, { useState } from "react";
import Image from "next/image";

interface User {
  nome?: string;
  email?: string;
}

interface Notification {
  id: number;
  title: string;
  time: string;
  unread: boolean;
  message: string;
  type: "info" | "warning" | "success" | "error";
  sender: string;
}

interface HeaderProps {
  user?: User;
  activeModule?: string;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}

function Header({ user, activeModule, onLogout, onSearch }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationSidebar, setShowNotificationSidebar] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [notificationCount, setNotificationCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Nova carga disponível",
      time: "2 min atrás",
      unread: true,
      message:
        "Uma nova carga foi disponibilizada no Mega Centro Logístico. Origem: Porto de Maputo, Destino: Centro Logístico de Matola. Peso: 18 toneladas. Valor do frete: 245.000,00 MZN. Verifique os detalhes e aceite a carga se estiver disponível.",
      type: "info",
      sender: "Sistema Mega Centro",
    },
    {
      id: 2,
      title: "Pagamento recebido",
      time: "1 hora atrás",
      unread: true,
      message:
        "O pagamento referente ao frete #MC-7845 foi processado e creditado na sua conta. Valor: 198.500,00 MZN. O montante já se encontra disponível. Para mais detalhes, aceda à área financeira do Mega Centro.",
      type: "success",
      sender: "Departamento Financeiro",
    },
    {
      id: 3,
      title: "Vistoria agendada",
      time: "3 horas atrás",
      unread: false,
      message:
        "A vistoria do camião matrícula AAZ-345-MP foi agendada para 25/11/2025 às 10:00. Local: Mega Centro Logístico de Marracuene. Traga toda a documentação obrigatória do veículo.",
      type: "info",
      sender: "Gestão de Frota",
    },
    {
      id: 4,
      title: "Manutenção do sistema",
      time: "1 dia atrás",
      unread: false,
      message:
        "O sistema do Mega Centro Logístico passará por manutenção neste sábado (18/11), das 00:00 às 04:00. Durante este período, algumas funcionalidades poderão estar temporariamente indisponíveis.",
      type: "warning",
      sender: "TI - Mega Centro",
    },
    {
      id: 5,
      title: "Novo cliente registado",
      time: "2 dias atrás",
      unread: false,
      message:
        "Foi registado um novo cliente no sistema: Transportes Nacala Lda. NUIT: 401256789. Responsável: Carlos Mussa. O cliente já se encontra habilitado para solicitar serviços logísticos no Mega Centro.",
      type: "success",
      sender: "Registo e Cadastro",
    },
  ];

  const markAllAsRead = () => {
    setNotificationCount(0);
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowNotificationSidebar(true);
    setShowNotifications(false);

    // Marcar como lida
    if (notification.unread) {
      setNotificationCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchQuery);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "success":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo e Título */}
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded-xl shadow-md">
                <Image
                  src="/image/megaCentroLogistica.png"
                  alt="Logo Mega Centro de Logística"
                  width={36}
                  height={36}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Mega Centro de Logística
                </h1>
                <p className="text-sm text-blue-100">Área Administrativa</p>
              </div>
            </div>

            {/* Barra de Pesquisa */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-blue-500 bg-blue-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 placeholder-gray-500 transition-all duration-200"
                  placeholder="Buscar módulos, relatórios..."
                  aria-label="Buscar"
                />
              </div>
            </div>

            {/* Área do Usuário e Notificações */}
            <div className="flex items-center space-x-4">
              {/* Notificações */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-full hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Notificações"
                  aria-expanded={showNotifications}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {notificationCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
                      aria-label={`${notificationCount} notificações não lidas`}
                    >
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* Dropdown de Notificações */}
                {showNotifications && (
                  <div
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                    role="dialog"
                    aria-label="Lista de notificações"
                  >
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-gray-50">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">
                          Notificações
                        </h3>
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                        >
                          Marcar todas como lidas
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {notificationCount} não lidas
                      </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            notification.unread ? "bg-blue-50" : ""
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                          role="button"
                          tabIndex={0}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            handleNotificationClick(notification)
                          }
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div
                                className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-gray-50 border-t border-gray-200">
                      <button
                        className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-2 focus:outline-none focus:underline"
                        onClick={() => setShowNotifications(false)}
                      >
                        Ver todas as notificações
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Separador */}
              <div className="h-6 w-px bg-blue-400" aria-hidden="true"></div>

              {/* Perfil do Usuário */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-white">
                    {user?.nome || user?.email?.split("@")[0]}
                  </p>
                  <p className="text-xs text-blue-100 truncate max-w-[200px]">
                    {user?.email}
                  </p>
                </div>

                <div className="relative group">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg border-2 border-white shadow-md"
                    aria-label="Avatar do usuário"
                  >
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>

                  {/* Badge de Status */}
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-800"
                    aria-label="Usuário online"
                    title="Online"
                  ></div>
                </div>

                {/* Dropdown do Usuário */}
                <div className="relative group">
                  <button
                    className="p-2 rounded-lg hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="Menu do usuário"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900 text-sm">
                        Conectado como
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center focus:outline-none focus:bg-gray-100"
                        onClick={() => setShowNotifications(false)}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Configurações
                      </button>

                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center focus:outline-none focus:bg-gray-100"
                        onClick={() => setShowNotifications(false)}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        Privacidade
                      </button>

                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center focus:outline-none focus:bg-gray-100"
                        onClick={() => setShowNotifications(false)}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Suporte
                      </button>
                    </div>

                    <div className="p-3 border-t border-gray-100">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Sair</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="pb-2">
            <nav aria-label="Navegação">
              <div className="flex items-center text-sm text-blue-200">
                <span className="hover:text-white cursor-pointer">
                  Dashboard
                </span>
                {activeModule && (
                  <>
                    <svg
                      className="w-4 h-4 mx-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className="font-medium text-white"
                      aria-current="page"
                    >
                      {activeModule}
                    </span>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Overlay para fechar notificações ao clicar fora */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu Lateral de Notificações */}
      {showNotificationSidebar && (
        <>
          <div
            className="fixed inset-0 bg-black/20 bg-opacity-50 z-50 transition-opacity"
            onClick={() => setShowNotificationSidebar(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              {/* Cabeçalho do Sidebar */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Detalhes da Notificação
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Mensagem completa
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNotificationSidebar(false)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="Fechar menu lateral"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Conteúdo da Notificação */}
              <div className="flex-1 overflow-y-auto p-6">
                {selectedNotification ? (
                  <div className="space-y-6">
                    {/* Cabeçalho da Mensagem */}
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          selectedNotification.type === "info"
                            ? "bg-blue-100"
                            : selectedNotification.type === "warning"
                            ? "bg-yellow-100"
                            : selectedNotification.type === "success"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {getNotificationIcon(selectedNotification.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {selectedNotification.title}
                        </h3>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-600">
                            {selectedNotification.time}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              selectedNotification.type === "info"
                                ? "bg-blue-100 text-blue-800"
                                : selectedNotification.type === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : selectedNotification.type === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedNotification.type === "info"
                              ? "Informação"
                              : selectedNotification.type === "warning"
                              ? "Aviso"
                              : selectedNotification.type === "success"
                              ? "Sucesso"
                              : "Erro"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remetente */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">
                        Remetente
                      </p>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {selectedNotification.sender}
                      </p>
                    </div>

                    {/* Mensagem */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                        Mensagem
                      </h4>
                      <div className="bg-gray-50 p-5 rounded-lg">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {selectedNotification.message}
                        </p>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-4">
                        Ações
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                          onClick={() => {
                            // Aqui você pode adicionar ação específica para cada tipo de notificação
                            alert(
                              "Ação executada para: " +
                                selectedNotification.title
                            );
                          }}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>Confirmar</span>
                          </div>
                        </button>
                        <button
                          className="px-4 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={() => setShowNotificationSidebar(false)}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span>Fechar</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg
                      className="w-16 h-16 text-gray-400 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      Nenhuma notificação selecionada
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Selecione uma notificação para ver os detalhes
                    </p>
                  </div>
                )}
              </div>

              {/* Rodapé do Sidebar */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2 focus:outline-none focus:underline"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Marcar todas como lidas</span>
                  </button>
                  <span className="text-xs text-gray-500">
                    {notifications.length} notificações no total
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .group:hover .group-hover\\:visible {
          animation: fadeIn 0.2s ease-out;
        }

        /* Animações para o menu lateral */
        .sidebar-enter {
          transform: translateX(100%);
        }

        .sidebar-enter-active {
          transform: translateX(0);
          transition: transform 300ms ease-in-out;
        }

        .sidebar-exit {
          transform: translateX(0);
        }

        .sidebar-exit-active {
          transform: translateX(100%);
          transition: transform 300ms ease-in-out;
        }
      `}</style>
    </>
  );
}

export default Header;
