import Head from "next/head";
import { Header } from "@components";
import styles from '@styles/Home.module.scss'

interface LayoutProps {
  title: string;
}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Header />
        <h1>./src/pages/layout</h1>
        <div className={styles.main}>
          {children}
        </div>
      </main>
    </>
  );
}