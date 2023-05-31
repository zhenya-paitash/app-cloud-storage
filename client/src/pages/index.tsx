import { Layout } from "@layouts";
import { NextPageWithLayout } from "@pages/_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <h1>Home Page</h1>
  );
}

HomePage.getLayout = (page: React.ReactElement) => <Layout title="Cloud Storage">{page}</Layout>

export default HomePage;