import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const ScrollDirectionContext = createContext<undefined | string>(undefined);

export function useScrollDirection() {
  return useContext(ScrollDirectionContext);
}

interface ScrollDirectionProps {
  children: ReactNode;
}

export function ScrollDirectionProvider({ children }: ScrollDirectionProps) {
  const [scrollDirection, setScrollDirection] = useState<string | undefined>(
    "up"
  );

  useEffect(() => {
    let lastScrollPosition = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollPosition = currentScrollPosition;
    });
  }, []);

  return (
    <ScrollDirectionContext.Provider value={scrollDirection}>
      {children}
    </ScrollDirectionContext.Provider>
  );
}
