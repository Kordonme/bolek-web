import { PageHeader } from "@components/page-header";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Indstillinger</title>
      </Head>

      <PageHeader title="Indstillinger" />
    </div>
  );
};

export default Home;
