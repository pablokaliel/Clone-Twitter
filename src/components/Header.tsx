import { Sparkle, TwitterLogo } from "@phosphor-icons/react";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="py-6 sm:p-3 px-5 flex items-center justify-between text-xl w-full font-bold border-b border-b-grayBorder bg-white/80 sticky top-0 backdrop-blur-md z-10 ">
      <div className="sm:block hidden">
        <button>
          <img
            className="w-10 h-10 rounded-full"
            src="https://github.com/pablokaliel.png"
            alt=""
          />
        </button>
      </div>
      <div>
        <p className="sm:hidden">{title}</p>
        <TwitterLogo
          className="hidden sm:block"
          size={28}
          weight="fill"
          color="#1da1f2"
        />
      </div>
      <Sparkle className="w-6 h-6 text-twitterBlue" />
    </div>
  );
}
