import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "./firebase";

export async function signInAdmin(
  email: string,
  password: string,
): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}
