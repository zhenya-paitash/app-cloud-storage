import { GetServerSidePropsContext } from "next";
import { Button } from "antd";
import Api, { User } from "@api";
import { checkAuth } from "@utils";
import { Layout } from "@layouts";
import { NextPageWithLayout } from "@pages/_app";

import styles from "@styles/Profile.module.scss"

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  const onClickLogout = () => {
    if (window.confirm('Are you sure?')) {
      Api.auth.logout();
      location.href = '/'
    }
  }

  return (
    <main>
      <div className={styles.root}>

        <h1>My Profile</h1>
        <br />
        <p>ID: <b>{userData.id}</b></p>
        <p>User: <b>{userData.fullName}</b></p>
        <p>Email: <b>{userData.email}</b></p>
        <br />
        <Button onClick={onClickLogout} type='primary' danger>Logout</Button>

      </div>
    </main>
  );
}

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard | Profile">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) return authProps;
  const userData = await Api.auth.getMe();
  return {
    props: { userData }
  }
}

export default DashboardProfilePage;