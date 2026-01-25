import { forwardRef, useEffect, useState } from "react";
import FormInput from "../input/FormInput.tsx";
import { useForm } from "react-hook-form";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";
import useFetchLinkPreviewMutation from "../../hooks/mutations/useFetchLinkPreviewMutation.ts";
import type { LinkPreviewResponse } from "../../types/linkPreview.ts";
import { linkPostValidator } from "../../validators/postValidators.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import type {
  LinkPost,
  LinkPostRequest,
  UpdateLinkPostRequest,
} from "../../types/post.ts";
import toast from "react-hot-toast";
import type { InferType } from "yup";

type LinkPostFormProps =
  | {
      isEdit?: false;
      onSubmit: (data: LinkPostRequest) => void;
      postToEdit?: never;
    }
  | {
      isEdit: true;
      onSubmit: (data: UpdateLinkPostRequest) => void;
      postToEdit: LinkPost;
    };

type LinkPostFormType = InferType<typeof linkPostValidator>;

const LinkPostForm = forwardRef<HTMLFormElement, LinkPostFormProps>(
  (props, ref) => {
    const [addedUrls, setAddedUrls] = useState<string[]>([]);
    const [urlsPreview, setUrlsPreview] = useState<LinkPreviewResponse[]>([]);
    const { getLinkPreview } = useFetchLinkPreviewMutation();

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(linkPostValidator),
    });

    useEffect(() => {
      if (props.isEdit) {
        const mappedTags = props.postToEdit.tags.map((tag) => tag.name);
        setValue("title", props.postToEdit.title);
        setValue("description", props.postToEdit.description);
        setValue("tags", mappedTags);
        setAddedUrls(props.postToEdit.urls);
      }
    }, [props.isEdit, props.postToEdit, setValue]);

    const onCreateLinkPostSubmit = (data: LinkPostFormType) => {
      const linkPostRequest = {
        title: data.title,
        description: data.description,
        tags: data.tags,
        links: addedUrls,
      };

      if (addedUrls.length > 0) {
        if (props.isEdit) {
          props.onSubmit({
            initialData: props.postToEdit,
            updatedData: linkPostRequest,
          });
        } else {
          props.onSubmit(linkPostRequest);
        }
      } else {
        toast.error("Provide at least 1 URL.");
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit((data) =>
          onCreateLinkPostSubmit({
            title: data.title,
            description: data.description,
            tags: data.tags,
          }),
        )}
        className={"space-y-4"}
      >
        <FormInput
          title={""}
          type={"url"}
          placeholder={"Write or paste a link and accept by pressing ENTER "}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const url = (e.target as HTMLInputElement).value.trim();
              if (url && !addedUrls.includes(url)) {
                setAddedUrls([...addedUrls, url]);
                const preview = await getLinkPreview(url);

                if (preview) {
                  setUrlsPreview([...urlsPreview, preview]);
                }
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
        />
        <div className={"w-full flex flex-col gap-3 h-auto"}>
          {urlsPreview.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {urlsPreview.map((url, index) => (
                <div
                  key={index}
                  className={
                    "border-2 border-gray-500 bg-black-300 rounded-lg p-4 flex flex-col gap-4 items-center "
                  }
                >
                  {url.image && (
                    <img
                      src={url.image}
                      alt={"preview"}
                      className={"w-full h-auto object-cover rounded-md"}
                    />
                  )}
                  <div>
                    <a
                      href={url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-100 font-semibold cursor-pointer"
                    >
                      {url.title}
                    </a>
                    <p className="text-sm text-white-200 mt-1">
                      {url.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <FormInput
          title={"Title (optional)"}
          type={"text"}
          placeholder={"Link title"}
          register={register("title")}
          error={errors?.title?.message}
        />
        <FormTextArea
          title={"Description"}
          rows={3}
          register={register("description")}
          error={errors?.description?.message}
          placeholder={"Why are you sharing this link?"}
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

export default LinkPostForm;
