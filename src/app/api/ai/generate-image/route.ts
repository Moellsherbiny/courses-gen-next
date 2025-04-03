import { NextResponse } from "next/server";
import Replicate from "replicate";
import { uploadImage } from "@/lib/cloudinary";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || "",
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          num_outputs: 1,
          refine: "expert_ensemble_refiner",
          scheduler: "K_EULER",
        },
      }
    );

    
    const imageUrl = Array.isArray(output) ? output[0].url() : output;
    console.log("Model run complete", imageUrl);
    const cldImg = await uploadImage(imageUrl.href);
    console.log("📤 Uploaded image URL:", cldImg);
    return NextResponse.json({ imageUrl: cldImg || null });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "فشل إنشاء الصورة" }, { status: 500 });
  }
}
