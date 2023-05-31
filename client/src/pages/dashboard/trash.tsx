import { GetServerSidePropsContext } from "next";

import Api, { FileItem, FileType } from "@api";
import { DashboardLayout, Layout } from '@layouts'
import { checkAuth } from "@utils";
import { Files } from "@modules";
import { NextPageWithLayout } from "@pages/_app";

interface Props {
  items: FileItem[]
}

const DashboardTrashPage: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} />
    </DashboardLayout>
  );
}

DashboardTrashPage.getLayout = (page: React.ReactElement) => <Layout title="Dashboard | Trash">{page}</Layout>

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);
  if ('redirect' in authProps) return authProps;

  try {
    const items = await Api.files.getAll(FileType.TRASH);
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

export default DashboardTrashPage;
