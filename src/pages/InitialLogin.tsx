import { AppleLogo, GoogleLogo, TwitterLogo, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function InitalLogin() {
  const [googleErrorMessage, setGoogleErrorMessage] = useState("");
  const [appleErrorMessage, setAppleErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAdvanceClick = () => {
    const emailInput = document.getElementById(
      "emailInput"
    ) as HTMLInputElement | null;
    if (emailInput) {
      const email = emailInput.value;
      if (email === "twitterlogin@gmail.com") {
        // Simule a autenticação de sucesso
        login(); // Chame a função de login do contexto
        navigate("/");
      } else {
        setEmailError("Email incorreto. Tente novamente.");
      }
    } else {
      setEmailError("Campo de email não encontrado.");
    }
  };

  const handleGoogleLogin = () => {
    setGoogleErrorMessage("Temporariamente indisponível");
    setTimeout(() => {
      setGoogleErrorMessage("");
    }, 2000);
  };

  const handleAppleLogin = () => {
    setAppleErrorMessage("Temporariamente indisponível");
    setTimeout(() => {
      setAppleErrorMessage("");
    }, 2000);
  };
  return (
    <div className="w-full h-screen bg-[#999] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white sm:w-full sm:h-full sm:rounded-none w-[600px] h-[650px] rounded-3xl relative"
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
              <div className="bg-grayBorderLight w-full h-[1px]" />
              <p>ou</p>
              <div className="bg-grayBorderLight w-full h-[1px]" />
            </div>
            <div>
              <input
                id="emailInput"
                className="border rounded-md border-grayBorderLight hover:bg-grayBorderLight/20 bg-transparent w-full px-2 py-4 h-[58px] focus:outline-none"
                placeholder="celular,e-mail ou nome de usuário"
              />
              {emailError && (
                <div className="text-red-500 mt-1 text-xs">{emailError}</div>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <button
                onClick={handleAdvanceClick}
                className="flex bg-black font-bold text-sm items-center gap-3 w-[300px] rounded-3xl text-white h-[36px] justify-center"
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
                <a className="text-twitterBlue hover:underline" href="#">
                  inscreva-se
                </a>{" "}
              </span>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="absolute left-[10px] hover:bg-gray-800/20 p-[10px] rounded-full top-[10px] "
        >
          <X color="#000" size={18} />
        </Link>
      </motion.div>
    </div>
  );
}

export default InitalLogin;
