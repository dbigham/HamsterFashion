import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.OpenAISecretKey;
const openaiClient = apiKey ? new OpenAI({ apiKey }) : null;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/status", (_req, res) => {
  res.json({ hasOpenAIKey: Boolean(openaiClient) });
});

app.post("/api/fashion-story", async (req, res) => {
  if (!openaiClient) {
    return res.status(500).json({ error: "Missing OpenAI API key on the server." });
  }

  const selections = Array.isArray(req.body?.selections) ? req.body.selections : [];
  const lookDescription = selections.length
    ? selections.map((item) => `${item.name} (${item.category})`).join(", ")
    : "no accessories yet";

  try {
    const response = await openaiClient.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: "You are a spirited hamster fashion stylist who writes playful runway recaps.",
        },
        {
          role: "user",
          content: `Describe the hamster outfit featuring: ${lookDescription}. Keep it to two whimsical sentences.`,
        },
      ],
      max_output_tokens: 180,
      temperature: 0.8,
    });

    const story = (response.output_text ?? "").trim();
    const fallback = "Our AI stylist is dazzled into silence. Try another combination!";
    res.json({ story: story || fallback });
  } catch (error) {
    console.error("Failed to generate fashion story", error);
    res.status(500).json({ error: "Unable to generate story from OpenAI." });
  }
});

app.post("/api/hamster-photo", async (req, res) => {
  if (!openaiClient) {
    return res.status(500).json({ error: "Missing OpenAI API key on the server." });
  }

  const selections = Array.isArray(req.body?.selections) ? req.body.selections : [];
  const accessories = selections
    .filter((entry) => entry && typeof entry === "object")
    .map((entry) => ({
      name: typeof entry.name === "string" ? entry.name : "",
      category: typeof entry.category === "string" ? entry.category : "",
      description: typeof entry.description === "string" ? entry.description : "",
    }))
    .filter((entry) => entry.name || entry.category || entry.description);

  const accessorySummary = accessories.length
    ? accessories
        .map((item) => {
          const pieces = [item.name, item.category].filter(Boolean);
          return pieces.join(" ");
        })
        .join(", ")
    : "no accessories";

  const richDetails = accessories
    .map((item) => item.description)
    .filter(Boolean)
    .join(" ");

  const prompt = [
    "Photorealistic, high-resolution studio photograph of an adorable hamster standing upright.",
    accessories.length
      ? `The hamster is wearing ${accessorySummary}, styled with ${richDetails || "playful details"}.`
      : "The hamster is freshly groomed with plush fur and bright eyes.",
    "Soft diffused lighting, shallow depth of field, sharp focus, cinematic glow.",
    "Realistic textures, no illustrations or cartoons.",
  ]
    .filter(Boolean)
    .join(" ");

  try {
    const response = await openaiClient.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "512x512",
      quality: "high",
      response_format: "b64_json",
    });

    const imageBase64 = response.data?.[0]?.b64_json;
    if (!imageBase64) {
      throw new Error("Missing image data from OpenAI response");
    }

    const image = `data:image/png;base64,${imageBase64}`;
    const alt = accessories.length
      ? `Realistic hamster wearing ${accessories.map((item) => item.name).filter(Boolean).join(", ")}.`
      : "Realistic portrait of a hamster with soft lighting.";

    res.json({ image, alt });
  } catch (error) {
    console.error("Failed to generate realistic hamster image", error);
    res.status(500).json({ error: "Unable to generate hamster photo from OpenAI." });
  }
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Hamster Fashion server listening on http://localhost:${PORT}`);
});



