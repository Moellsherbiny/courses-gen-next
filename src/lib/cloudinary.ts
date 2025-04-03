import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads an image to Cloudinary.
 * @param image - The image file path or base64 string.
 * @returns The public ID of the uploaded image.
 */
async function uploadImage(image: string): Promise<string | null> {
  if (!image) throw new Error("== The Image is Required ==");

  try {
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "dr-mai", // Change this folder name if needed
    });

    console.log("✅ Image uploaded successfully:", uploadRes.public_id);
    return uploadRes.public_id;
  } catch (error) {
    console.error("❌ Error uploading image to Cloudinary:", error);
    return null; // Return null instead of undefined for better handling
  }
}

function getImageUrl(image: string): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${image}`;
}

export default cloudinary;
export { uploadImage, getImageUrl };
