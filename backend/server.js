const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const cors = require("cors"); // Import CORS

const app = express();
app.use(cors());
const port = 8000;
const genAI = new GoogleGenerativeAI("AIzaSyD--nlGPkYJwpN0lwz0Nz6Tawj3X1pxwUk");

app.use(express.json());

app.post("/ask-ai", async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);

    res.json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "AI query failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
