import { Server } from "@/types/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Counts from "./counts";

export const generateMetadata = async ({
  params,
}: {
  params: Record<"id", string>;
}): Promise<Metadata> => {
  const res = await fetch(`https://api.countify.fun/servers/${params.id}`);
  const data: Server = await res.json();

  return {
    title: `${data.name} Statistics`,
    description: `View statistics for ${data.name} directly in Countify!`,
  };
};

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
