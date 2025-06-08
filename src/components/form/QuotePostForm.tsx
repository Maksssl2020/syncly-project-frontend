import FormTextArea from "../input/FormTextarea.tsx";
import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import TagSelector from "../select/TagSelector.tsx";

const QuotePostForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      quote: "",
      source: "",
    },
  });

  return (
    <div className={"space-y-4"}>
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
      <TagSelector />
    </div>
  );
};

export default QuotePostForm;
