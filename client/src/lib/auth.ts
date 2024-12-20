import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: "http://localhost:5000",
});

export const {
  useSession,
  signIn,
  signOut,
  signUp,
  changePassword,
  deleteUser,
} = authClient;
