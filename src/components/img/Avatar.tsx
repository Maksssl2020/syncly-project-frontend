import type { Image } from "../../types/image.ts";

type AvatarProps = {
  size?: string;
  file?: File | undefined;
  avatar?: Image | undefined;
  className?: string;
};

const Avatar = ({
  size = "size-14",
  file,
  avatar,
  className = "border-gray-600",
}: AvatarProps) => {
  return (
    <div
      className={`rounded-full flex bg-black-100 border-2 ${className} ${size}`}
    >
      {file && (
        <img
          className={"size-full inset-0 object-cover rounded-full"}
          src={URL.createObjectURL(file)}
          alt={""}
        />
      )}
      {avatar && (
        <img
          className={"size-full inset-0 object-cover rounded-full"}
          src={`data:image/jpeg;base64,${avatar.imageData}`}
          alt={"user_avatar"}
        />
      )}
    </div>
  );
};

export default Avatar;
