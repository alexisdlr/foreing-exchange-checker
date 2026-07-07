import Logo from "./logo";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 md:px-6 md:py-5">
      <Logo />
      <div className="flex items-center gap-2 text-preset-6 md:text-preset-4 text-neutral-200">
        <span>55 Currencies</span>
        <div className="w-1 h-1 bg-neutral-200 rounded-full" />
        <span>EOD</span>
        <div className="w-1 h-1 bg-neutral-200 rounded-full" />
        <span>ECB Data</span>
      </div>
    </header>
  );
};

export default Header;
