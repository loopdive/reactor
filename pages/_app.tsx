import "../styles/globals.css";
import { FC } from "react";
import { AppProps } from "next/app";

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
