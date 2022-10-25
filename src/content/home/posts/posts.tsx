import { Card } from "@components/card/card";
import { CardSpacing } from "@components/card/card-spacing";
import { HomePost } from "@data/home-posts";
import { IconInfoCircle } from "@tabler/icons";
import { GetHome } from "../../../shared/types/get-home";
import { NewPost } from "./new-post";
import { Post } from "./post";

type Props = {
  home: GetHome;
  posts: HomePost[];
};

export const Posts = ({ home, posts }: Props) => {
  return (
    <Card spacing={false}>
      <CardSpacing className="border-b bg-gray-100">
        <NewPost address={home.address} />
      </CardSpacing>

      {!posts?.length ? (
        <div className="flex items-center justify-center gap-2 p-12 text-gray-600">
          <IconInfoCircle /> Der er ikke oprettet nogle indlæg
        </div>
      ) : (
        <div className="flex flex-col">
          {posts.map((post, index) => (
            <div key={post.id}>
              {index > 0 && <hr />}
              <CardSpacing>
                <Post key={post.id} post={post} />
              </CardSpacing>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
