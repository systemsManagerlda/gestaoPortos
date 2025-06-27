import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  onDismiss?: () => void;
}

export function Alert({ type, message, onDismiss }: AlertProps) {
  const alertClasses = {
    success: "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-900/50 text-green-800 dark:text-green-200",
    error: "bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-900/50 text-red-800 dark:text-red-200",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-900/50 text-yellow-800 dark:text-yellow-200",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-900/50 text-blue-800 dark:text-blue-200",
  };

  const iconClasses = {
    success: "text-green-500 dark:text-green-400",
    error: "text-red-500 dark:text-red-400",
    warning: "text-yellow-500 dark:text-yellow-400",
    info: "text-blue-500 dark:text-blue-400",
  };

  const Icon = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    warning: FiAlertCircle,
    info: FiInfo,
  }[type];

  return (
    <div className={`${alertClasses[type]} border-l-4 p-4 rounded-md flex items-start`}>
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={`h-5 w-5 ${iconClasses[type]}`} />
      </div>
      <div className="ml-3 flex-1">
        <p className={`text-sm ${iconClasses[type]}`}>{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-3 -mr-1.5 -my-1.5 rounded-full p-1.5 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}