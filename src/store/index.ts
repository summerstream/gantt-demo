import { configureStore, createSlice } from "@reduxjs/toolkit";
import { formatGanttConfig, ganttConfig } from "../pages/gantt/ganttConfig";

function init() {
  try {
    const dft = JSON.stringify(ganttConfig);
    let config =
      typeof window != undefined && localStorage.getItem("ganttConfig");
    if (!config) {
      config = dft;
      typeof window != undefined && localStorage.setItem("ganttConfig", dft);
    }
    if (config) {
      // console.info("initConfig", config);
      try {
        return JSON.parse(config);
      } catch (e) {
        console.error(e);
        return {};
      }
    }
  } catch (e) {
    console.error(e);
    return ganttConfig;
    // return {
    //   projects: [],
    // };
  }
}

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
    modifyProjectInfo(state, action) {
      const { task, project, name, owner } = action.payload;
      // console.info("payload", action.payload);
      const p = state.projects.find(
        (p) => p.name === project.name && p.owner == project.owner
      );
      if (!p) {
        return;
      }
      if (name) {
        p.name = name;
      }
      if (owner) {
        p.owner = owner;
      }
    },
    initConfig(state, action) {
      return init();
    },
  },
});

export const store = configureStore({
  reducer: {
    ganttConfig: ganttConfigSlice.reducer,
  },
});
store.subscribe(() => {
  // console.info("store.subscribe", store.getState());
  try {
    typeof window != undefined &&
      localStorage.setItem(
        "ganttConfig",
        JSON.stringify(store.getState().ganttConfig)
      );
  } catch (err) {
    console.error(err);
  }
});
export type RootState = ReturnType<typeof store.getState>;
export const { changeTaskTime, importConfig, initConfig, modifyProjectInfo } =
  ganttConfigSlice.actions;
