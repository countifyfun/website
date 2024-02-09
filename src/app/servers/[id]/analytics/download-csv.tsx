"use client";

import { Download } from "lucide-react";

export default function DownloadCsv({ csv }: { csv: string }) {
  function downloadCsv() {
    const hiddenElement = window.document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "data.csv";
    hiddenElement.click();
  }

  return (
    <button
      className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 font-medium text-white transition-all hover:opacity-75"
      onClick={downloadCsv}
    >
      <Download className="h-5 w-5" /> Download data as CSV
    </button>
  );
}
