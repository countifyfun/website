import { Server } from "@/types/server";
import { notFound } from "next/navigation";
import Counts from "./counts";

export default async function Server({
  params,
}: {
  params: Record<"id", string>;
}) {
  const res = await fetch(`https://api.countify.fun/servers/${params.id}`);
  const data: Server = await res.json();
  if (res.status === 404 || !data) return notFound();

  return <Counts server={data} />;
}
