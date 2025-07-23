import FormTextArea from "../input/FormTextarea.tsx";
import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import TagSelector from "../select/TagSelector.tsx";
import type { QuotePostRequest } from "../../types/post.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { quotePostValidator } from "../../validators/postValidators.ts";
import { forwardRef } from "react";

type QuotePostFormProps = {
  onSubmit: (data: QuotePostRequest) => void;
};

const QuotePostForm = forwardRef<HTMLFormElement, QuotePostFormProps>(
  ({ onSubmit }, ref) => {
    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
    } = useForm({
      resolver: yupResolver(quotePostValidator),
    });

    return (
      <form ref={ref} onSubmit={handleSubmit(onSubmit)} className={"space-y-4"}>
        <FormTextArea
          title={"Quote"}
          placeholder={"Enter the quote..."}
          rows={4}
          register={register("quote")}
          error={errors?.quote?.message}
        />
        <FormInput
          title={"Source (optional)"}
          type={"text"}
          register={register("source")}
          error={errors?.source?.message}
          placeholder={"Who said it?"}
        />
        <TagSelector onSelectTag={(value) => setValue("tags", value)} />
        <button type="submit" className="hidden" />
      </form>
    );
  },
);

export default QuotePostForm;
