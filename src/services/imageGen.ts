import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function generateImage(prompt: string) {
  console.log("Running the model...");
  const input = {
    prompt,
    acpect_ratio: "1:1",
    output_format: "webp",
    output_quality: 80,
    safety_tolerance: 2,
    prompt_upsampling: true,
  };
  const output = await replicate.run("black-forest-labs/flux-schnell", {
    input,
  });

  const imageUrl = Array.isArray(output) ? output[0].url() : output;
  console.log("Model run complete", imageUrl);
  return imageUrl;
}
