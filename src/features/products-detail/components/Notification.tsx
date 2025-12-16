import { useEffect } from "react";
import { Check, Heart, X } from "lucide-react";

interface NotificationProps {
  message: string;
  type: "success" | "wishlist" | "error";
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <Check className="w-5 h-5" />,
    wishlist: <Heart className="w-5 h-5 fill-current" />,
    error: <X className="w-5 h-5" />,
  };

  const colors = {
    success: "bg-green-500",
    wishlist: "bg-red-500",
    error: "bg-red-600",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px] max-w-md`}
      >
        <div className="shrink-0">{icons[type]}</div>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 hover:bg-white/20 rounded-full p-1 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
