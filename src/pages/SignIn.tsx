import { useForm } from "react-hook-form";
import Page from "../animation/Page.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { ArrowLeft } from "lucide-react";
import FormInput from "../components/input/FormInput.tsx";
import AnimatedAElement from "../components/a/AnimatedAElement.tsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInValidator } from "../validators/signInValidator.ts";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidator),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    console.log(username, password);
  };

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
                Hello Again!
              </h2>
              <p className={"text-gray-300"}>
                Sign in to your's Syncly account
              </p>
            </div>
          </div>
          <form className={"flex flex-col gap-2"}>
            <FormInput
              placeholder={"Enter your's username"}
              title={"Username"}
              type={"text"}
              register={register("username")}
              error={errors?.username?.message}
            />
            <FormInput
              placeholder={"Enter your's password"}
              title={"Password"}
              type={"password"}
              register={register("password")}
              error={errors?.password?.message}
            />

            <AnimatedButton
              bgColor={"#222222"}
              borderColor={"#14b8a6"}
              onClick={handleSubmit(onSubmit)}
              className={"w-full h-[50px] mt-4 border-2 rounded-lg font-medium"}
            >
              Sign In
            </AnimatedButton>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
          </div>

          <div className={"flex gap-1 items-center justify-center"}>
            <span className={"text-gray-300"}>Don't have an account yet?</span>
            <AnimatedAElement title={"Sign Up"} href={"/sign-up"} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SignIn;
