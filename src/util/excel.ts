import { read, writeFileXLSX } from "xlsx";
import * as XLSX from "xlsx";
import { ganttConfig } from "../pages/gantt/ganttConfig";
import dayjs from "dayjs";

function transformGanttData(data: typeof ganttConfig) {
  return data.projects.map((project) => {
    let tasks = project.tasks;
    let devBegin = tasks?.find((task) => task.name === "dev")?.start;
    let devEnd = tasks?.find((task) => task.name === "dev")?.end;
    let integrateBegin = tasks?.find(
      (task) => task.name === "integrate"
    )?.start;
    let integrateEnd = tasks?.find((task) => task.name === "integrate")?.end;
    let testBegin = tasks?.find((task) => task.name === "test")?.start;
    let testEnd = tasks?.find((task) => task.name === "test")?.end;
    let acceptanceBegin = tasks?.find(
      (task) => task.name === "acceptance"
    )?.start;
    let acceptanceEnd = tasks?.find((task) => task.name === "acceptance")?.end;
    let deployBegin = tasks?.find((task) => task.name === "deploy")?.start;
    let deployEnd = tasks?.find((task) => task.name === "deploy")?.end;

    return {
      name: project.name,
      owner: project.owner,
      开发: devBegin,
      开发结束: devEnd && dayjs(devEnd, "M/D").add(-1, "day").format("M/D"),
      联调: integrateBegin,
      联调结束:
        integrateEnd && dayjs(integrateEnd, "M/D").add(-1, "day").format("M/D"),
      提测: testBegin,
      提测结束: testEnd && dayjs(testEnd, "M/D").add(-1, "day").format("M/D"),
      验收: acceptanceBegin,
      验收结束:
        acceptanceEnd &&
        dayjs(acceptanceEnd, "M/D").add(-1, "day").format("M/D"),
      发布: deployBegin,
    };
  });
}

export function downloadExcel() {
  const data = transformGanttData(ganttConfig);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "gantt.xlsx");
}
