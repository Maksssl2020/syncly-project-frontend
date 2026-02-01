import { motion } from "framer-motion";
import Page from "../animation/Page.tsx";
import React, { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, LockIcon, Mail, Shield } from "lucide-react";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication.ts";
import useVerify2FAMutation from "../hooks/mutations/useVerify2FAMutation.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyCodeValidator } from "../validators/signInValidator.ts";
import { useForm } from "react-hook-form";
import type { TwoFactorVerificationRequest } from "../types/authentication.ts";
import { useAuthenticationStore } from "../store/authenticationStore.ts";

const TwoFactorVerificationCode = () => {
  const navigate = useNavigate();
  const { email } = useAuthentication();
  const verificationUserId =
    useAuthenticationStore.getState().verificationUserId;
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verify2FA, validating2FA } = useVerify2FAMutation();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyCodeValidator),
  });

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;

    setCode(newCode);
    setValue("code", newCode.join(""), { shouldValidate: true });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === 5 && newCode.every((digit) => digit !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newCode = Array(6).fill("");
    pasted.split("").forEach((ch, i) => (newCode[i] = ch));

    setCode(newCode);
    setValue("code", newCode.join(""), { shouldValidate: true });

    const lastIndex = Math.min(pasted.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();

    if (pasted.length === 6) handleVerify(newCode.join(""));
  };

  const handleVerify = (verificationCode: string) => {
    if (verificationUserId) {
      const request: TwoFactorVerificationRequest = {
        userId: verificationUserId,
        code: verificationCode,
      };
      verify2FA(request);
    }
  };

  return (
    <Page className={"min-h-screen flex items-center justify-center py-6"}>
      <div className="w-full max-w-lg">
        <AnimatedButton
          bgColorHover={"#0a0a0c"}
          textColorHover={"#14b8a6"}
          className={"flex items-center gap-2 mb-8 text-gray-300"}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className={"size-5"} />
          Go Back
        </AnimatedButton>

        <div className="rounded-2xl p-8 border-2 bg-black-200 border-gray-600">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-teal-100), var(--color-cyan-100))",
              }}
            >
              <span className="text-xl font-bold text-black-400">S</span>
            </div>
            <span className="text-2xl font-bold text-white-100">Syncly</span>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-teal-100/10">
              <Shield className="w-8 h-8 text-teal-100" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-white-100">
              Verify Your Email
            </h1>
            <p className="text-sm text-gray-200">We sent a 6-digit code to</p>
            <div className="flex items-center justify-center gap-2 mt-1 text-white-100">
              <Mail className="w-4 h-4 text-teal-100" />
              <span className="font-medium">{email}</span>
            </div>
          </div>

          <div className="flex justify-center gap-2 sm:gap-3 mb-6">
            {code.map((digit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={validating2FA}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-all duration-200 disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--color-black-300)",
                    borderColor: digit
                      ? "var(--color-teal-100)"
                      : errors.code
                        ? "#ef4444"
                        : "var(--color-gray-600)",
                    color: "var(--color-white-100)",
                    boxShadow: digit
                      ? "0 0 0 3px rgba(20, 184, 166, 0.1)"
                      : "none",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {errors.code && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-4 p-3 rounded-lg"
              style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
            >
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-500">
                {errors.code.message}
              </span>
            </motion.div>
          )}

          <AnimatedButton
            onClick={handleSubmit((data) => handleVerify(data.code))}
            loading={validating2FA}
            disabled={code.some((d) => d === "") || validating2FA}
            bgColor={"#222222"}
            borderColor={"#14b8a6"}
            className={"w-full h-[50px] mt-4 border-2 rounded-lg font-medium"}
          >
            <div className={"flex gap-3 items-center justify-center"}>
              <LockIcon className="w-5 h-5" />
              Verify Code
            </div>
          </AnimatedButton>
        </div>

        <div className="mt-6 p-4 rounded-xl border flex items-start gap-3 bg-teal-100/5 border-teal-100/15">
          <Shield className="w-5 h-5 mt-0.5 flex-shrink-0 text-teal-100" />
          <div>
            <p className="text-sm font-medium mb-1 text-white-100">
              Security Tip
            </p>
            <p className="text-xs text-gray-300">
              Never share your verification code with anyone. Syncly will never
              ask for your code via email or phone.
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default TwoFactorVerificationCode;
