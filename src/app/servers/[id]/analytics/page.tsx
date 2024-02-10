import { Datapoint, getServer, getServerHistory } from "@/utils/api";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Chart from "./chart";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import DownloadCsv from "./download-csv";

export const revalidate = 60;

export const generateMetadata = async ({
  params,
}: {
  params: Record<"id", string>;
}): Promise<Metadata> => {
  const data = await getServer(params.id);

  return {
    title: `${data?.name} Analytics`,
    description: `View analytics for ${data?.name} directly in Countify!`,
  };
};

type FormattedUpdate = (Datapoint & {
  countGains: number;
})[];

export default async function Analytics({
  params,
}: {
  params: Record<"id", string>;
}) {
  const data = await getServer(params.id);
  if (!data) return notFound();

  const history = await getServerHistory(params.id);
  const updates = history.reduce((arr, data) => {
    const newData = data as FormattedUpdate[number];
    const last = arr[arr.length - 1];
    if (!last) {
      newData.countGains = 0;
    } else {
      newData.countGains = data.count - last.count;
    }
    arr.push(newData);
    return arr;
  }, [] as FormattedUpdate);

  function createCsv() {
    let csv = "Date,Count\n";
    csv += updates
      .map(
        (update) =>
          `${dayjs(update.time).format("YYYY-MM-DD HH:mm")},${update.count}`,
      )
      .join("\n");
    return csv;
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
      </div>
      {history.length ? (
        <>
          <div className="flex justify-center">
            <DownloadCsv csv={createCsv()} />
          </div>
          <table className="table-auto border-collapse overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
            <thead>
              <tr>
                <th className="border border-neutral-800 px-4 py-2 text-left tracking-tighter">
                  Date and Time
                </th>
                <th className="border border-neutral-800 px-4 py-2 text-left tracking-tighter">
                  Count{" "}
                  <span className="font-normal tracking-normal text-neutral-600">
                    (Gain)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {updates.slice(Math.max(updates.length - 24, 0)).map((d, index) => (
                <tr key={index}>
                  <td className="border border-neutral-800 px-4 py-2">
                    {dayjs(d.time).format("YYYY-MM-DD hh:mm:ss A")}
                  </td>
                  <td className="border border-neutral-800 px-4 py-2 text-left">
                    {d.count.toLocaleString()}{" "}
                    <span
                      className={cn(
                        d.countGains > 0
                          ? "text-green-400"
                          : d.countGains < 0
                            ? "text-red-400"
                            : d.countGains === 0 && "text-neutral-600",
                      )}
                    >
                      (
                      {d.countGains > 0
                        ? `+${d.countGains}`
                        : d.countGains < 0
                          ? d.countGains
                          : "-"}
                      )
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col gap-1 rounded-lg bg-neutral-900 p-4">
            <h1 className="text-center text-xl font-bold tracking-tighter">
              Hourly Count
            </h1>
            <Chart
              name={data.name}
              data={history.map((d) => [d.time, d.count])}
            />
          </div>
          <div className="flex flex-col gap-1 rounded-lg bg-neutral-900 p-4">
            <h1 className="text-center text-xl font-bold tracking-tighter">
              Hourly Gains
            </h1>
            <Chart
              name={data.name}
              data={updates.map((d) => [d.time, d.countGains])}
              gains
            />
          </div>
        </>
      ) : (
        <h1 className="text-center text-2xl font-bold tracking-tight">
          It seems this server has just been added. Check back later!
        </h1>
      )}
    </div>
  );
}
