import Page from "../animation/Page.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { ArrowLeft } from "lucide-react";
import FormInput from "../components/input/FormInput.tsx";
import { useNavigate } from "react-router-dom";
import FormCheckbox from "../components/input/FormCheckbox.tsx";
import AnimatedAElement from "../components/a/AnimatedAElement.tsx";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Page className={"min-h-screen flex items-center justify-center py-6"}>
      <div className={"w-full max-w-lg "}>
        <AnimatedButton
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
            />
            <FormInput
              placeholder={"Smith"}
              title={"Last Name"}
              type={"text"}
            />
            <FormInput
              placeholder={"@adamsmith"}
              title={"Username"}
              type={"text"}
            />
            <FormInput
              placeholder={"adam@example.com"}
              title={"E-mail"}
              type={"email"}
            />
            <FormInput
              placeholder={"Enter password"}
              title={"Password"}
              type={"password"}
            />
            <FormInput
              placeholder={"Confirm password"}
              title={"Confirm Password"}
              type={"password"}
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

            <AnimatedButton
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
