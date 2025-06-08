type AvatarProps = {
  size?: string;
};

const Avatar = ({ size = "size-14" }: AvatarProps) => {
  return (
    <div
      className={`rounded-full bg-black-100 border-2 border-gray-600 ${size}`}
    ></div>
  );
};

export default Avatar;
