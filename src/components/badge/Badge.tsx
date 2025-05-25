type BadgeProps = {
  title: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
};

const Badge = ({
  title,
  borderColor,
  bgColor,
  textColor,
  className,
}: BadgeProps) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
      className={`w-fit h-fit px-4 py-2 rounded-full flex text-center ${className}`}
    >
      {title}
    </div>
  );
};

export default Badge;
