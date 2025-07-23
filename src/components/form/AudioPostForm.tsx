import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";
import { forwardRef, useState } from "react";
import FormFileInput from "../input/FormFileInput.tsx";
import { motion } from "framer-motion";
import { LinkIcon } from "lucide-react";
import { audioPostValidator } from "../../validators/postValidators.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AudioPostRequest } from "../../types/post.ts";
import toast from "react-hot-toast";
import type { MediaRequest } from "../../types/media.ts";

type AudioPostFormProps = {
  onSubmit: (data: AudioPostRequest) => void;
};

const AudioPostForm = forwardRef<HTMLFormElement, AudioPostFormProps>(
  ({ onSubmit }, ref) => {
    const [selectedAudioType, setSelectedAudioType] = useState<
      "NONE" | "FILE" | "URL"
    >("NONE");

    const [addedAudioFile, setAddedAudioFile] = useState<File | undefined>(
      undefined,
    );
    const [addedAudioUrl, setAddedAudioUrl] = useState<string | undefined>(
      undefined,
    );

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(audioPostValidator),
    });

    const onAudioSubmit = ({
      songTitle,
      artist,
      yourThoughts,
      tags,
    }: {
      songTitle: string;
      artist: string;
      yourThoughts: string;
      tags?: string[] | undefined;
    }) => {
      console.log("TEST");

      if (!addedAudioFile && !addedAudioUrl) {
        toast.error("Add at least 1 photo!");
      } else {
        let audios: MediaRequest;

        if (addedAudioFile) {
          audios = {
            mediaFile: addedAudioFile,
            mediaType: "AUDIO",
          };
        } else {
          audios = {
            url: addedAudioUrl,
            mediaType: "AUDIO",
          };
        }

        onSubmit({
          songTitle: songTitle,
          audio: audios,
          artist: artist,
          yourThoughts: yourThoughts,
          tags: tags,
        });
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit((data) =>
          onAudioSubmit({
            songTitle: data.songTitle,
            artist: data.artist,
            yourThoughts: data.yourThoughts,
            tags: data.tags,
          }),
        )}
        className={"space-y-4"}
      >
        <div
          className={`w-full ${selectedAudioType === "NONE" ? "grid grid-cols-2 gap-4" : ""}`}
        >
          {(selectedAudioType === "FILE" || selectedAudioType === "NONE") && (
            <FormFileInput
              title={"Drop your audio here or click to browse"}
              description={"MP3, WAV, OGG"}
              maxFiles={8}
              multiple={false}
              accept=".mp3,.wav,.ogg"
              onChange={(value) => {
                if (value) {
                  setAddedAudioFile(value);
                }
              }}
              onClick={() => setSelectedAudioType("FILE")}
            />
          )}
          {(selectedAudioType === "NONE" || selectedAudioType === "URL") && (
            <>
              {selectedAudioType === "NONE" ? (
                <motion.label
                  whileHover={{
                    color: "#14b8a6",
                    borderColor: "#14b8a6",
                  }}
                  style={{
                    backgroundColor: "#171719",
                    color: "#e6e6e6",
                  }}
                  onClick={() => setSelectedAudioType("URL")}
                  htmlFor={"filesInput"}
                  className={
                    "border-2 border-dashed rounded-lg h-auto p-8 text-center border-gray-600"
                  }
                >
                  <LinkIcon className={"size-12 mx-auto mb-4 stroke-1"} />
                  <p className={"mb-4"}>Add photo links</p>
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
                      setAddedAudioUrl(url);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
              )}
            </>
          )}
        </div>
        <div className={"w-full flex flex-col gap-3 h-auto"}>
          {addedAudioUrl && (
            <>
              <div key={addedAudioUrl} className="relative">
                <audio
                  src={addedAudioUrl}
                  controls
                  className="w-full h-[50px] object-cover rounded-lg border border-gray-700"
                />
                <button
                  onClick={() => setAddedAudioUrl(undefined)}
                  className="absolute top-2 right-2 text-white bg-black bg-opacity-50 px-2 py-1 text-xs rounded"
                >
                  ×
                </button>
              </div>
            </>
          )}
          {addedAudioFile && (
            <>
              <div className="relative">
                <audio
                  src={URL.createObjectURL(addedAudioFile)}
                  controls
                  className="w-[90%] h-[50px] object-cover rounded-full border border-gray-700"
                />
                <button
                  onClick={() => setAddedAudioFile(undefined)}
                  className="absolute top-4 right-2 text-white bg-black bg-opacity-50 px-2 py-1 text-xs rounded"
                >
                  ×
                </button>
              </div>
            </>
          )}
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
          <FormInput
            title={"Song Title"}
            type={"text"}
            register={register("songTitle")}
            error={errors?.songTitle?.message}
            placeholder={"Song name"}
          />
          <FormInput
            title={"Artist"}
            type={"text"}
            register={register("artist")}
            error={errors?.artist?.message}
            placeholder={"Artist name"}
          />
        </div>

        <FormTextArea
          title={"Your thoughts"}
          placeholder={"What do you think about this song?"}
          rows={3}
          register={register("yourThoughts")}
          error={errors?.yourThoughts?.message}
        />
        <TagSelector onSelectTag={(value) => setValue("tags", value)} />
        <button type="submit" className="hidden" />
      </form>
    );
  },
);

export default AudioPostForm;
