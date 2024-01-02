import { getServer } from "@/utils/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Counts from "./counts";

export const generateMetadata = async ({
  params,
}: {
  params: Record<"id", string>;
}): Promise<Metadata> => {
  const data = await getServer(params.id);

  return {
    title: `${data?.name} Statistics`,
    description: `View statistics for ${data?.name} directly in Countify!`,
  };
};

export default async function Server({
  params,
}: {
  params: Record<"id", string>;
}) {
  const data = await getServer(params.id);
  if (!data) return notFound();

  return <Counts server={data} />;
}
