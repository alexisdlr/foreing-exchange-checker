"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Logo from "./logo";

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}>{children}</button>;
};

const Header = () => {
  const { user } = useUser();

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
      <div>
        {user ? (
          <UserButton />
        ) : (
          <SignInButton>
            <Button
              type="button"
              className="bg-neutral-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 transition-colors duration-200"
            >
              Sign in
            </Button>
          </SignInButton>
        )}
      </div>
    </header>
  );
};

export default Header;
