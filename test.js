import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dzk9wr2p6",
  api_key: "716664697867827",
  api_secret: "vubQawoe2P2wDR8F7o9HJsGI6oY",
  secure: true,
});

async function uploadImage(image) {
  if (!image) throw new Error("== The Image is Required ==");

  const uploadRes = await cloudinary.uploader.upload(image, {
    folder: "dr-mai",
  });
  return uploadRes.public_id;
}
export default cloudinary;
export { uploadImage };

// const result = await uploadImage("./src/test.jpg");

const url = cloudinary.url("dr-mai/wyvvbz28ei1hbuoqpkrw")

console.log(url);
