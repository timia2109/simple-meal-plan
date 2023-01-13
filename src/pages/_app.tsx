import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import { appWithTranslation } from "next-i18next";
import i18nConfig from "../../next-i18next.config";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(appWithTranslation(MyApp, i18nConfig));
