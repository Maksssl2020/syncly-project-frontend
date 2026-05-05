import type { VideoPost } from "../../types/post.ts";
import { useState } from "react";
import { extractYoutubeId } from "../../utils/youtube.ts";
import { AnimatePresence, motion } from "framer-motion";
import { Film, Play } from "lucide-react";
import NavigationArrows from "../arrows/NavigationArrows.tsx";

type VideoPostCardProps = {
  post: VideoPost;
};

const VideoPostCard = ({ post }: VideoPostCardProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videos = post.videoUrls || [];

  const isYoutubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setPlayingIndex(null);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setPlayingIndex(null);
  };

  const handlePlayVideo = (index: number) => {
    setPlayingIndex(index);
  };

  if (videos.length === 0) {
    return null;
  }

  const currentUrl = videos[currentVideoIndex];

  return (
    <div className="w-full flex flex-col gap-4">
      {post.description && (
        <p className="text-lg text-white-100">{post.description}</p>
      )}

      <div className="relative">
        <div className="aspect-video rounded-lg overflow-hidden relative group bg-black-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {isYoutubeUrl(currentUrl) ? (
                playingIndex === currentVideoIndex ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYoutubeId(currentUrl)}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    className="w-full h-full relative cursor-pointer"
                    onClick={() => handlePlayVideo(currentVideoIndex)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${extractYoutubeId(currentUrl)}/maxresdefault.jpg`}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://img.youtube.com/vi/${extractYoutubeId(currentUrl)}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 bg-teal-100">
                        <Play className="size-8 ml-1 text-black-400 fill-black-400" />
                      </div>
                    </div>
                  </div>
                )
              ) : playingIndex === currentVideoIndex ? (
                <video
                  src={currentUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full relative cursor-pointer flex items-center justify-center"
                  onClick={() => handlePlayVideo(currentVideoIndex)}
                >
                  <video
                    src={currentUrl}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: "var(--color-teal-100)" }}
                    >
                      <Play className="size-8 ml-1 text-black-400 fill-black-400" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {videos.length > 1 && (
            <div className="absolute top-3 right-3 z-10">
              <div className="px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 text-white-100 bg-black-100/75">
                <Film className="size-3.5" />
                {currentVideoIndex + 1} / {videos.length}
              </div>
            </div>
          )}

          {videos.length > 1 && (
            <NavigationArrows
              onNextClick={handleNextVideo}
              onPreviousClick={handlePrevVideo}
            />
          )}
        </div>

        {videos.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {videos.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentVideoIndex(index);
                  setPlayingIndex(null);
                }}
                animate={{
                  backgroundColor:
                    index === currentVideoIndex ? "#14b8a6" : "#4a4a4d",
                  transform:
                    index === currentVideoIndex ? "scale(1.25)" : "scale(1)",
                }}
                className="w-2 h-2 rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPostCard;
