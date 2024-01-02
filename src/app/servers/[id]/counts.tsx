"use client";

import type { Server } from "@/utils/api";
import { graphOptions } from "@/utils/graph-options";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Odometer from "react-odometerjs";

export default function Counts({ server }: { server: Server }) {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    async function updateCount() {
      const data: Server = await fetch(
        `https://api.countify.fun/servers/${server.id}`,
      ).then((res) => res.json());
      setCount(data.count);

      if (chartRef.current?.chart.series[0].points.length === 3600)
        chartRef.current?.chart.series[0].data[0].remove();
      chartRef.current?.chart.series[0].addPoint([Date.now(), data.count]);
    }

    const interval = setInterval(updateCount, 2000);
    return () => clearInterval(interval);
  }, [server.id]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col gap-3 p-6">
      <div className="rounded-lg bg-neutral-900 p-4">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
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
            <p className="text-sm text-neutral-500">{server.id}</p>
          </div>
        </div>
        <Odometer
          value={count}
          className="mt-1 w-full text-center font-roboto text-5xl !leading-[1.1em] sm:text-6xl md:text-7xl"
        />
      </div>
      <Link
        href={`/servers/${server.id}/leaderboard`}
        className="rounded-lg bg-neutral-900 p-4 text-center transition-all hover:text-yellow-300 hover:opacity-75"
      >
        View Leaderboard
      </Link>
      <div className="rounded-lg bg-neutral-900 p-4 py-8">
        <HighchartsReact
          highcharts={Highcharts}
          options={graphOptions(server.name)}
          ref={chartRef}
        />
      </div>
    </div>
  );
}
