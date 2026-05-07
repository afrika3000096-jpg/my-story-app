import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
},
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "당신은 따뜻한 자서전 글쓰기 코치입니다.",
          },
          {
            role: "user",
            content: req.body.prompt,
          },
        ],
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    console.log(data);

    res.json({
      result:
        data.choices?.[0]?.message?.content ||
        "AI 응답이 없습니다.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI 서버 오류",
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
