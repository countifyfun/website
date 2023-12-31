import { Server } from "@/types/server";
import { User } from "@/types/user";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const sorts = ["counts", "fails", "cf_ratio"] as const;
type Sort = (typeof sorts)[number];
const sortNames = {
  counts: "Counts",
  fails: "Fails",
  cf_ratio: "C/F Ratio",
};

const cfRatio = (counts: number, fails: number) =>
  parseInt(((counts / (counts + fails)) * 100).toFixed(2));

export const revalidate = 60;

export default async function Leaderboard({
  params,
  searchParams,
}: {
  params: Record<"id", string>;
  searchParams: Record<"sort", string | string[] | undefined>;
}) {
  const sort: Sort =
    ((typeof searchParams.sort === "object"
      ? searchParams.sort[0]
      : searchParams.sort) as Sort) ?? "cf_ratio";

  const res = await fetch(`https://api.countify.fun/servers/${params.id}`);
  const data: Server = await res.json();
  if (res.status === 404 || !data) return notFound();

  const users: User[] = await fetch(
    `https://api.countify.fun/servers/${params.id}/users?sort=${sort}`,
  ).then((res) => res.json());

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col gap-2 p-6">
      <div className="flex items-center justify-between">
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
        <div className="text-right">
          <p className="text-sm text-neutral-500">Sort by</p>
          <div className="flex items-center gap-2">
            {sorts.map((s) => (
              <Link
                key={s}
                href={`?sort=${s}`}
                className={clsx(
                  "text-md font-medium transition-all",
                  s === sort ? "text-yellow-300" : "hover:text-yellow-300",
                )}
              >
                {sortNames[s]}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {users.map((user, index) => (
          <li
            key={user.id}
            className="flex items-center justify-between rounded-lg bg-neutral-900 p-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <p className="text-neutral-500">#{index + 1}</p>
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-0.5 text-center">
                <h1 className="text-2xl font-bold tracking-tighter">
                  {user.name}
                </h1>
                <p className="text-sm text-neutral-500">{user.username}</p>
              </div>
            </div>
            <p>
              {sort === "counts"
                ? user.counts
                : sort === "fails"
                  ? user.fails
                  : `${cfRatio(user.counts, user.fails)}%`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
