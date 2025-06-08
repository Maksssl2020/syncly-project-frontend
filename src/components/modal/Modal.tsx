import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({
  isOpen,
  onClose,
  className = "w-full max-w-2xl rounded-lg border-2 bg-black-200 border-gray-600",
  children,
}: ModalProps) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={"fixed inset-0 bg-black-100/75 backdrop-blur-md z-50"}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={
              "fixed inset-0 z-50 flex items-center justify-center p-4"
            }
          >
            <div className={className}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
