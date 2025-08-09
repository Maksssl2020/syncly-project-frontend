import type { QuotePost } from "../../types/post.ts";
import { Quote } from "lucide-react";

type QuotePostCardProps = {
  post: QuotePost;
  className?: string;
};

const QuotePostCard = ({ post, className }: QuotePostCardProps) => {
  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="relative p-6 rounded-lg border-l-4 bg-black-300 border-cyan-100">
        <Quote className="absolute top-4 left-4 size-8 opacity-20 text-cyan-100" />
        <blockquote className="text-xl italic leading-relaxed pl-8 text-white-100">
          "{post.quote}"
        </blockquote>
        {post.source && (
          <cite className="block mt-4 text-right text-sm not-italic text-gray-400">
            — {post.source}
          </cite>
        )}
      </div>
    </div>
  );
};

export default QuotePostCard;
