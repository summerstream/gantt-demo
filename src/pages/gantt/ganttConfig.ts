export const ganttConfig = {
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
      name: "project3",
      owner: "owner3",
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
