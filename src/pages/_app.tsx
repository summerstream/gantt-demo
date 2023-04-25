// import '@/styles/globals.css'
import type { AppProps } from "next/app";
import * as dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入本地化语言
import "antd/dist/reset.css";

dayjs.locale("zh-cn"); // 使用本地化语言

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
