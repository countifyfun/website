import { getServersForCurrentUser } from "@/utils/api";
import { ArrowRight, Plus } from "lucide-react";
import { Metadata } from "next";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage settings for a server directly in the Countify website!",
};

export default async function Dashboard() {
  const token = await getToken({
    req: {
      headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value]),
      ),
    } as any,
  });
  if (!token) return redirect("/");
  const data = await getServersForCurrentUser(token.access_token as string);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[90rem] flex-col gap-2 p-6">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-5xl font-bold tracking-tighter">Dashboard</h1>
        <p className="max-w-2xl text-neutral-400 [text-wrap:pretty]">
          Select a server from this list to manage its settings! Keep in mind
          that this page only shows servers that you have the{" "}
          <b>Manage Server</b> permission for.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {data.map((server) => (
          <li
            key={server.id}
            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-neutral-900 p-4 text-center"
          >
            {server.icon ? (
              <Image
                src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}`}
                alt={server.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-300 text-center text-3xl font-bold text-black">
                {server.name.at(0)}
              </div>
            )}
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter">
                {server.name}
              </h1>
              {server.botInGuild ? (
                <Link
                  href={`/dashboard/${server.id}`}
                  className="flex items-center gap-1 rounded-lg bg-yellow-300 px-2.5 py-1 text-sm font-medium text-black transition-all hover:opacity-75"
                >
                  Go to dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                // TODO(ux): redirect back to dashboard after authorizing
                <Link
                  href={`https://discord.com/api/oauth2/authorize?client_id=1190299944062570627&permissions=26640&scope=bot%20applications.commands&guild_id=${server.id}&disable_guild_select=true`}
                  className="flex items-center gap-1 rounded-lg bg-neutral-700/60 px-2.5 py-1 text-sm font-medium transition-all hover:opacity-75"
                >
                  Add to server <Plus className="h-4 w-4" />
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
