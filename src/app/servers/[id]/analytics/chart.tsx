"use client";

import { graphOptions } from "@/utils/graph-options";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Chart({
  name,
  data,
  gains,
}: {
  name: string;
  data: [number, number][];
  gains?: true;
}) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={graphOptions(name, { data, gains })}
    />
  );
}
