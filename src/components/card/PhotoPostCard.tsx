import { useState } from "react";
import type { PhotoPost } from "../../types/post.ts";
import { Camera } from "lucide-react";

type PhotoPostCardProps = {
  post: PhotoPost;
  className?: string;
};

const PhotoPostCard = ({ post, className }: PhotoPostCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = post.imageUrls || [];

  return (
    <div className={`w-full flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-teal-200">
          <Camera className="size-3 text-black-400" />
        </div>
        <span className="text-xs font-medium text-teal-200">Photo Post</span>
      </div>

      {post.caption && <p className="text-lg text-white-100">{post.caption}</p>}

      {images.length > 0 && (
        <div className="relative">
          <div className="aspect-video rounded-lg overflow-hidden bg-black-100">
            <img
              src={
                images[currentImageIndex] ||
                "/placeholder.svg?height=400&width=600"
              }
              alt={`Photo ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute top-3 right-3">
              <div
                className="px-3 py-1 rounded-full text-xs font-medium text-white-100"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                }}
              >
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          )}

          {images.length > 1 && (
            <div className="flex justify-center gap-2 mt-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-teal-200" : "bg-gray-600"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoPostCard;
