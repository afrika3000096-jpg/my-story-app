const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Story Server Running");
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
console.log(process.env.OPENAI_API_KEY);
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: `다음 내용을 따뜻한 자서전 문장으로 자연스럽게 다듬어 주세요. 한국어로 작성하세요:\n\n${prompt}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return res.json({
        result:
          data.error?.message || "OpenAI 오류가 발생했습니다.",
      });
    }

    res.json({
      result:
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "AI 응답을 생성하지 못했습니다.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI 서버 오류",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
