// import '@/styles/globals.css'
import type { AppProps } from "next/app";
import * as dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入本地化语言
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { store } from "../store";

dayjs.locale("zh-cn"); // 使用本地化语言

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
