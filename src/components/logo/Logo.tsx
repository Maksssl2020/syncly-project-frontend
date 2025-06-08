const Logo = () => {
  return (
    <div className={"flex items-center gap-2 "}>
      <div
        className={
          "size-12 bg-teal-100 rounded-lg flex items-center justify-center"
        }
      >
        <span className={"text-white-100 font-bold text-lg"}>S</span>
      </div>
      <div className={"text-2xl font-bold text-white-100"}>Syncly</div>
    </div>
  );
};

export default Logo;
