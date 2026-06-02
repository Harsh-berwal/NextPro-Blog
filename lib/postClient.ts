import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Client-side hook to upload an image via the Convex storage upload URL.
export function usePostUploadImage() {
  const generateImageUploadUrl = useMutation(api.post.generateImageUploadUrl);

  return async (file: File): Promise<string> => {
    const allowed = ["image/jpeg", "image/pjpeg"];
    if (!allowed.includes(file.type)) {
      throw new Error("Only JPG/JPEG image files are allowed.");
    }

    const uploadUrl: string = await generateImageUploadUrl();
    if (!uploadUrl) throw new Error("No upload URL returned from server");

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    try {
      const data = await response.json();
      const storageId = data?.storageId ?? data?.storageId?._id ?? data?.id;
      if (!storageId) {
        throw new Error("Upload succeeded but no storage id was returned.");
      }
      return storageId;
    } catch {
      throw new Error("Upload succeeded but the storage id response could not be parsed.");
    }
  };
}
