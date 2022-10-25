import { Card } from "@components/card/card";
import { Button } from "@components/form/button";
import { Input } from "@components/form/input";
import { Page } from "@components/page";
import type { NextPage } from "next";
import Head from "next/head";

const HomesPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Ny husstand</title>
      </Head>

      <Page title="Ny husstand">
        <Card>
          <div className="space-y-4">
            <Input label="Adresse" />
            <Button type="submit">Gem</Button>
          </div>
        </Card>
      </Page>
    </div>
  );
};

export default HomesPage;
