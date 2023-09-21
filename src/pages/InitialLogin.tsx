import {
  AppleLogo,
  GoogleLogo,
  TwitterLogo,
  X,
} from "@phosphor-icons/react";

function InitalLogin() {
  return (
    <div className="w-full h-screen bg-gray-900 grid place-content-center">
      <div className="bg-black w-[600px] h-[650px] rounded-3xl relative">
        <header className="p-4 flex items-center justify-center">
          <TwitterLogo color="#fff" size={38} />
        </header>
        <div className="flex flex-col items-center text-white">
          <div className="flex flex-col gap-5">
            <div className=" py-5">
              <h1 className="text-3xl font-black">Entrar no Twitter</h1>
            </div>
            <div className="flex flex-col gap-6">
              <button className="flex items-center gap-3 w-[300px] rounded-3xl bg-white text-black h-[40px] justify-center text-sm font-medium">
                <GoogleLogo size={20} />
                fazer login com o Google
              </button>
              <button className="flex items-center gap-3 w-[300px] rounded-3xl bg-white text-black h-[40px] justify-center font-bold">
                <AppleLogo size={20} weight="fill" />
                entrar com Apple
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-slate-600 w-full h-[1px]"/>
              <p>ou</p>
              <div className="bg-slate-600 w-full h-[1px]"/>
            </div>
            <div>
              <input
                className="border rounded-md border-slate-600 bg-transparent w-full px-2 py-4 h-[58px] focus:outline-none"
                placeholder="celular,e-mail ou nome de usuário"
              />
            </div>
            <div className="flex flex-col gap-6">
              <button className="flex font-bold text-sm items-center gap-3 w-[300px] rounded-3xl bg-white text-black h-[36px] justify-center">
                avançar
              </button>
              <button className="flex font-bold text-sm items-center gap-3 w-[300px] rounded-3xl border border-slate-600 h-[36px] justify-center">
                esqueceu sua senha?
              </button>
            </div>
            <div className="mt-3">
              <span className="font-bold text-slate-600">
                Não tem conta?{" "}
                <a className="text-twitterBlue hover:underline" href="#">
                  inscreva-se
                </a>{" "}
              </span>
            </div>
          </div>
        </div>
        <button className="absolute left-[10px] hover:bg-slate-800/60 p-[10px] rounded-full top-[10px] "><X color="#fff" size={18}/></button>
      </div>
    </div>
  );
}

export default InitalLogin;
