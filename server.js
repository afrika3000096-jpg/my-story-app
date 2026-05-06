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

    // 임시 응답
    const story = `
    당신의 이야기는 매우 따뜻하고 소중합니다.
    ${prompt}
    어린 시절의 기억은 삶의 큰 자산입니다.
    `;

    res.json({ result: story });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "서버 오류"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
