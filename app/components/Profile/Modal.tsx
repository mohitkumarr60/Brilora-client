import Image from "next/image";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <RiCloseFill className="cursor-pointer w-8 h-8" onClick={onClose} />
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt="Image"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Modal;
