import type { TextPost } from "../../types/post.ts";
import { FileText } from "lucide-react";

type TextPostCardProps = {
  post: TextPost;
  className?: string;
};

const TextPostCard = ({ post, className }: TextPostCardProps) => {
  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-teal-100">
          <FileText className="size-3 text-black-400" />
        </div>
        <span className="text-xs font-medium text-teal-100">Text Post</span>
      </div>

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
