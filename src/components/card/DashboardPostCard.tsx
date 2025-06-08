import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";

type DashboardPostCardProps = {
  isSavedPost?: boolean;
};

const DashboardPostCard = ({ isSavedPost = false }: DashboardPostCardProps) => {
  const tags = ["nature", "art", "photography"];

  return (
    <div
      className={
        "w-full h-auto p-5 flex-col gap-4 flex border-2 border-gray-600 rounded-lg bg-black-200"
      }
    >
      <header className={"w-full h-auto flex gap-4 items-center"}>
        <Avatar />
        <div className={"flex flex-col gap-1 text-white-100"}>
          <h3 className={"text-xl font-semibold"}>Anna Kowalska</h3>
          <div className={"flex gap-1 text-gray-400"}>
            <p className={"text-base"}>@anna_k</p>
            <p>•</p>
            <p className={"text-base"}>2 hours ago</p>
          </div>
        </div>
        <div className={"ml-auto flex gap-2"}>
          <AnimatedButton
            className={"p-2 h-fit rounded-lg border-2"}
            bgColor={"#222222"}
            bgColorHover={"#393939"}
            borderColor={"#222222"}
            borderColorHover={"#393939"}
            textColorHover={"#14b8a6"}
          >
            <MoreHorizontal className={"size-4"} />
          </AnimatedButton>

          {isSavedPost && (
            <AnimatedButton
              className={"p-2 h-fit rounded-lg border-2"}
              bgColor={"#222222"}
              bgColorHover={"#14b8a6"}
              textColor={"#14b8a6"}
              textColorHover={"#222222"}
              borderColor={"#14b8a6"}
            >
              <Bookmark className={"size-4"} />
            </AnimatedButton>
          )}
        </div>
      </header>
      <div className={"w-full h-auto flex flex-col gap-6"}>
        <textarea
          className={
            "text-white-100 text-xl w-full h-auto resize-none outline-none"
          }
        >
          Właśnie skończyłam nowy obraz! 🎨 Inspiracją były kolory jesieni w
          moim ogrodzie. Co myślicie?
        </textarea>
        <img
          src={"./placeholder.svg"}
          alt={"test"}
          className={
            "w-full h-auto object-cover bg-black-100 rounded-lg border-2 border-gray-600 outline-none overflow-hidden"
          }
        />
      </div>

      <div className={"flex flex-wrap gap-1"}>
        {tags.map((tag) => (
          <span
            key={tag}
            className={
              "text-sm px-2 py-1 rounded-full bg-teal-100 cursor-pointer text-black-100"
            }
          >
            #{tag}
          </span>
        ))}
      </div>

      <footer
        className={
          "w-full h-[75px] border-t-2 border-gray-600  flex items-center justify-between"
        }
      >
        <div className={"w-auto flex items-center gap-4"}>
          <AnimatedButton
            bgColor={"#222222"}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            bgColorHover={"#4D3232"}
            borderColor={"#222222"}
            borderColorHover={"#4D3232"}
            className={
              "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
            }
          >
            <Heart className={"size-4"} />
            122
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            bgColorHover={"#22454B"}
            borderColor={"#222222"}
            borderColorHover={"#22454B"}
            className={
              "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
            }
          >
            <MessageCircle className={"size-4"} />
            122
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            borderColor={"#222222"}
            borderColorHover={"#244541"}
            bgColorHover={"#244541"}
            className={
              "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
            }
          >
            <Share2 className={"size-4"} />
            122
          </AnimatedButton>
        </div>
        <AnimatedButton
          bgColor={"#222222"}
          bgColorHover={"#4D441F"}
          borderColor={"#222222"}
          borderColorHover={"#4D441F"}
          textColor={"#b0b0b0"}
          textColorHover={"#b0b0b0"}
          className={
            "px-4 py-3 h-fit w-auto rounded-lg flex gap-4 items-center"
          }
        >
          <Bookmark className={"size-4"} />
        </AnimatedButton>
      </footer>
    </div>
  );
};

export default DashboardPostCard;
