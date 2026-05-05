import type { CsvColumnsData } from "../types/types.ts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { ActivityStats } from "../types/admin.ts";

export function exportDataToXLSX<T extends object>(
  data: T[],
  columns: CsvColumnsData[],
  filename: string = "exported_data.xlsx",
) {
  const exportableData = columns
    ? data.map((row) => {
        const objectData: Record<string, unknown> = {};
        columns.forEach((column) => {
          const keys = column.key.split(".");
          let value: unknown = row;

          for (const key of keys) {
            value = (value as Record<string, unknown>)?.[key];
            if (value === undefined) break;
          }

          objectData[column.label] = value;
        });

        return objectData;
      })
    : data;

  const workSheet = XLSX.utils.json_to_sheet(exportableData);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "DATA");

  const excelBuffer = XLSX.write(workBook, {
    bookType: "xlsx",
    type: "array",
  });

  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(dataBlob, filename);
}

export const mapActivityToCsv = (activities: ActivityStats[]) =>
  activities.map((a) => ({
    ...a,
    timestamp: new Date(a.timestamp).toLocaleString(),
    actionType: a.actionType.toLowerCase(),
    targetType: a.targetType.toLowerCase(),
  }));
