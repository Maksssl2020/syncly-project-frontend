import FormFileInput from "../input/FormFileInput.tsx";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";
import { useForm } from "react-hook-form";
import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { LinkIcon } from "lucide-react";
import FormInput from "../input/FormInput.tsx";
import { extractYoutubeId } from "../../utils/youtube.ts";
import type { VideoPostRequest } from "../../types/post.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { videoPostValidator } from "../../validators/postValidators.ts";
import toast from "react-hot-toast";
import type { MediaRequest } from "../../types/media.ts";

type VideoPostFormProps = {
  onSubmit: (data: VideoPostRequest) => void;
};

const VideoPostForm = forwardRef<HTMLFormElement, VideoPostFormProps>(
  ({ onSubmit }, ref) => {
    const [selectedVideoType, setSelectedVideoType] = useState<
      "NONE" | "FILE" | "URL"
    >("NONE");

    const [addedVideoFiles, setAddedVideoFiles] = useState<File[]>([]);
    const [addedVideoUrls, setAddedVideoUrls] = useState<string[]>([]);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(videoPostValidator),
    });

    const onVideoSubmit = ({
      description,
      tags,
    }: {
      description: string;
      tags?: string[] | undefined;
    }) => {
      if (addedVideoFiles.length == 0 && addedVideoUrls.length == 0) {
        toast.error("Add at least 1 photo!");
      } else {
        let videos: MediaRequest[];

        if (addedVideoFiles.length > 0) {
          videos = addedVideoFiles.map((file) => ({
            mediaFile: file,
            mediaType: "VIDEO",
          }));
        } else {
          videos = addedVideoUrls.map((url) => ({
            url: url,
            mediaType: "VIDEO",
          }));
        }

        onSubmit({
          description: description,
          videos: videos,
          tags: tags,
        });
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
        <div
          className={`w-full ${selectedVideoType === "NONE" ? "grid grid-cols-2 gap-4" : ""}`}
        >
          {(selectedVideoType === "FILE" || selectedVideoType === "NONE") && (
            <FormFileInput
              title={"Drop your videos here of click to browse"}
              description={"MP4"}
              maxFiles={8}
              multiple={true}
              accept=".mp4"
              onChangeMultiple={(value) => {
                if (value) {
                  setAddedVideoFiles((prev) => {
                    const combined = [...prev, ...value];
                    return combined.slice(0, 8);
                  });
                }
              }}
              onClick={() => setSelectedVideoType("FILE")}
            />
          )}
          {(selectedVideoType === "NONE" || selectedVideoType === "URL") && (
            <>
              {selectedVideoType === "NONE" ? (
                <motion.label
                  whileHover={{
                    color: "#14b8a6",
                    borderColor: "#14b8a6",
                  }}
                  style={{
                    backgroundColor: "#171719",
                    color: "#e6e6e6",
                  }}
                  onClick={() => setSelectedVideoType("URL")}
                  htmlFor={"filesInput"}
                  className={
                    "border-2 border-dashed rounded-lg h-auto p-8 text-center border-gray-600"
                  }
                >
                  <LinkIcon className={"size-12 mx-auto mb-4 stroke-1"} />
                  <p className={"mb-4"}>Add video links</p>
                  <p className={"text-xs mt-2 "}>URL</p>
                </motion.label>
              ) : (
                <FormInput
                  title={""}
                  type={"url"}
                  placeholder={
                    "Write or paste a link and accept by pressing ENTER "
                  }
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
              )}
            </>
          )}
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
          {addedVideoFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {addedVideoFiles.map((file, index) => (
                <div key={index} className="relative">
                  <video
                    src={URL.createObjectURL(file)}
                    controls
                    className="w-full h-auto object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    onClick={() =>
                      setAddedVideoFiles(
                        addedVideoFiles.filter((_, i) => i !== index),
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
        <TagSelector onSelectTag={(value) => setValue("tags", value)} />
        <button type="submit" className="hidden" />
      </form>
    );
  },
);

export default VideoPostForm;
