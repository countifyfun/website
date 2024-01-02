"use client";

import clsx from "clsx";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function NavbarLinks() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/servers"
        className={clsx(
          "p-2 text-sm font-medium transition-all",
          pathname.startsWith("/servers")
            ? "text-yellow-300"
            : "hover:text-yellow-300",
        )}
      >
        Servers
      </Link>
      <Link
        href="https://docs.countify.fun"
        className="p-2 text-sm font-medium transition-all hover:text-yellow-300"
      >
        Docs
      </Link>
    </>
  );
}

export function SignInButton() {
  return (
    <button
      onClick={() => signIn("discord")}
      className="rounded-lg bg-yellow-300 px-2.5 py-1 text-sm font-medium text-black transition-all hover:opacity-75"
    >
      Login
    </button>
  );
}

export function AuthDropdown({ user }: { user: Session["user"] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user.image!}
          alt={user.id}
          width={30}
          height={30}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <h1>{user.name ?? user.username}</h1>
          <p className="text-xs font-normal text-neutral-500">
            @{user.username}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 rounded-lg hover:cursor-pointer"
          >
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-1 rounded-lg hover:cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
