import { Avatar } from "@components/avatar";
import { Card } from "@components/card/card";
import { Button } from "@components/form/button";
import { Page } from "@components/page";
import { Table } from "@components/table";
import { useOrganizations } from "@contexts/organizations-provider";
import { ListHomeowners } from "@shared/types/list-homeowners";
import { IconUserPlus } from "@tabler/icons";
import { createColumnHelper } from "@tanstack/react-table";
import { trpc } from "@utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";

const columnHelper = createColumnHelper<ListHomeowners>();

const columns = [
  columnHelper.accessor("fullName", {
    cell: ({ row }) => {
      const homeowner = row.original;
      return (
        <Button
          link
          href={`/homeowners/${homeowner.id}`}
          className=" !no-underline"
        >
          <div className="flex items-center gap-2">
            <Avatar size="sm" name={homeowner.fullName} />
            <span className="underline">{homeowner.fullName}</span>
          </div>
        </Button>
      );
    },
    header: "Navn",
  }),
  columnHelper.accessor("homes", {
    cell: (info) => {
      const homes = info.getValue();
      return homes.map((home) => (
        <Button key={home.id} link href={`/homes/${home.id}`}>
          {home.address}
        </Button>
      ));
    },
    header: "Husstand",
  }),
];

const HomeownersPage: NextPage = () => {
  const { organization } = useOrganizations();
  const { data: homeowners } = trpc.homeowner.listHomeowners.useQuery({
    currentOrganizationId: organization?.id!,
  });

  return (
    <div>
      <Head>
        <title>Beboere</title>
      </Head>

      <Page
        title="Beboere"
        actions={
          <Button href={`/${organization?.id}/homeowners/new`} passHref>
            <IconUserPlus size={18} /> Ny beboer
          </Button>
        }
      >
        <Card spacing={false}>
          <Table items={homeowners} columns={columns} />
        </Card>
      </Page>
    </div>
  );
};

export default HomeownersPage;
