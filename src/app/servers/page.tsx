import { Server } from "@/types/server";
import Image from "next/image";
import Link from "next/link";

export default async function Servers() {
  const res = await fetch("https://api.countify.fun/servers");
  const data: Server[] = await res.json();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[90rem] flex-col gap-2 p-6">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-5xl font-bold tracking-tighter">Servers</h1>
        <p className="max-w-md text-neutral-400 [text-wrap:pretty]">
          Counting channels powered by Countify. Click on the server to view its
          count and watch it update live!
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {data.map((server, index) => (
          <Link
            key={server.id}
            href={`/servers/${server.id}`}
            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-neutral-900 p-4 text-center transition-all hover:bg-neutral-800"
          >
            {server.avatar ? (
              <Image
                src={server.avatar}
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
            <div className="flex flex-col items-center justify-center gap-0.5 text-center">
              <h1 className="text-3xl font-bold tracking-tighter">
                {server.name}
              </h1>
              <p className="text-sm text-neutral-500">Rank #{index + 1} • {server.id}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
