import { AppleLogo, GoogleLogo, TwitterLogo, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from "../utils/AuthContext";

function InitalLogin() {
  const [googleErrorMessage] = useState("");
  const [appleErrorMessage, setAppleErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const auth = getAuth();
  const { login, isAuthenticated } = useAuth();

  setPersistence(auth, browserLocalPersistence)
    .then(() => {})
    .catch((error) => {
      console.error("Erro ao configurar persistência de sessão:", error);
    });

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {})
      .catch((error) => {
        console.error("Erro ao configurar persistência de sessão:", error);
      });
  }, [auth]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      login();
    }
  }, [isAuthenticated, login]);

  const handleAdvanceClick = () => {
    const emailInput = document.getElementById(
      "emailInput"
    ) as HTMLInputElement | null;
    const passwordInput = document.getElementById(
      "passwordInput"
    ) as HTMLInputElement | null;

    if (emailInput && passwordInput) {
      const email = emailInput.value;
      const password = passwordInput.value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuário autenticado com sucesso:", user);
          login();
          navigate("/");
        })
        .catch((error) => {
          console.error("Erro ao autenticar com e-mail e senha:", error);
          setEmailError("E-mail ou senha incorretos. Tente novamente.");
        });
    } else {
      setEmailError("Campos de e-mail e senha não encontrados.");
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário autenticado com sucesso:", user);

        login();
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao autenticar com o Google:", error);
      });
  };

  const handleAppleLogin = () => {
    setAppleErrorMessage("Temporariamente indisponível");
    setTimeout(() => {
      setAppleErrorMessage("");
    }, 2000);
  };

  return (
    <div className="w-full h-screen dark:bg-slate-900/40 bg-[#999] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white dark:bg-bodyDark sm:w-full sm:h-full sm:rounded-none w-[600px] h-[650px] rounded-3xl relative"
      >
        <header className="p-4 flex items-center justify-center">
          <TwitterLogo color="#1da1f2" weight="fill" size={40} />
        </header>

        <div className="flex flex-col items-center sm:py-[129px] ">
          <div className="flex flex-col gap-5">
            <div className=" py-5">
              <h1 className="text-3xl font-black">Entrar no Twitter</h1>
            </div>

            <div className="flex flex-col gap-6">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center border border-grayBorderLight hover:bg-grayBorderLight/20 gap-3 w-[300px] rounded-3xl bg-white text-black h-[40px] justify-center text-sm font-medium"
              >
                <GoogleLogo size={20} />
                fazer login com o Google
              </button>
              {googleErrorMessage && (
                <div className="text-red-500 mt-[-1rem] text-xs">
                  {googleErrorMessage}
                </div>
              )}
              <button
                onClick={handleAppleLogin}
                className="flex border border-grayBorderLight hover:bg-grayBorderLight/20 items-center gap-3 w-[300px] rounded-3xl bg-white text-black h-[40px] justify-center font-bold"
              >
                <AppleLogo size={20} weight="fill" />
                entrar com Apple
              </button>
              {appleErrorMessage && (
                <div className="text-red-500 mt-[-1rem] text-xs">
                  {appleErrorMessage}
                </div>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <div className="bg-grayBorderLight w-full h-[1px] dark:bg-slate-300" />
              <p>ou</p>
              <div className="bg-grayBorderLight w-full h-[1px] dark:bg-slate-300" />
            </div>

            <div>
              <input
                id="emailInput"
                className="border rounded-md border-grayBorderLight hover:bg-grayBorderLight/20 bg-transparent w-full px-2 py-4 h-[58px] focus:outline-none"
                placeholder="celular, e-mail ou nome de usuário"
              />
              {emailError && (
                <div className="text-red-500 mt-1 text-xs">{emailError}</div>
              )}
            </div>
            <div>
              <input
                id="passwordInput"
                type="password"
                className="border rounded-md border-grayBorderLight hover:bg-grayBorderLight/20 bg-transparent w-full px-2 py-4 h-[58px] focus:outline-none"
                placeholder="senha"
              />
            </div>

            <div className="flex flex-col gap-6">
              <button
                onClick={handleAdvanceClick}
                className="flex bg-black dark:bg-white dark:text-black font-bold text-sm items-center gap-3 w-[300px] rounded-3xl text-white h-[36px] justify-center"
              >
                avançar
              </button>
              <button className="flex font-bold text-sm items-center gap-3 w-[300px] rounded-3xl border border-grayBorderLight hover:bg-grayBorderLight/20 h-[36px] justify-center">
                esqueceu sua senha?
              </button>
            </div>

            <div className="mt-3">
              <span className="font-bold text-">
                Não tem conta?{" "}
                <Link
                  to="/createpassword"
                  className="text-twitterBlue hover:underline"
                >
                  inscreva-se
                </Link>{" "}
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="absolute left-[10px] text-black dark:text-white hover:bg-gray-800/20 p-[10px] rounded-full top-[10px] "
        >
          <X size={18} />
        </Link>
      </motion.div>
    </div>
  );
}

export default InitalLogin;
