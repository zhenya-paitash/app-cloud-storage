import { GetServerSidePropsContext } from "next";

import Api, { FileItem, FileType } from "@api";
import { DashboardLayout, Layout } from '@layouts'
import { checkAuth } from "@utils";
import { NextPageWithLayout } from "@pages/_app";
import { Files } from "@modules";

interface Props {
  items: FileItem[]
}

const DashboardPhotosPage: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
}

DashboardPhotosPage.getLayout = (page: React.ReactElement) => <Layout title="Dashboard | Photos">{page}</Layout>

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) return authProps;

  try {
    const items = await Api.files.getAll(FileType.PHOTOS);
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

export default DashboardPhotosPage;
