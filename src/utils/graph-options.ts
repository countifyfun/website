import Highcharts, { Options } from "highcharts";
import colors from "tailwindcss/colors";

export const graphOptions = (
  name: string,
  options?: {
    data?: [number, number][];
    gains?: true;
  },
): Options => ({
  chart: {
    renderTo: "chart",
    type: "line",
    backgroundColor: "transparent",
    plotBorderColor: "transparent",
    animation: false,
  },
  title: {
    text: "",
  },
  xAxis: {
    type: "datetime",
    tickPixelInterval: 500,
    labels: {
      style: {
        color: "#858585",
      },
    },
    gridLineColor: "#858585",
    lineColor: "#858585",
    minorGridLineColor: "#858585",
    tickColor: "#858585",
    title: {
      style: {
        color: "#858585",
      },
    },
  },
  yAxis: {
    title: {
      text: "",
    },
    labels: {
      style: {
        color: "#858585",
      },
    },
    gridLineColor: "#858585",
    lineColor: "#858585",
    minorGridLineColor: "#858585",
    tickColor: "#858585",
  },
  credits: {
    enabled: true,
    text: "Countify",
    href: "/",
  },
  tooltip: {
    shared: true,
    formatter: function () {
      // @ts-ignore
      var index = this.points[0].series.xData.indexOf(this.x);
      // @ts-ignore
      var lastY = this.points[0].series.yData[index - 1];
      // @ts-ignore
      var dif = this.y - lastY;
      var r =
        // @ts-ignore
        Highcharts.dateFormat("%A %b %e, %H:%M:%S", new Date(this.x)) +
        '<br><span style="color:black">\u25CF </span>' +
        // @ts-ignore
        this.points[0].series.name +
        ": <b>";
      if (options?.gains) {
        // @ts-ignore
        if (this.y < 0) {
          r +=
            // @ts-ignore
            '<span style="color:#ff0000;font-weight:bold;">' +
            // @ts-ignore
            Highcharts.numberFormat(this.y, 0) +
            "</span>";
        }
        // @ts-ignore
        else if (this.y === 0) {
          // @ts-ignore
          r += Highcharts.numberFormat(this.y, 0);
        }
        // @ts-ignore
        else if (this.y > 0) {
          r +=
            // @ts-ignore
            '<span style="color:#00bb00;font-weight:bold;">+' +
            // @ts-ignore
            Highcharts.numberFormat(this.y, 0) +
            "</span>";
        }
      } else {
        r +=
          // @ts-ignore
          Highcharts.numberFormat(this.y, 0);
        if (dif < 0) {
          r +=
            '<span style="color:#ff0000;font-weight:bold;"> (' +
            Highcharts.numberFormat(dif, 0) +
            ")</span>";
        } else if (dif > 0) {
          r +=
            '<span style="color:#00bb00;font-weight:bold;"> (+' +
            Highcharts.numberFormat(dif, 0) +
            ")</span>";
        }
      }
      return r;
    },
  },
  plotOptions: {
    series: {
      threshold: null,
    },
    area: {
      fillOpacity: 0.25,
    },
  },
  series: [
    {
      showInLegend: false,
      name,
      data: options?.data ?? [],
      marker: { enabled: false },
      color: colors.yellow[300],
      lineWidth: 3,
      type: options?.data ? "area" : "line",
    },
  ],
});
