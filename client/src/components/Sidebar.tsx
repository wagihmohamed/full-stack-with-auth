import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChangePasswordModal from "./ChangePasswordModal";
import { AuthModal } from "./AuthModal";
import { useSession, signOut, signIn, signUp } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "./ThemeToggle";
import { useQueryClient } from "@tanstack/react-query";
import DeleteAccountModal from "./DeleteAccountModal";

export default function Sidebar() {
  const { data, isPending } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSuccess = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    setIsAuthModalOpen(false);
    toast({
      title,
      description,
    });
  };

  const handleSignIn = async (data: { email: string; password: string }) => {
    await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      fetchOptions: {
        onSuccess: () => {
          handleSuccess({
            title: "Sign In Success",
            description: "You have successfully signed in.",
          });
        },
      },
    });
  };

  const handleSignUp = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    await signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          handleSuccess({
            title: "Sign Up Success",
            description: "You have successfully signed up.",
          });
        },
      },
    });
  };

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast({
            title: "Sign Out Success",
            description: "You have successfully signed out.",
          });
          queryClient.clear();
        },
      },
    });
  };

  return (
    <div className="w-64 h-screen bg-background p-4 flex flex-col border">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="flex flex-col gap-4 mt-4">
        {!isPending && data ? (
          <>
            <Button onClick={handleLogout}>Logout</Button>
            <Button onClick={() => setIsChangePasswordOpen(true)}>
              Change Password
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteAccountOpen(true)}
            >
              Delete Account
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsAuthModalOpen(true)}>
            Sign In / Sign Up
          </Button>
        )}
      </div>
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
      {!isPending && data ? (
        <DeleteAccountModal
          isOpen={isDeleteAccountOpen}
          onClose={() => setIsDeleteAccountOpen(false)}
        />
      ) : null}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
      <ThemeToggle />
    </div>
  );
}
