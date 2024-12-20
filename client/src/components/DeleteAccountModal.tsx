import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteUser } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const queryClient = useQueryClient();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteUser(
      {},
      {
        onSuccess: () => {
          queryClient.clear();
          onClose();
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.error.message || "Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <p className="text-sm">
            F Deleting your account is irreversible. All your data will be
            permanently deleted.
          </p>
          <DialogFooter>
            <Button variant="destructive" type="submit">
              Delete Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
