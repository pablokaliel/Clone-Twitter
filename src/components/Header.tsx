import { Sparkle } from "@phosphor-icons/react";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="py-6 px-5 flex items-center justify-between text-xl w-full font-bold border-b border-b-grayBorder bg-white/80 sticky top-0 backdrop-blur-md z-10 ">
      {title}
      <Sparkle className="w-6 h-6 text-twitterBlue" />
    </div>
  );
}
