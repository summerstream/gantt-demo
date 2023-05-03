const _ganttConfig: GanttConfigType = {
  projects: [
    {
      name: "project1",
      owner: "owner1",
      tasks: [
        { name: "dev", start: "04/24", end: "05/01" },
        //联调
        { name: "integrate", start: "05/01", end: "05/18" },
        { name: "test", start: "05/18", end: "05/25" },
        //验收
        { name: "acceptance", start: "05/25", end: "05/27" },
        { name: "deploy", start: "05/27", end: "05/28" },
      ],
    },
    {
      name: "project2",
      owner: "owner2",
      tasks: [
        { name: "dev", start: "04/24", end: "05/12" },
        { name: "integrate", start: "05/12", end: "05/18" },
        { name: "test", start: "05/18", end: "05/24" },
        //验收
        { name: "acceptance", start: "05/24", end: "05/29" },
        { name: "deploy", start: "05/29", end: "05/30" },
      ],
    },
    {
      name: "project3",
      owner: "owner3",
      tasks: [
        { name: "dev", start: "04/24", end: "05/01" },
        { name: "integrate", start: "05/01", end: "05/18" },
        { name: "test", start: "05/18", end: "05/25" },
        //验收
        { name: "acceptance", start: "05/25", end: "05/27" },
        { name: "deploy", start: "05/27", end: "05/28" },
      ],
    },
    {
      name: "project4",
      owner: "owner4",
      tasks: [
        { name: "dev", start: "04/24", end: "05/01" },
        { name: "integrate", start: "05/01", end: "05/18" },
        { name: "test", start: "05/18", end: "05/25" },
        //验收
        { name: "deploy", start: "05/27", end: "05/28" },
      ],
    },
    {},
    {},
  ],
};

export type GanttConfigType = {
  projects: GanttProjectType[];
};
export type GanttProjectType = {
  name?: string;
  owner?: string;
  tasks?: GanttTaskType[];
};
export type GanttTaskType = {
  name?: string;
  start?: string;
  end?: string;
  sort?: number;
};
export function formatGanttConfig(ganttConfig: GanttConfigType) {
  let projects = ganttConfig.projects;
  let taskTypes = ["dev", "integrate", "test", "acceptance", "deploy"];
  projects.forEach((p) => {
    let tasks = p.tasks || [];
    taskTypes.forEach((t, index) => {
      let task = tasks.find((v) => v.name == t);
      if (!task) {
        tasks.push({ name: t, start: "", end: "", sort: index });
      } else {
        task.sort = index;
      }
    });
    tasks.sort((a, b) => Number(a.sort) - Number(b.sort));
    p.tasks = tasks;
  });
  return ganttConfig;
}

const ganttConfig = formatGanttConfig(_ganttConfig);
export { ganttConfig };
