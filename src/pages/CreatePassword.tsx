import { X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { saveUser } from "../utils/SaveUser";
import { saveHasUser } from "../utils/HasUser";
import { StepOne } from "../components/StepsOne";
import { StepTwo } from "../components/StepsTwo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function CreatePassword() {
  const [steps, setSteps] = useState<number>(1);
  const totalSteps = 2;

  const navigate = useNavigate();
  const { login } = useAuth();

  const { userInfo, setUserInfo, setHasUser } = useUser();

  async function handleSteps() {
    if (steps === 2) {
      try {
        saveUser(userInfo);
        saveHasUser(true);
        setHasUser(true);
        setUserInfo({
          ...userInfo,
          name: userInfo.name,
          login: userInfo.login,
          avatar: userInfo.avatar,
        });

        login();
        navigate("/");
      } catch (error) {
        console.error("Erro ao criar a conta: ", error);
      }
    }

    if (steps < 2) {
      setSteps((prevState) => prevState + 1);
    }
  }

  return (
    <div className="w-full h-screen dark:bg-slate-900/40 bg-[#999] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white dark:bg-bodyDark sm:w-full sm:h-full sm:rounded-none w-[600px] h-[650px] rounded-3xl relative"
      >
        <div className="absolute w-full h-full backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full max-w-[600px] min-h-[400px] mx-5 py-4 px-4 bg-white dark:bg-gray-900 shadow-menu rounded-2xl flex flex-col md:max-w-none md:mx-0 md:max-h-none md:h-screen md:shadow-none md:rounded-none">
            <header className="flex items-center mb-5">
              <NavLink to="/flow">
                <button
                  className="w-9 h-9 rounded-full grid place-items-center mr-3 hover:bg-black/10"
                  title="Fechar"
                >
                  <X size={20} weight="bold" />
                </button>
              </NavLink>

              <p className="text-xl font-bold">
                Etapa {steps} de {totalSteps}
              </p>
            </header>

            <div className="flex-1 max-w-[440px] w-full mx-auto mb-6 md:max-w-[600px]">
              <h1 className="text-4xl font-bold mb-8">Criar sua conta</h1>

              {steps == 1 && (
                <StepOne setUserInfo={setUserInfo} userInfo={userInfo} />
              )}
              {steps == 2 && (
                <StepTwo setUserInfo={setUserInfo} userInfo={userInfo} />
              )}
            </div>

            <button
              onClick={handleSteps}
              className="w-full max-w-[440px] h-[52px] mx-auto mb-2 rounded-full bg-twitterBlue text-white text-xl font-bold disabled:opacity-80 md:max-w-[600px]"
              disabled={
                steps === 1 &&
                (userInfo.name.trim() === "" || userInfo.login.trim() === "")
              }
            >
              {steps === 1 ? "Next" : "Create"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CreatePassword;
