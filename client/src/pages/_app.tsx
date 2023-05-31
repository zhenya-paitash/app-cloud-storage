import type { AppProps } from "next/app";
import type { NextPage } from 'next';

import "@styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);
  // const component = getLayout(<Component {...pageProps} />)
  // return (
  //   <>
  //     <Head>
  //       <meta name="test" content="test metadata" />
  //     </Head>
  //     {component}
  //   </>
  // );
  return getLayout(<Component {...pageProps} />);
}
