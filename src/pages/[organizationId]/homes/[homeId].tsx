import { Avatar } from "@components/avatar";
import { Badge } from "@components/badge";
import { Card } from "@components/card/card";
import { Page } from "@components/page";
import { SectionTitle } from "@components/section-title";
import { Posts } from "@content/home/posts/posts";
import { HomePost, HOME_POSTS } from "@data/home-posts";
import { IconInfoCircle } from "@tabler/icons";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

const HomesPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts }) => {
  const { query } = useRouter();
  const { data: home } = trpc.home.getHome.useQuery({
    currentOrganizationId: "cl9vua1d20000c3bstcp99god",
    homeId: String(query.homeId),
  });

  if (!home) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{home.address}</title>
      </Head>

      <Page title={home.address}>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle title="Beboere" />

            {!home.homeowners.length ? (
              <Card spacing={false}>
                <div className="flex items-center justify-center gap-2 p-12 text-gray-600">
                  <IconInfoCircle /> Der er ingen beboere tilknyttet husstanden
                </div>
              </Card>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {home.homeowners.map((homeowner) => {
                  return (
                    <Card key={homeowner.id}>
                      <div className="flex flex-col items-center gap-4 text-center">
                        <Avatar size="lg" name={homeowner.fullName} />
                        <div className="text-lg font-semibold">
                          {homeowner.fullName}
                        </div>
                        <Badge>Ejer</Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <SectionTitle title="Interne opslag" />

            <Posts home={home} posts={posts} />
          </div>
        </div>
      </Page>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  posts: HomePost[];
}> = async () => {
  const posts = HOME_POSTS;

  return {
    props: {
      posts,
    },
  };
};

export default HomesPage;
