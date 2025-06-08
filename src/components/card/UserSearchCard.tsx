import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Check, FileText, UserPlus, Users } from "lucide-react";

type UserSearchCardProps = {
  isFollowed: boolean;
};

const UserSearchCard = ({ isFollowed = false }: UserSearchCardProps) => {
  return (
    <div className="rounded-xl p-6 border-2 bg-black-200 border-gray-600">
      <header className={"flex items-start justify-between mb-4"}>
        <div className={"flex items-center gap-4"}>
          <Avatar />
          <div>
            <h3 className={"text-lg font-bold text-white-100"}>Marek</h3>
            <p className={"text-gray-400"}>@marek2020</p>
          </div>
        </div>
        <AnimatedButton
          className={`px-4 py-2 rounded-lg flex items-center gap-2 border-2`}
          bgColor={isFollowed ? "#14b8a6" : "#222222"}
          bgColorHover={isFollowed ? "#0d9488" : "#14b8a6"}
          textColor={isFollowed ? "#111111" : "#14b8a6"}
          textColorHover={"#111111"}
          borderColor={"#14b8a6"}
          borderColorHover={isFollowed ? "#0d9488" : "#14b8a6"}
        >
          {isFollowed ? (
            <Check className={"size-5"} />
          ) : (
            <UserPlus className={"size-5"} />
          )}
          {isFollowed ? "Followed" : "Follow"}
        </AnimatedButton>
      </header>

      <p className={"mb-4 text-white-100"}>
        📸 Professional photographer capturing life's beautiful moments. Nature
        and portrait specialist.
      </p>

      <footer className={"flex items-center gap-6"}>
        <div className={"flex items-center gap-2 text-gray-400"}>
          <FileText className={"size-5 "} />
          <span className={"text-sm"}>85437 posts</span>
        </div>
        <div className={"flex items-center gap-2 text-gray-400"}>
          <Users className={"size-5 "} />
          <span className={"text-sm"}>8543 followers</span>
        </div>
      </footer>
    </div>
  );
};

export default UserSearchCard;
