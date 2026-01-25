import { useCallback, useMemo, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import AnimatedButton from "../button/AnimatedButton.tsx";

type AvatarCropperProps = {
  file: File;
  onCropComplete: (croppedAreaPixels: string) => void;
  onCancel: () => void;
};

function getCroppedImg(
  imageSrc: string,
  crop: any,
  // @ts-ignore
  fileName: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject("No 2d context");
        return;
      }

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height,
      );

      // Base64 output
      resolve(canvas.toDataURL("image/jpeg"));
    };
    image.onerror = (error) => reject(error);
  });
}

const AvatarCropper = ({
  file,
  onCropComplete,
  onCancel,
}: AvatarCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const imageUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useState(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  });

  const onCropCompleteHandler = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const onSave = async () => {
    if (!file) return;

    const imageSrc = URL.createObjectURL(file);
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        file.name,
      );
      onCropComplete(croppedImage);
    } catch (e) {
      console.error(e);
    } finally {
      URL.revokeObjectURL(imageSrc);
    }
  };
  return (
    <div className={"flex w-full gap-8"}>
      <div className={"size-[300px] relative"}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteHandler}
        />
      </div>
      <div className={"flex flex-col gap-2 "}>
        <div style={{ marginTop: 10 }}>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
        <div className={"w-full flex  gap-4"}>
          <AnimatedButton
            onClick={onCancel}
            className={"h-[40px] px-12 rounded-lg"}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            className={"h-[40px] px-12 rounded-lg"}
            onClick={onSave}
          >
            Save
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default AvatarCropper;
