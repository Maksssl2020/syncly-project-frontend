import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";
import { useForm } from "react-hook-form";
import { forwardRef, useEffect, useState } from "react";
import FormInput from "../input/FormInput.tsx";
import { extractYoutubeId } from "../../utils/youtube.ts";
import type {
  UpdateVideoPostRequest,
  VideoPost,
  VideoPostRequest,
} from "../../types/post.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { videoPostValidator } from "../../validators/postValidators.ts";
import toast from "react-hot-toast";
import type { InferType } from "yup";

type VideoPostFormProps =
  | {
      isEdit?: false;
      onSubmit: (data: VideoPostRequest) => void;
      postToEdit?: never;
    }
  | {
      isEdit: true;
      onSubmit: (data: UpdateVideoPostRequest) => void;
      postToEdit: VideoPost;
    };

type VideoPostFormType = InferType<typeof videoPostValidator>;

const VideoPostForm = forwardRef<HTMLFormElement, VideoPostFormProps>(
  (props, ref) => {
    const [addedVideoUrls, setAddedVideoUrls] = useState<string[]>([]);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(videoPostValidator),
    });

    useEffect(() => {
      if (props.isEdit) {
        const mappedTags = props.postToEdit.tags.map((tag) => tag.name);
        setValue("tags", mappedTags);
        setValue("description", props.postToEdit.description);
        setAddedVideoUrls(props.postToEdit.videoUrls);
      }
    }, [props.isEdit, props.postToEdit, setValue]);

    const onVideoSubmit = (data: VideoPostFormType) => {
      const videoPostRequest = {
        description: data.description,
        videoUrls: addedVideoUrls,
        tags: data.tags,
      };

      if (addedVideoUrls.length == 0) {
        toast.error("Add at least 1 photo!");
      } else {
        if (props.isEdit) {
          props.onSubmit({
            initialData: props.postToEdit,
            updatedData: videoPostRequest,
          });
        } else {
          props.onSubmit(videoPostRequest);
        }
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit((data) => {
          onVideoSubmit({
            description: data.description,
            tags: data.tags,
          });
        })}
        className={"space-y-4"}
      >
        <div className={`w-full`}>
          <FormInput
            title={""}
            type={"url"}
            placeholder={"Write or paste a link and accept by pressing ENTER "}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const url = (e.target as HTMLInputElement).value.trim();
                if (url && !addedVideoUrls.includes(url)) {
                  setAddedVideoUrls([...addedVideoUrls, url]);
                  (e.target as HTMLInputElement).value = "";
                }
              }
            }}
          />
        </div>
        <div className={"w-full flex flex-col gap-3 h-auto"}>
          {addedVideoUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {addedVideoUrls.map((url, index) => (
                <div key={index} className="relative">
                  {url.includes("youtube.com") || url.includes("youtu.be") ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYoutubeId(url)}`}
                      className="w-full aspect-video rounded-lg border border-gray-700"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={url}
                      controls
                      className="w-full h-auto object-cover rounded-lg border border-gray-700"
                    />
                  )}
                  <button
                    onClick={() =>
                      setAddedVideoUrls(
                        addedVideoUrls.filter((_, i) => i !== index),
                      )
                    }
                    className="absolute top-2 right-2 text-white bg-black bg-opacity-50 px-2 py-1 text-xs rounded"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <FormTextArea
          title={"Description"}
          register={register("description")}
          error={errors?.description?.message}
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

export default VideoPostForm;
