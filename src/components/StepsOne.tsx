import { Dispatch, SetStateAction } from "react";
import { InputWrapper } from "./InputWrapper";
import { UserInfo } from "../context/UserContext";

interface StepsOneProps {
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  userInfo: UserInfo;
}

export function StepOne({ setUserInfo, userInfo }: StepsOneProps) {
  return (
    <div className="pb-6">
      <div>
        <InputWrapper
          inputName="Name"
          maxLengthCaracters={50}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
        <InputWrapper
          inputName="Login"
          maxLengthCaracters={20}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      </div>
    </div>
  );
}
