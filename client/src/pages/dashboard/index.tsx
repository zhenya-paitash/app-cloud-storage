import { GetServerSidePropsContext } from "next";

import Api, { FileItem } from "@api";
import { DashboardLayout, Layout } from '@layouts'
import { checkAuth } from "@utils";
import { NextPageWithLayout } from "@pages/_app";
import { Files } from "@modules";

interface Props {
  items: FileItem[]
}

const DashboardPage: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
}

DashboardPage.getLayout = (page: React.ReactElement) => <Layout title="Dashboard | Main">{page}</Layout>

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) return authProps;

  try {
    const items = await Api.files.getAll();
    return {
      props: {
        items
      }
    }
  } catch (e) {
    console.log(e);
    return {
      props: {
        items: [],
      }
    }
  }

}

export default DashboardPage;