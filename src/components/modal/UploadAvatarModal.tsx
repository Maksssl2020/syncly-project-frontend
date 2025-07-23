import Modal from "./Modal";
import FormFileInput from "../input/FormFileInput.tsx";
import { useState } from "react";
import AvatarCropper from "../cropper/AvatarCropper.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import useUploadUserAvatarMutation from "../../hooks/mutations/useUploadUserAvatarMutation.ts";

type UploadAvatarModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UploadAvatarModal = ({ isOpen, onClose }: UploadAvatarModalProps) => {
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const { uploadAvatar, uploadingAvatar } = useUploadUserAvatarMutation();

  const handleFileChange = (file: File | undefined) => {
    if (file) {
      setAvatarFile(file);
      setIsCropping(true);
    }
  };

  const handleCropComplete = (croppedImageBase64: string) => {
    setCroppedAvatar(croppedImageBase64);
    setIsCropping(false);
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
    setAvatarFile(undefined);
  };

  const onUploadAvatarClick = () => {
    if (croppedAvatar) {
      uploadAvatar(croppedAvatar);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={"w-full h-auto p-6 flex flex-col gap-4"}>
        <h2 className={"text-2xl font-bold text-white-100"}>
          Upload Your Avatar
        </h2>
        {!isCropping && (
          <div className={"grid grid-cols-3 gap-4 "}>
            <div className={"col-span-2 "}>
              <FormFileInput
                onChange={handleFileChange}
                title={""}
                maxFiles={1}
                accept={"image/*"}
              />
            </div>
            {croppedAvatar && (
              <img
                src={croppedAvatar}
                alt="Cropped Avatar"
                className="rounded-full size-[130px] ml-auto object-cover"
              />
            )}
          </div>
        )}

        {isCropping && avatarFile && (
          <AvatarCropper
            file={avatarFile}
            onCropComplete={handleCropComplete}
            onCancel={handleCancelCrop}
          />
        )}

        <div className={"w-full flex gap-8 justify-between"}>
          <AnimatedButton
            onClick={onClose}
            className={"w-full h-[50px] rounded-lg"}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            onClick={onUploadAvatarClick}
            loading={uploadingAvatar}
            disabled={!croppedAvatar}
            className={"w-full h-[50px] rounded-lg"}
          >
            Upload
          </AnimatedButton>
        </div>
      </div>
    </Modal>
  );
};

export default UploadAvatarModal;
