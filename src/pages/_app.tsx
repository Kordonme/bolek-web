// src/pages/_app.tsx
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import { DefaultLayout } from "@layouts/default-layout";
import TimeAgo from "javascript-time-ago";
import { NextPage } from "next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import { ReactNode } from "react";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

import da from "javascript-time-ago/locale/da";

TimeAgo.addDefaultLocale(da);
TimeAgo.addLocale(da);

export type Page<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props<T> = AppProps<T> & {
  Component: Page;
};

const MyApp = (({
  Component,
  pageProps: { session, ...pageProps },
}: Props<{ session: Session | null }>) => {
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
