import { Link } from "react-router-dom";

import notfound from '../assets/notfound.json'
import Lottie from "lottie-react";

function NotFound() {
  return ( 
    <div className="h-screen gap-3 flex flex-col items-center justify-center w-full">
       <Lottie
                  animationData={notfound}
                  style={{
                    width: "100%",
                    height: "50%",
                  }}
                />
    <h1 className="text-xl">Oops! Essa página não foi encontrada! recomendamos verificar a URL ou voltar para a Home</h1>
    <Link className="bg-twitterBlue rounded-full flex justify-center items-center w-[140px] text-white text-lg font-bold border-0 p-4 hover:brightness-90 transition-all" to="/">Home</Link>
    </div>

   );
}

export default NotFound;