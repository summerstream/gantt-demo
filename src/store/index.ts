import { configureStore, createSlice } from "@reduxjs/toolkit";
import { formatGanttConfig, ganttConfig } from "../pages/gantt/ganttConfig";

const ganttConfigSlice = createSlice({
  name: "ganttConfig",
  initialState: ganttConfig,
  reducers: {
    changeTaskTime(state, action) {
      const { task, project, start, end } = action.payload;
      // console.info("payload", action.payload);
      const p = state.projects.find(
        (p) => p.name === project.name && p.owner == project.owner
      );
      const t = p?.tasks?.find((t) => t.name === task.name);
      if (t) {
        t.start = start;
        t.end = end;
      }
    },
    importConfig(state, action) {
      // console.info("importConfig action", action.payload);
      let str = action.payload;
      try {
        let c = JSON.parse(str);
        return formatGanttConfig(c);
      } catch (e) {
        console.error(e);
      }
    },
  },
});

export const store = configureStore({
  reducer: {
    ganttConfig: ganttConfigSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const { changeTaskTime, importConfig } = ganttConfigSlice.actions;
