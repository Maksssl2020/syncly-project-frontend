import { Bookmark, Heart, MessageCircle } from "lucide-react";
import AnimatedButton from "../button/AnimatedButton.tsx";

type DashboardPostGridCardProps = {
  isSavedPost?: boolean;
};

const DashboardPostGridCard = ({
  isSavedPost = false,
}: DashboardPostGridCardProps) => {
  return (
    <div className={"bg-black-200 rounded-lg"}>
      <div className="aspect-square relative bg-black-100">
        <img
          src="/placeholder.svg?height=300&width=300"
          alt="Post"
          className="w-full h-full object-cover"
        />
        {isSavedPost && (
          <AnimatedButton
            className={
              "absolute top-3 right-3 size-8 rounded-lg flex items-center justify-center border-2"
            }
            bgColor={"#222222"}
            bgColorHover={"#14b8a6"}
            textColor={"#14b8a6"}
            textColorHover={"#222222"}
            borderColor={"#14b8a6"}
          >
            <Bookmark className="size-4" />
          </AnimatedButton>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex gap-4 text-white-100">
            <div className="flex items-center gap-1">
              <Heart className="size-4" />
              <span>24</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="size-4" />
              <span>8</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm line-clamp-2 text-white-100">
          Właśnie skończyłam nowy obraz! 🎨 Inspiracją były kolory jesieni...
        </p>
        <p className="text-xs mt-2" style={{ color: "var(--color-gray-400)" }}>
          2 hours ago
        </p>
      </div>
    </div>
  );
};

export default DashboardPostGridCard;
