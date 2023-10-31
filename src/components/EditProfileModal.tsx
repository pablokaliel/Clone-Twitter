import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CameraPlus, CircleNotch, X } from "@phosphor-icons/react";
import { useUser } from "../context/UserContext";

interface EditProfileModalProps {
  imgFile: string;
  getImgFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editNameValue: string;
  setEditNameValue: (value: string) => void;
  editLoginValue: string;
  setEditLoginValue: (value: string) => void;
  editBioValue: string;
  setEditBioValue: (value: string) => void;
  handleSaveNewInfo: () => void;
  isLoading: boolean;
  toggleModal: () => void;
  bannerColor: string;
  setBannerColor: React.Dispatch<React.SetStateAction<string>>;
}

function EditProfileModal({
  imgFile,
  getImgFile,
  editNameValue,
  setEditNameValue,
  editLoginValue,
  setEditLoginValue,
  editBioValue,
  setEditBioValue,
  handleSaveNewInfo,
  isLoading,
  toggleModal,
  bannerColor,
  setBannerColor,
}: EditProfileModalProps) {

  const drawerVariants = {
    open: {
      scale: 1,
      transition: { type: "tween", duration: 0.3 },
    },
    closed: {
      scale: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };
  
  useEffect(() => {
    localStorage.setItem("bannerColor", bannerColor);
  }, [bannerColor]);
  
const {userInfo} = useUser()
  const isFormValid =
    editNameValue.trim() !== "" && editLoginValue.trim() !== "";

  const renderButtonContent = () => {
    return isLoading ? (
      <CircleNotch size={18} weight="bold" className="animate-spin" />
    ) : (
      "Save"
    );
  };

  useEffect(() => {
    localStorage.setItem(`bannerColor-${userInfo.login}`, bannerColor);
  }, [bannerColor, userInfo.login]);

  const inputClass = "w-full h-10 rounded border-gray-600 border outline-none mt-6 px-2 text-sm bg-white/30";

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={drawerVariants}
      className="w-full max-w-[600px] min-h-[400px] mx-5 py-4 px-4 bg-white dark:bg-bodyDark shadow-menu rounded-2xl flex flex-col md:max-w-none md:mx-0 md:max-h-none md:h-full md:shadow-none md:rounded-none"
    >
      <header className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <button
            onClick={toggleModal}
            className="w-9 h-9 rounded-full grid place-items-center mr-5 hover:bg-black/10 dark:hover:bg-white/10"
            title="Fechar"
          >
            <X size={20} weight="bold" />
          </button>

          <h2 className="text-xl font-bold dark:text-textDark">Edit profile</h2>
        </div>
      </header>

      <div>
        <div className="relative w-fit mt-12 mb-5">
          <img
            src={imgFile}
            alt="User profile image"
            className="rounded-full w-28 h-28 object-cover brightness-90"
          />
          <label
            htmlFor="avatarInput"
            title="Add photo"
            className="cursor-pointer w-10 h-10 grid place-items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full transition-all duration-200 bg-black/60 hover:bg-black/40"
          >
            <CameraPlus size={24} color="#fff" />
          </label>

          <input
            type="file"
            id="avatarInput"
            className="hidden"
            accept="image/*"
            onChange={getImgFile}
          />
        </div>

        <div>
          <input
            className={inputClass}
            placeholder="Nome (obrigatório)"
            maxLength={50}
            value={editNameValue}
            required
            onChange={(e) => setEditNameValue(e.target.value)}
          />

          <input
            className={inputClass}
            placeholder="Login (obrigatório)"
            maxLength={160}
            required
            value={editLoginValue}
            onChange={(e) => setEditLoginValue(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Bio (opcional)"
            maxLength={160}
            value={editBioValue}
            onChange={(e) => setEditBioValue(e.target.value)}
          />

          <div className="w-[40px] mt-6 flex items-center flex-col justify-center h-[40px] rounded-full">
            <label
              htmlFor="color"
              className="w-full h-full flex items-center justify-center rounded-full"
              style={{ backgroundColor: bannerColor, borderRadius: "50%" }}
            >
              <input
                className="opacity-0"
                id="color"
                type="color"
                value={bannerColor}
                onChange={(e) => setBannerColor(e.target.value)}
              />
            </label>
          </div>
        </div>

        <button
          className={`p-4 rounded flex items-center justify-center gap-2 ${
            !isFormValid
              ? "opacity-40 rounded-full w-16 h-8 font-bold text-sm flex justify-center items-center transition-all duration-200 place-items-center"
              : "rounded-full w-16 h-8 font-bold text-sm flex justify-center items-center transition-all duration-200 place-items-center"
          } bg-twitterBlue text-white dark:bg-textDark dark:text-bodyDark mt-6`}
          onClick={handleSaveNewInfo}
          disabled={!isFormValid}
        >
          {renderButtonContent()}
        </button>
      </div>
    </motion.div>
  );
}

export default EditProfileModal;
