import type { VideoPost } from "../../types/post.ts";
import { useState } from "react";
import { Video } from "lucide-react";
import { extractYoutubeId } from "../../utils/youtube.ts";

type VideoPostCardProps = {
  post: VideoPost;
  className?: string;
};

const VideoPostCard = ({ post, className }: VideoPostCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-cyan-200)" }}
        >
          <Video
            className="size-3"
            style={{ color: "var(--color-black-400)" }}
          />
        </div>
        <span
          className="text-xs font-medium"
          style={{ color: "var(--color-cyan-200)" }}
        >
          Video Post
        </span>
      </div>

      {post.description && (
        <p className="text-lg" style={{ color: "var(--color-white-100)" }}>
          {post.description}
        </p>
      )}

      <div className="relative">
        <div
          className="aspect-video rounded-lg overflow-hidden relative group cursor-pointer"
          style={{ backgroundColor: "var(--color-black-100)" }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {post.videoUrls.map((url) =>
            url.includes("youtube.com") || url.includes("youtu.be") ? (
              <iframe
                src={`https://www.youtube.com/embed/${extractYoutubeId(url)}`}
                className="w-full aspect-video rounded-lg border border-gray-700"
                allowFullScreen
              />
            ) : (
              <video
                src={url}
                controls
                className="w-full h-auto object-cover rounded-lg border border-gray-700"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPostCard;
