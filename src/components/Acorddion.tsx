import { CaretDown } from "@phosphor-icons/react";
import { ReactNode, useState } from "react";

interface AccordionProps {
  children: ReactNode;
  title: string;
}

export function Accordion({ children, title }: AccordionProps) {
  const [sectionIsVisible, setSectionIsVisible] = useState(false);

  function handleShowSection() {
    setSectionIsVisible((prevState) => !prevState);
  }

  return (
    <>
      <div
        className="flex items-center justify-between py-2 active:bg-zinc-100 active:dark:bg-zinc-800"
        onClick={handleShowSection}
      >
        <span className="font-bold text-base">{title}</span>
        <CaretDown
          className={`${ sectionIsVisible ? "rotate-180 text-twitterBlue" : "" } transition-transform duration-150`}
        />
      </div>

      {sectionIsVisible && <section>{children}</section>}
    </>
  );
}
