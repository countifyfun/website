import { getServerAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Dashboard({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();
  if (!session?.user) return redirect("/");

  return <>{children}</>;
}
