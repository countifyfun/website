import { UserSort, getServer, getServerUsers, userSorts } from "@/utils/api";
import clsx from "clsx";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const sortNames = {
  counts: "Counts",
  fails: "Fails",
  cf_ratio: "C/F Ratio",
};

const cfRatio = (counts: number, fails: number) =>
  parseInt(((counts / (counts + fails)) * 100).toFixed(2));

export const generateMetadata = async ({
  params,
}: {
  params: Record<"id", string>;
}): Promise<Metadata> => {
  const data = await getServer(params.id);

  return {
    title: `${data?.name} Leaderboard`,
    description: `View the leaderboard for ${data?.name} directly in Countify!`,
  };
};

export const revalidate = 60;

export default async function Leaderboard({
  params,
  searchParams,
}: {
  params: Record<"id", string>;
  searchParams: Record<"sort" | "page", string | string[] | undefined>;
}) {
  const sort: UserSort =
    ((typeof searchParams.sort === "object"
      ? searchParams.sort[0]
      : searchParams.sort) as UserSort) ?? "cf_ratio";
  const page = parseInt(
    (typeof searchParams.page === "object"
      ? searchParams.page[0]
      : searchParams.page) ?? "1",
  );

  const data = await getServer(params.id);
  if (!data) return notFound();

  const { users, totalPages } = await getServerUsers(params.id, { sort, page });

  function createQueryString(name: string, value: string) {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set(name, value);

    return params.toString();
  }

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
            {userSorts.map((s) => (
              <Link
                key={s}
                href={`?${createQueryString("sort", s)}`}
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
      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {Array(totalPages)
            .fill("")
            .map((_, index) => (
              <Link
                key={index}
                href={`?${createQueryString("page", (index + 1).toString())}`}
                className={clsx(
                  "font-medium transition-all",
                  page === index + 1
                    ? "text-yellow-300"
                    : "hover:text-yellow-300",
                )}
              >
                {index + 1}
              </Link>
            ))}
        </div>
      ) : null}
    </div>
  );
}
