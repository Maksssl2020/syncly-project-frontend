import FormTextArea from "../input/FormTextarea.tsx";
import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import TagSelector from "../select/TagSelector.tsx";
import type { QuotePost, QuotePostRequest, UpdateQuotePostRequest } from "../../types/post.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { quotePostValidator } from "../../validators/postValidators.ts";
import { forwardRef, useEffect } from "react";
import type { InferType } from "yup";

type QuotePostFormProps =
  | {
      isEdit?: false;
      onSubmit: (data: QuotePostRequest) => void;
      postToEdit?: never;
    }
  | {
      isEdit: true;
      onSubmit: (data: UpdateQuotePostRequest) => void;
      postToEdit: QuotePost;
    };

type QuotePostFormType = InferType<typeof quotePostValidator>;

const QuotePostForm = forwardRef<HTMLFormElement, QuotePostFormProps>(
  (props, ref) => {
    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
    } = useForm({
      resolver: yupResolver(quotePostValidator),
    });

    useEffect(() => {
      if (props.isEdit) {
        const mappedTags = props.postToEdit.tags.map((tag) => tag.name);
        setValue("quote", props.postToEdit.quote);
        setValue("source", props.postToEdit.source);
        setValue("tags", mappedTags);
      }
    }, [props.isEdit, props.postToEdit, setValue]);

    const onSubmitClick = (data: QuotePostFormType) => {
      const quotePostRequest: QuotePostRequest = {
        quote: data.quote,
        tags: data.tags,
        source: data.source,
        type: "quote",
      };

      if (props.isEdit) {
        const updateQuotePostRequest: UpdateQuotePostRequest = {
          initialData: props.postToEdit,
          updatedData: quotePostRequest,
        };
        props.onSubmit(updateQuotePostRequest);
      } else {
        props.onSubmit(quotePostRequest);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmitClick)}
        className={"space-y-4"}
      >
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
        <TagSelector
          initialTags={props.postToEdit?.tags ?? []}
          onSelectTag={(value) => setValue("tags", value)}
        />
        <button type="submit" className="hidden" />
      </form>
    );
  },
);

export default QuotePostForm;
