import React from "react";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoadingErrorPlaceholderProps {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
}

export function LoadingErrorPlaceholder({
  isLoading,
  error,
  children,
}: LoadingErrorPlaceholderProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
