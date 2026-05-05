import { useState } from "react";
import type { PhotoPost } from "../../types/post.ts";
import NavigationArrows from "../arrows/NavigationArrows.tsx";
import { motion } from "framer-motion";

type PhotoPostCardProps = {
  post: PhotoPost;
  className?: string;
};

const PhotoPostCard = ({ post, className }: PhotoPostCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = post.imageUrls || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      {post.caption && <p className="text-lg text-white-100">{post.caption}</p>}

      <div className={"relative group"}>
        <div className="aspect-video rounded-lg overflow-hidden bg-black-100">
          <img
            src={
              (URL.canParse(images[currentImageIndex])
                ? images[currentImageIndex]
                : `data:JPG;base64,${images[currentImageIndex]}`) ||
              "/placeholder.svg?height=400&width=600"
            }
            alt={`Photo ${currentImageIndex + 1}`}
            className="w-auto h-full object-cover mx-auto"
          />
        </div>

        {images.length > 1 && (
          <>
            <NavigationArrows
              onPreviousClick={prevImage}
              onNextClick={nextImage}
            />

            <div className="flex justify-center gap-2 mt-3">
              {images.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  animate={{
                    backgroundColor:
                      index === currentImageIndex ? "#14b8a6" : "#4a4a4d",
                    transform:
                      index === currentImageIndex ? "scale(1.25)" : "scale(1)",
                  }}
                  className="w-2 h-2 rounded-full "
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoPostCard;
