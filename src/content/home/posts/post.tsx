import { Avatar } from "@components/avatar";
import { Button } from "@components/form/button";
import { Input } from "@components/form/input";
import { HomePost } from "@data/home-posts";
import { IconThumbUp } from "@tabler/icons";
import { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { PostWrapper } from "./post-wrapper";

type Props = {
  post: HomePost;
};

export const Post = ({ post }: Props) => {
  const [showReply, setShowReply] = useState(false);
  const canReply = Boolean(post.replies);

  return (
    <PostWrapper
      showLine={Boolean(post.replies)}
      avatar={<Avatar name={post.name} />}
    >
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold">{post.name}</div>
            <span className="text-xs text-gray-400">
              <ReactTimeAgo date={new Date(post.date)} />
            </span>
          </div>
          <p className="text-sm text-gray-800">{post.message}</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Button
            unstyled
            className="flex items-center gap-1 rounded-lg bg-gray-200 px-2 py-0.5 hover:bg-slate-900 hover:text-white"
          >
            <IconThumbUp size={14} /> {post.likes}
          </Button>
          {canReply && (
            <Button link onClick={() => setShowReply((prev) => !prev)}>
              {showReply ? "Annuller" : "Svar"}
            </Button>
          )}
        </div>

        {showReply && (
          <PostWrapper
            showLine={false}
            className="my-2"
            avatar={<Avatar name="Mark Jan Bonne Kordon" />}
          >
            <div className="flex flex-1 flex-col">
              <Input
                placeholder="Skriv din besked..."
                className="w-full text-sm"
                minRows={2}
                multiline
              />

              <Button size="sm" className="mt-2 self-end">
                Svar
              </Button>
            </div>
          </PostWrapper>
        )}

        {post.replies?.map((reply) => (
          <Post key={reply.id} post={reply} />
        ))}
      </div>
    </PostWrapper>
  );
};
