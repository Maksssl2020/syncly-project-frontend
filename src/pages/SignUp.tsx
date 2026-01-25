import Page from "../animation/Page.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { ArrowLeft } from "lucide-react";
import FormInput from "../components/input/FormInput.tsx";
import { useNavigate } from "react-router-dom";
import FormCheckbox from "../components/input/FormCheckbox.tsx";
import AnimatedAElement from "../components/a/AnimatedAElement.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpValidator } from "../validators/signUpValidator.ts";
import type { SignUpRequest } from "../types/authentication.ts";
import useSignUpMutation from "../hooks/mutations/useSignUpMutation.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import TurnstileWidget from "../components/widget/TurnstileWidget.tsx";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [isHuman, setIsHuman] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpValidator),
  });

  const { signingUp, signUp } = useSignUpMutation();

  const onSubmit = (data: SignUpRequest) => {
    if (!isHuman) {
      toast.error("Please confirm you are not a robot.");
    } else {
      signUp(data);
    }
  };

  if (signingUp) {
    return <Spinner />;
  }

  return (
    <Page className={"min-h-screen flex items-center justify-center py-6"}>
      <div className={"w-full max-w-lg "}>
        <AnimatedButton
          borderColor={"#111111"}
          bgColorHover={"#111111"}
          textColorHover={"#14b8a6"}
          className={"flex items-center gap-2 mb-8 text-gray-300"}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className={"size-5"} />
          Go Back
        </AnimatedButton>

        <div
          className={
            "bg-black-200 border-2 border-gray-600 rounded-lg flex flex-col gap-8 p-4"
          }
        >
          <div className={"flex justify-center flex-col items-center gap-6"}>
            <div
              className={
                "size-12 bg-teal-100 rounded-lg flex items-center justify-center"
              }
            >
              <span className={"font-bold text-xl text-black-400"}>S</span>
            </div>
            <div className={" items-center flex flex-col"}>
              <h2 className={"text-2xl font-bold text-white-100"}>
                Join to Syncly
              </h2>
              <p className={"text-gray-300"}>
                Create an account and start sharing your creativity
              </p>
            </div>
          </div>
          <form className={"flex flex-col gap-2"}>
            <FormInput
              placeholder={"Adam"}
              title={"First Name"}
              type={"text"}
              register={register("firstName")}
              error={errors?.firstName?.message}
            />
            <FormInput
              placeholder={"Smith"}
              title={"Last Name"}
              type={"text"}
              register={register("lastName")}
              error={errors?.lastName?.message}
            />
            <FormInput
              placeholder={"@adamsmith"}
              title={"Username"}
              type={"text"}
              register={register("username")}
              error={errors?.username?.message}
            />
            <FormInput
              placeholder={"adam@example.com"}
              title={"E-mail"}
              type={"email"}
              register={register("email")}
              error={errors?.email?.message}
            />
            <FormInput
              placeholder={"Enter password"}
              title={"Password"}
              type={"password"}
              register={register("password")}
              error={errors?.password?.message}
            />
            <FormInput
              placeholder={"Confirm password"}
              title={"Confirm Password"}
              type={"password"}
              register={register("confirmPassword")}
              error={errors?.confirmPassword?.message}
            />

            <div className={"w-full flex  gap-2"}>
              <FormCheckbox title={""} />
              <div className={"text-gray-300 mt-6 gap-1 flex"}>
                I accept the{" "}
                <AnimatedAElement href={"/terms"} title={"regulations"} /> and
                <AnimatedAElement
                  title={"privacy policy"}
                  href={"/privacy-policy"}
                />
              </div>
            </div>

            <div className="w-full items-center flex justify-center mt-auto">
              <TurnstileWidget setIsHuman={setIsHuman} />
            </div>

            <AnimatedButton
              onClick={handleSubmit(onSubmit)}
              bgColor={"#222222"}
              borderColor={"#14b8a6"}
              className={"w-full h-[50px] border-2 rounded-lg font-medium"}
            >
              Sign Up
            </AnimatedButton>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
          </div>

          <div className={"flex gap-1 items-center justify-center"}>
            <span className={"text-gray-300"}>Have an account already?</span>
            <AnimatedAElement href={"/sign-in"} title={"Sign In"} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignUp;
