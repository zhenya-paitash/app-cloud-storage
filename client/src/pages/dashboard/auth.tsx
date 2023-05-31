import Head from "next/head";
import { Tabs } from 'antd';
import { LoginForm, RegisterForm } from '@components'
import { Layout } from '@layouts'
import { NextPageWithLayout } from "@pages/_app";

const AuthPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Auth</title>
      </Head>

      <main style={{ width: 400, margin: '50px auto' }}>
        <Tabs
          items={[
            {
              label: 'Log In',
              key: '1',
              children: <LoginForm />,
            },
            {
              label: 'Register',
              key: '2',
              children: <RegisterForm />,
            },
          ]}
        />
      </main>
    </>
  );
}

AuthPage.getLayout = (page: React.ReactElement) => <Layout title="Dashboard | Auth">{page}</Layout>

export default AuthPage;