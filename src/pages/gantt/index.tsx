import { GanttConfigType, GanttTaskType } from "./ganttConfig";
import styles from "./index.module.css";
import dayjs, { Dayjs } from "dayjs";
import "../../util/excel";
import {
  Button,
  ConfigProvider,
  Divider,
  Input,
  Modal,
  Row,
  Space,
} from "antd";
import { downloadExcel } from "../../util/excel";
import { isHoliday } from "../../util/date";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import locale from "antd/locale/zh_CN";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  changeTaskTime,
  importConfig,
  initConfig,
} from "../../store";
import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

const rangePickerConfig: RangePickerProps = {
  size: "small",
  format: "M/D",
  style: { width: 140 },
  bordered: false,
  placeholder: ["", ""],
  suffixIcon: null,
};

const GanttRange = ["8/20", "10/30"];

export default function Home() {
  const dates = getDates(GanttRange);
  const ganttConfig = useSelector((state: RootState) => state.ganttConfig);
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [json, setJSON] = useState(JSON.stringify(ganttConfig, null, 2));
  const dispatch = useDispatch();
  // console.info("ganttConfig", ganttConfig);
  useEffect(() => {
    dispatch(initConfig({}));
  }, [1]);
  return (
    <ConfigProvider locale={locale}>
      <div className={styles.page}>
        <Row style={{ marginBottom: 20 }}>
          <Space>
            <Button type="primary" onClick={() => downloadExcel(ganttConfig)}>
              导出Excel
            </Button>
            <Button type="primary" onClick={() => setOpen(true)}>
              导入config
            </Button>
            <Button
              type="primary"
              onClick={() => {
                Modal.info({
                  title: "导出config",
                  width: 800,
                  content: (
                    <Input.TextArea
                      value={JSON.stringify(ganttConfig, null, 2)}
                      rows={10}
                    ></Input.TextArea>
                  ),
                });
              }}
            >
              导出config
            </Button>
          </Space>
        </Row>
        <main className={styles.main}>
          <div className={styles.left}>
            <div className={styles.row}>
              <div className={styles.metaTitle} style={{ width: 100 }}>
                owner
              </div>
              <div className={styles.metaTitle} style={{ width: 210 }}>
                project name
              </div>
              <div
                className={styles.metaTitle}
                style={{ width: 10, minWidth: 10 }}
              >
                {showEdit ? (
                  <MenuFoldOutlined onClick={() => setShowEdit(false)} />
                ) : (
                  <MenuUnfoldOutlined onClick={() => setShowEdit(true)} />
                )}
              </div>
              {showEdit && (
                <>
                  <div className={styles.metaTitle} style={{ width: 140 }}>
                    开发
                  </div>
                  <div className={styles.metaTitle} style={{ width: 140 }}>
                    联调
                  </div>
                  <div className={styles.metaTitle} style={{ width: 140 }}>
                    提测
                  </div>
                  <div className={styles.metaTitle} style={{ width: 140 }}>
                    验收
                  </div>
                  <div className={styles.metaTitle} style={{ width: 140 }}>
                    发布
                  </div>
                </>
              )}
            </div>
            {ganttConfig.projects.map((p, index) => {
              return (
                <div key={index} className={styles.row}>
                  <div className={styles.metaTitle} style={{ width: 100 }}>
                    {p.owner || ""}
                  </div>
                  <div className={styles.metaTitle} style={{ width: 210 }}>
                    {p.name || ""}
                  </div>
                  <div
                    className={styles.metaTitle}
                    style={{ width: 10, minWidth: 10 }}
                  ></div>
                  {showEdit &&
                    p.tasks?.map((t, index) => (
                      <DateRangePicker key={index} project={p} task={t} />
                    ))}
                </div>
              );
            })}
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
                    GanttRange[0],
                    t.start,
                    t.end
                  );
                  if (width) {
                    return (
                      <div
                        key={index}
                        className={[styles.label, calcStyle(t.name)].join(" ")}
                        style={{ left: left * 70, width: width * 70 }}
                      >
                        {transformType(t.name)}
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            onOk={() => {
              dispatch(importConfig(json));
              setOpen(false);
            }}
          >
            <div>
              <Input.TextArea
                rows={10}
                defaultValue={json}
                onChange={(e) => {
                  setJSON(e.target.value);
                }}
              ></Input.TextArea>
            </div>
          </Modal>
        </main>
      </div>
    </ConfigProvider>
  );
}

function DateRangePicker({
  project,
  task,
}: {
  project: GanttConfigType;
  task: GanttTaskType;
}) {
  const dispatch = useDispatch();
  let dft: [dayjs.Dayjs | null, dayjs.Dayjs | null] = [null, null];
  if (task.start && task.end) {
    dft = [dayjs(task.start, "M/D"), dayjs(task.end, "M/D").add(-1, "d")];
  }
  return (
    <RangePicker
      defaultValue={dft}
      onChange={(values, formatString) => {
        // console.info("changed:", values, project);
        const start = values?.[0]?.format("M/D");
        const end = values?.[1]?.add(1, "d").format("M/D");
        dispatch(changeTaskTime({ project, task, start, end }));
      }}
      name={task.name}
      {...rangePickerConfig}
    />
  );
}

function getDates(arr: string[]): string[] {
  const [begin, end] = arr;
  const dates: string[] = [];
  const startDate = dayjs(begin, "M/D");
  const endDate = dayjs(end, "M/D");

  if (!startDate.isValid() || !endDate.isValid()) {
    throw new Error("Invalid date format.");
  }

  let currentDate = startDate;
  while (currentDate.isBefore(endDate)) {
    // console.info(currentDate);
    dates.push(currentDate.format("M/D"));
    currentDate = currentDate.add(1, "day");
  }

  // console.info(dates);
  return dates;
}

function Dates({ dates }: { dates: string[] }) {
  return (
    <>
      {dates.map((d) => (
        <div
          key={d}
          className={[styles.column, isHoliday(d) ? styles.holiday : ""].join(
            " "
          )}
        >
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

function calcWidthAndLeft(offsetBegin: string, start?: string, end?: string) {
  if (!start || !end) {
    return {};
  }
  const offset = dayjs(offsetBegin, "M/D");
  const begin = dayjs(start, "M/D");
  const finish = dayjs(end, "M/D");
  const left = begin.diff(offset, "day");
  const width = finish.diff(begin, "day");
  // console.info(left, width);
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
