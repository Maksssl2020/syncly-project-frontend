import type { TextPost } from "../../types/post.ts";

type TextPostCardProps = {
  post: TextPost;
  className?: string;
};

const TextPostCard = ({ post, className }: TextPostCardProps) => {
  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {post.title && (
        <h2 className="text-2xl font-bold leading-tight text-white-100">
          {post.title}
        </h2>
      )}

      <div
        className="text-lg leading-relaxed text-white-100"
        dangerouslySetInnerHTML={{
          __html: post.content?.replace(/\n/g, "<br>"),
        }}
      />
    </div>
  );
};

export default TextPostCard;
