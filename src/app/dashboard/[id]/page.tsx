import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { fetchFromAPI, getServer, getServerForCurrentUser } from "@/utils/api";
import { Save } from "lucide-react";
import { Metadata } from "next";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import Form from "./form";

const cfRatio = (counts: number, fails: number) =>
  parseInt(((counts / (counts + fails)) * 100).toFixed(2));

export const generateMetadata = async ({
  params,
}: {
  params: Record<"id", string>;
}): Promise<Metadata> => {
  const data = await getServer(params.id);

  return {
    title: `${data?.name} Dashboard`,
    description: `Manage settings for ${data?.name} directly in the Countify website!`,
  };
};

export default async function Leaderboard({
  params,
}: {
  params: Record<"id", string>;
}) {
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

  const data = await getServerForCurrentUser(
    params.id,
    token.access_token as string,
  );
  if (!data) return notFound();

  async function setData(formData: FormData) {
    "use server";
    const channelId = formData.get("channelId");
    const count = parseInt(formData.get("count") as string);
    const oneByOne = formData.get("oneByOne") === "on" ? true : false;
    const resetOnFail = formData.get("resetOnFail") === "on" ? true : false;
    const noDeletion = formData.get("noDeletion") === "on" ? true : false;
    const pinMilestones = formData.get("pinMilestones") === "on" ? true : false;
    const unlisted = formData.get("visibility") === "unlisted" ? true : false;

    await fetchFromAPI(`/dashboard/servers/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token!.access_token}`,
      },
      body: JSON.stringify({
        channelId,
        count,
        oneByOne,
        resetOnFail,
        noDeletion,
        pinMilestones,
        unlisted,
      }),
      cache: "no-store",
    });
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col gap-2 p-6">
      <div className="flex items-center gap-2">
        {data.avatar ? (
          <Image
            src={data.avatar}
            alt={data.name}
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-300 text-center text-3xl font-bold text-black">
            {data.name.at(0)}
          </div>
        )}
        <div className="flex flex-col items-start justify-center gap-0.5 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">{data.name}</h1>
          <p className="text-sm text-neutral-500">{data.id}</p>
        </div>
      </div>
      <Form server={data} setData={setData} />
    </div>
  );
}
