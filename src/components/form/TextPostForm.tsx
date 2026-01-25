import FormInput from "../input/FormInput.tsx";
import { useForm } from "react-hook-form";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { textPostValidator } from "../../validators/postValidators.ts";
import type {
  TextPost,
  TextPostRequest,
  UpdateTextPostRequest,
} from "../../types/post.ts";
import { forwardRef, useEffect } from "react";
import type { InferType } from "yup";

type TextPostFormProps =
  | {
      isEdit?: false;
      onSubmit: (data: TextPostRequest) => void;
      postToEdit?: never;
    }
  | {
      isEdit: true;
      onSubmit: (data: UpdateTextPostRequest) => void;
      postToEdit: TextPost;
    };

type TextPostFormData = InferType<typeof textPostValidator>;

const TextPostForm = forwardRef<HTMLFormElement, TextPostFormProps>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(textPostValidator),
    });

    useEffect(() => {
      if (props.isEdit && props.postToEdit) {
        const mappedTags = props.postToEdit.tags.map((tag) => tag.name);
        setValue("title", props.postToEdit.title);
        setValue("content", props.postToEdit.content);
        setValue("tags", mappedTags);
      }
    }, [props.isEdit, props.postToEdit, setValue]);

    const onSubmitClick = (data: TextPostFormData) => {
      const textPostRequestData: TextPostRequest = {
        title: data.title,
        content: data.content,
        tags: data.tags,
      };

      if (props.isEdit) {
        const updateTextPostRequest: UpdateTextPostRequest = {
          initialData: props.postToEdit,
          updatedData: textPostRequestData,
        };
        props.onSubmit(updateTextPostRequest);
      } else {
        props.onSubmit(textPostRequestData);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmitClick)}
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
        <TagSelector
          initialTags={props.postToEdit?.tags ?? []}
          onSelectTag={(value) => setValue("tags", value)}
        />
        <button type="submit" className="hidden" />
      </form>
    );
  },
);

export default TextPostForm;
