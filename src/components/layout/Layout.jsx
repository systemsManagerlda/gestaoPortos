"use client";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/dashboard/Sidebar";
import { AuthGuard } from "../../components/auth/AuthGuard";
import Header from "../../components/dashboard/Header";
import { useDisclosure } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (!isMobile && isOpen) onOpenChange(false);
  }, [isMobile, isOpen, onOpenChange]);

  return (
    <AuthGuard>
      <div className="relative flex h-screen w-full bg-white dark:bg-gray-900">
        {/* Mobile Sidebar Trigger */}
        <button
          onClick={onOpen}
          className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-all hover:scale-110"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={24} />
        </button>

        {/* Sidebar */}
        <AnimatePresence>
          {(isOpen || !isMobile) && (
            <motion.div
              initial={{ x: isMobile ? -300 : 0 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed z-40 h-full ${isCollapsed ? "w-20" : "w-64"}`}
            >
              <DashboardSidebar
                isCollapsed={isCollapsed}
                onClose={() => onOpenChange(false)}
                onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        <AnimatePresence>
          {isOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => onOpenChange(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content Area - Ajustado para tocar o Sidebar */}
        <div
          className={`flex-1 flex flex-col overflow-hidden ${
            isCollapsed ? "md:ml-20" : "md:ml-64"
          }`}
        >
          <Header
            isCollapsed={isCollapsed}
            onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
          />

          <div className="flex flex-col h-full w-full">
            {/* Outras partes da página */}
            <main className="flex-1 overflow-y-auto max-w-full mb-6">
              <div className="h-full p-1">{children}</div>
            </main>
          </div>

          {/* Footer */}
          <footer className="py-4 px-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Logística Portuária v1.0.0
              </p>
              <div className="flex gap-4 mt-2 md:mt-0">
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Termos de Serviço
                </button>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Política de Privacidade
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </AuthGuard>
  );
}
