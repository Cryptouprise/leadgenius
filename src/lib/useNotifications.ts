import { useToast } from "@/components/ui/use-toast";

export const useNotifications = () => {
  const { toast } = useToast();

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "bg-green-500/10 border-green-500/20 text-green-400",
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    });
  };

  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      className: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};
