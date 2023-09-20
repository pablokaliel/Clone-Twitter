import { Sparkle } from "@phosphor-icons/react";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="py-6 px-5 flex items-center justify-between text-xl font-bold border-b-[1px] border-b-grayBorder bg-white/80 sticky top-0 backdrop-blur-md z-10 ">
      {title}
      <Sparkle size={24} color="#1da1f2" />
    </header>
  );
}

export default Header;
