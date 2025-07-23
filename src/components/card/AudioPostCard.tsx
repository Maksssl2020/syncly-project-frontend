import { Music } from "lucide-react";
import type { AudioPost } from "../../types/post.ts";

type AudioPostCardProps = {
  post: AudioPost;
  className?: string;
};

const AudioPostCard = ({ post, className }: AudioPostCardProps) => {
  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-teal-100">
          <Music className="size-3 text-black-400" />
        </div>
        <span className="text-xs font-medium text-teal-100">Music</span>
      </div>

      <div className="p-4 rounded-lg border-2 bg-black-300 border-gray-600">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-teal-100">
            <Music className="size-8 text-black-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white-100">
              {post.songTitle || "Unknown Song"}
            </h3>
            <p className={"text-gray-400"}>{post.artist || "Unknown Artist"}</p>
          </div>
        </div>

        <audio
          src={post.audioUrl}
          controls
          className="w-full h-[50px] object-cover rounded-full border border-gray-700"
        />
      </div>

      {post.yourThoughts && (
        <div className="text-base text-white-100">{post.yourThoughts}</div>
      )}
    </div>
  );
};

export default AudioPostCard;
