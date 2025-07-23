import FormInput from "../input/FormInput.tsx";
import { useForm } from "react-hook-form";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { textPostValidator } from "../../validators/postValidators.ts";
import type { TextPostRequest } from "../../types/post.ts";
import { forwardRef } from "react";

type TextPostFormProps = {
  onSubmit: (data: TextPostRequest) => void;
};

const TextPostForm = forwardRef<HTMLFormElement, TextPostFormProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(textPostValidator),
    });

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit((data) => {
          onSubmit({
            title: data.title,
            content: data.content,
            tags: data.tags,
          });
        })}
        className={"space-y-4"}
      >
        <FormInput
          title={"Title (optional)"}
          type={"text"}
          placeholder={"Add a title..."}
          register={register("title")}
          error={errors?.title?.message}
        />
        <FormTextArea
          title={"Content"}
          placeholder={"What's on your mind?"}
          rows={6}
          register={register("content")}
          error={errors?.content?.message}
        />
        <TagSelector onSelectTag={(value) => setValue("tags", value)} />
        <button type="submit" className="hidden" />
      </form>
    );
  },
);

export default TextPostForm;
