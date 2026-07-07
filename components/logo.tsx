import Image from "next/image";

const Logo = () => {
  return (
    <div className="shrink-0">
      <Image
        src="/assets/images/logo.svg"
        alt="logo"
        width={139}
        height={26}
        className="w-[107px] h-[20px] md:w-[139px] md:h-[26px] object-contain"
      />
    </div>
  );
};

export default Logo;
