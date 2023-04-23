import styles from "./index.module.css";
import dayjs from "dayjs";

export default function Home() {
  const dates = getDates("4/24", "6/30");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.row}>
            <div className={styles.metaTitle} style={{ width: 140 }}>
              owner
            </div>
            <div className={styles.metaTitle} style={{ width: 210 }}>
              project name
            </div>
          </div>
          {ganttConfig.projects.map((p, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.metaTitle} style={{ width: 140 }}>
                {p.owner}
              </div>
              <div className={styles.metaTitle} style={{ width: 210 }}>
                {p.name}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.right}>
          <div className={styles.row}>
            <Dates dates={dates} />
          </div>
          {ganttConfig.projects.map((p, index) => (
            <div key={index} className={styles.row}>
              <Columns dates={dates} />

              {p?.tasks?.map((t, index) => {
                const { left, width } = calcWidthAndLeft(
                  "4/24",
                  t.start,
                  t.end
                );

                return (
                  <div
                    key={index}
                    className={[styles.label, calcStyle(t.name)].join(" ")}
                    style={{ left: left * 70, width: width * 70 }}
                  >
                    {transformType(t.name)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function getDates(begin: string, end: string) {
  let dates = [];
  let d = dayjs(begin, "M/D");
  let endDay = dayjs(end, "M/D");
  for (; d.isBefore(endDay); ) {
    dates.push(d.format("M/D"));
    d = d.add(1, "day");
  }
  console.info(dates);
  return dates;
}

function Dates({ dates }: { dates: string[] }) {
  return (
    <>
      {dates.map((d) => (
        <div key={d} className={styles.column}>
          {d}
        </div>
      ))}
    </>
  );
}

function Columns({ dates }: { dates: string[] }) {
  return (
    <>
      {dates.map((d) => (
        <div key={d} className={styles.column}></div>
      ))}
    </>
  );
}

const ganttConfig = {
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
    {},
    {},
  ],
};

function calcWidthAndLeft(offsetBegin: string, start: string, end: string) {
  const offset = dayjs(offsetBegin, "M/D");
  const begin = dayjs(start, "M/D");
  const finish = dayjs(end, "M/D");
  const left = begin.diff(offset, "day");
  const width = finish.diff(begin, "day");
  console.info(left, width);
  return { left, width };
}

function calcStyle(
  type: "dev" | "integrate" | "test" | "acceptance" | "deploy"
) {
  switch (type) {
    case "dev":
      return styles.dev;
    case "integrate":
      return styles.integrate;
    case "test":
      return styles.test;
    case "acceptance":
      return styles.acceptance;
    case "deploy":
      return styles.deploy;
    default:
      return styles.dev;
  }
}

function transformType(
  type: "dev" | "integrate" | "test" | "acceptance" | "deploy"
): string {
  switch (type) {
    case "dev":
      return "开发";
    case "integrate":
      return "联调";
    case "test":
      return "测试";
    case "acceptance":
      return "验收";
    case "deploy":
      return "发布";
    default:
      return styles.dev;
  }
}