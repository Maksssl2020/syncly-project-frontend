import { useForm } from "react-hook-form";
import FormFileInput from "../input/FormFileInput.tsx";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";
import { forwardRef, useEffect, useState } from "react";
import FormInput from "../input/FormInput.tsx";
import { motion } from "framer-motion";
import { LinkIcon } from "lucide-react";
import { photoPostValidator } from "../../validators/postValidators.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import type { PhotoPost, PhotoPostRequest, UpdatePhotoPostRequest } from "../../types/post.ts";
import toast from "react-hot-toast";
import type { MediaRequest } from "../../types/media.ts";
import type { InferType } from "yup";

type PhotoPostFormProps =
  | {
      isEdit?: false;
      onSubmit: (data: PhotoPostRequest) => void;
      postToEdit?: never;
    }
  | {
      isEdit: true;
      onSubmit: (data: UpdatePhotoPostRequest) => void;
      postToEdit: PhotoPost;
    };

function base64ToFile(base64: string, filename: string, mime = "image/jpeg") {
  const clean = base64.replace(/\s/g, "");

  const byteString = atob(clean);
  const len = byteString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = byteString.charCodeAt(i);
  }

  return new File([bytes], filename, { type: mime });
}

type PhotoPostFormType = InferType<typeof photoPostValidator>;

const PhotoPostForm = forwardRef<HTMLFormElement, PhotoPostFormProps>(
  (props, ref) => {
    const [selectedPhotoType, setSelectedPhotoType] = useState<
      "NONE" | "FILE" | "URL"
    >("NONE");

    const [addedPhotoFiles, setAddedPhotoFiles] = useState<File[]>([]);
    const [addedPhotoUrls, setAddedPhotoUrls] = useState<string[]>([]);

    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
    } = useForm({
      resolver: yupResolver(photoPostValidator),
    });

    useEffect(() => {
      if (props.isEdit) {
        const mappedTags = props.postToEdit.tags.map((tag) => tag.name);
        setValue("tags", mappedTags);
        setValue("caption", props.postToEdit.caption);
        const canParse = URL.canParse(props.postToEdit.imageUrls[0]);
        if (canParse) {
          setAddedPhotoUrls(props.postToEdit.imageUrls);
          setSelectedPhotoType("URL");
        } else {
          console.log(props.postToEdit.imageUrls);

          const mappedImages = props.postToEdit.imageUrls.map((url, index) =>
            base64ToFile(url, `file${index}`),
          );
          setAddedPhotoFiles(mappedImages);
          setSelectedPhotoType("FILE");
        }
        console.log("EDIT");
        console.log("EDIT");
      }
    }, [props.isEdit, props.postToEdit, setValue]);

    const onPhotoSubmit = (data: PhotoPostFormType) => {
      console.log("TEST");

      if (addedPhotoFiles.length == 0 && addedPhotoUrls.length == 0) {
        toast.error("Add at least 1 photo!");
      } else {
        let photos: MediaRequest[];

        if (addedPhotoFiles.length > 0) {
          photos = addedPhotoFiles.map((file) => ({
            mediaFile: file,
            mediaType: "IMAGE",
          }));
        } else {
          photos = addedPhotoUrls.map((url) => ({
            url: url,
            mediaType: "IMAGE",
          }));
        }

        const photoPostRequest: PhotoPostRequest = {
          caption: data.caption,
          photos: photos,
          tags: data.tags,
        };

        if (props.isEdit) {
          props.onSubmit({
            initialData: props.postToEdit,
            updatedData: photoPostRequest,
          });
        } else {
          props.onSubmit(photoPostRequest);
        }
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit((data) => {
          onPhotoSubmit({
            caption: data.caption,
            tags: data.tags,
          });
        })}
        className={"space-y-4"}
      >
        <div
          className={`w-full ${selectedPhotoType === "NONE" ? "grid grid-cols-2 gap-4" : ""}`}
        >
          {(selectedPhotoType === "FILE" || selectedPhotoType === "NONE") && (
            <FormFileInput
              title={"Drop your photos here of click to browse"}
              description={"PNG, JPG, GIF"}
              maxFiles={8}
              multiple={true}
              accept=".jpg,.jpeg,.png,.gif"
              onChangeMultiple={(value) => {
                if (value) {
                  setAddedPhotoFiles((prev) => {
                    const combined = [...prev, ...value];
                    return combined.slice(0, 8);
                  });
                }
              }}
              onClick={() => setSelectedPhotoType("FILE")}
            />
          )}
          {(selectedPhotoType === "NONE" || selectedPhotoType === "URL") && (
            <>
              {selectedPhotoType === "NONE" ? (
                <motion.label
                  whileHover={{
                    color: "#14b8a6",
                    borderColor: "#14b8a6",
                  }}
                  style={{
                    backgroundColor: "#171719",
                    color: "#e6e6e6",
                  }}
                  onClick={() => setSelectedPhotoType("URL")}
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
                      if (url && !addedPhotoUrls.includes(url)) {
                        setAddedPhotoUrls([...addedPhotoUrls, url]);
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
          {addedPhotoUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {addedPhotoUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Photo ${index}`}
                    className="w-full h-auto object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    onClick={() =>
                      setAddedPhotoUrls(
                        addedPhotoUrls.filter((_, i) => i !== index),
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
          {addedPhotoFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {addedPhotoFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Photo ${index}`}
                    className="w-full h-auto object-cover rounded-lg border border-gray-700"
                  />
                  <button
                    onClick={() =>
                      setAddedPhotoFiles(
                        addedPhotoFiles.filter((_, i) => i !== index),
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
          title={"Caption"}
          placeholder={"Write a caption for your photos..."}
          rows={3}
          register={register("caption")}
          error={errors?.caption?.message}
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

export default PhotoPostForm;
