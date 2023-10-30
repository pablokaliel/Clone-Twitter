import { createContext, useContext, useState, ReactNode } from "react";
import { loadUser } from "../utils/SaveUser";
import { loadHasUser } from "../utils/HasUser";


export interface UserInfo {
  name: string;
  login: string;
  avatar: string;
  bio: string;
  birthdayDate: {
    month: number | null;
    day: number | null;
    year: number | null;
  };
  created_at: string;
  followers: number;
  following: number;
}

type UserContextType = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  hasUser: boolean | null;
  setHasUser: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>(loadUser);
  const [hasUser, setHasUser] = useState(loadHasUser);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, hasUser, setHasUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};