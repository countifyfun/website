"use client";

import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("discord")}
      className="flex items-center gap-1.5 rounded-lg bg-[#5865F2] px-3 py-1 text-sm font-medium transition-all hover:opacity-75"
    >
      <FaDiscord className="h-5 w-5" /> Login with Discord
    </button>
  );
}
