import dayjs from "dayjs";

const holidays = [
  "2023/4/29",
  "2023/4/30",
  "2023/5/1",
  "2023/5/2",
  "2023/5/3",
  "2023/6/22",
  "2023/6/23",
  "2023/6/24",
  "2023/9/29",
  "2023/9/30",
  "2023/10/1",
  "2023/10/2",
  "2023/10/3",
  "2023/10/4",
  "2023/10/5",
  "2023/10/6",
];
const tiaoxius = [
  "2023/4/23",
  "2023/5/6",
  "2023/6/25",
  "2023/10/7",
  "2023/10/8",
];

export function isHoliday(day: string) {
  let d = dayjs(day, "M/D");
  let dStr = d.format("YYYY/M/D");
  if (holidays.find((v) => v == dStr)) {
    return true;
  } else if (tiaoxius.find((v) => v == dStr)) {
    return false;
  } else if (d.day() === 0 || d.day() === 6) {
    return true;
  } else {
    return false;
  }
}
