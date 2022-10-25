import { Card } from "@components/card/card";
import { Button } from "@components/form/button";
import { Page } from "@components/page";
import { Table } from "@components/table";
import { IconHomePlus } from "@tabler/icons";
import { createColumnHelper } from "@tanstack/react-table";
import type { NextPage } from "next";
import Head from "next/head";
import { useOrganizations } from "../../../contexts/organizations-provider";
import { ListHomes } from "../../../shared/types/list-homes";
import { trpc } from "../../../utils/trpc";

const columnHelper = createColumnHelper<ListHomes>();

const columns = [
  columnHelper.accessor("address", {
    cell: ({ row }) => {
      const home = row.original;
      return (
        <Button link href={`/homes/${home.id}`}>
          {home.address}
        </Button>
      );
    },
    header: "Adresse",
  }),
  columnHelper.accessor("homeowners", {
    cell: (info) => {
      return info
        .getValue()
        .map((x) => x.fullName)
        .join(", ");
    },
    header: "Beboere",
  }),
];

const HomesPage: NextPage = () => {
  const { organization } = useOrganizations();
  const { data: homes } = trpc.home.listHomes.useQuery({
    currentOrganizationId: organization?.id!,
  });

  return (
    <div>
      <Head>
        <title>Husstande</title>
      </Head>

      <Page
        title="Husstande"
        actions={
          <Button href={`/${organization?.id}/homes/new`} passHref>
            <IconHomePlus size={18} /> Ny husstand
          </Button>
        }
      >
        <Card spacing={false}>
          <Table items={homes} columns={columns} />
        </Card>
      </Page>
    </div>
  );
};

export default HomesPage;
