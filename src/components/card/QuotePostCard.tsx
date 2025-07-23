import type { QuotePost } from "../../types/post.ts";
import { Quote } from "lucide-react";

type QuotePostCardProps = {
  post: QuotePost;
  className?: string;
};

const QuotePostCard = ({ post, className }: QuotePostCardProps) => {
  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-cyan-100">
          <Quote className="size-3 text-black-400" />
        </div>
        <span className="text-xs font-medium text-cyan-100">Quote</span>
      </div>

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
