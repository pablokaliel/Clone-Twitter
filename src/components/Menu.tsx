import { ChartBar, ChatCircle, Code, FlagPennant, IconProps, ListPlus, Prohibit, PushPinSimple, Sparkle, SpeakerX, Trash, UserMinus } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItemProps {
  icon: React.ElementType<IconProps>;
  text: string;
  isDeleteButton?: boolean;
  tweetId?: string;
}

interface MenuProps {
  setIsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuVisible: boolean;
  tweetId: string;
  userLogin: string;
}

function MenuItem(props: MenuItemProps) {
  return (
    <div
      data-isdeletebutton={props.isDeleteButton}
      className="py-3 px-4 flex items-center gap-2 data-[isdeletebutton=true]:text-red-600 hover:bg-black/[0.1] dark:hover:bg-white/[0.1]"
      onClick={(event) => {
        event.preventDefault();
        console.log(`Ação do botão Delete`);
      }}
    >
      <props.icon size={18.75} />
      <span className="font-bold">{props.text}</span>
    </div>
  );
}

export function Menu({
  setIsMenuVisible,
  isMenuVisible,
  tweetId,
  userLogin,
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [layer, setLayer] = useState(false);

  const { userInfo } = useUser();

  useEffect(() => {
    setLayer(true);
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuVisible(false);
      }
    }

    setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 100);

    if (window.matchMedia("(max-width: 425px)").matches && isMenuVisible) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "initial";
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setIsMenuVisible, isMenuVisible]);

  const [isEscapeKeyPressed, setIsEscapeKeyPressed] = useState(false);

  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuVisible(false);
        setIsEscapeKeyPressed(false);
      }
    };

    if (isMenuVisible) {
      window.addEventListener("keydown", closeModalOnEscape);
    }

    return () => {
      window.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [isMenuVisible]);

  useEffect(() => {
    if (isEscapeKeyPressed && isMenuVisible) {
      setIsMenuVisible(false);
      setIsEscapeKeyPressed(false);
    }
  }, [isEscapeKeyPressed, isMenuVisible]);

  const drawerVariants = {
    open: {
      scale: 1,
      opacity: 1,
      transition: { type: "tween", duration: 0.3 },
    },
    closed: {
      scale: 0,
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  return (
    <AnimatePresence onExitComplete={() => setIsEscapeKeyPressed(false)}>
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={drawerVariants}
        className="sm:bg-black/40 sm:fixed sm:z-50 sm:inset-0 sm:dark:bg-[rgba(91,_112,_131,_0.4)]"
        onClick={(e) => e.preventDefault()}
      >
        <div
          ref={menuRef}
          className={`absolute top-0 right-0 max-w-[384px] h-fit z-20 bg-white rounded-xl shadow-menu overflow-hidden dark:bg-bodyDark dark:shadow-menuDark animate-fadeDown sm:bottom-0 sm:top-auto sm:w-full sm:rounded-b-none sm:dark:shadow-none ${
            userLogin === userInfo.login ? "w-72" : "w-fit"
          } sm:max-w-none sm:animate-fadeUp`}
          onClick={(e) => e.preventDefault()}
        >
          {userLogin === userInfo.login ? (
            <>
              <MenuItem
                icon={Trash}
                text="Delete"
                isDeleteButton
                tweetId={tweetId}
              />
              <MenuItem icon={PushPinSimple} text="Pin to your profile" />
              <MenuItem icon={Sparkle} text="Highlight on your profile" />
              <MenuItem icon={ChatCircle} text="Change who can reply" />
              <MenuItem icon={ChartBar} text="View post engagements" />
              <MenuItem icon={Code} text="Embed post" />
              <MenuItem icon={ChartBar} text="View post analytics" />
            </>
          ) : (
            <>
              <MenuItem icon={UserMinus} text={`Unfollow @${userLogin}`} />
              <MenuItem
                icon={ListPlus}
                text={`Add/Remove @${userLogin} from lists`}
              />
              <MenuItem icon={SpeakerX} text={`Mute @${userLogin}`} />
              <MenuItem icon={Prohibit} text={`Block @${userLogin}`} />
              <MenuItem icon={ChartBar} text="View post engagements" />
              <MenuItem icon={Code} text="Embed post" />
              <MenuItem icon={FlagPennant} text="Report post" />
            </>
          )}

          <button
            className="hidden w-[95%] h-11 my-3 mx-auto border rounded-full items-center justify-center font-bold transition-colors duration-200 sm:flex active:bg-tweetColor dark:border-grayBorderDark dark:active:bg-white/10"
            onClick={() => setIsMenuVisible(false)}
          >
            Cancel
          </button>
        </div>

        {layer && (
          <div
            className="fixed inset-0"
            onClick={(e) => e.preventDefault()}
          ></div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
