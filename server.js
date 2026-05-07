const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/ai-coach', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.json({ result: data.error?.message || 'OpenAI 오류' });
    }

    res.json({ result: data.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI 서버 오류' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
