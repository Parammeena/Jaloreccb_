import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

const DIALOGFLOW_TOKEN = "YOUR_DIALOGFLOW_ACCESS_TOKEN";
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

app.post("/chat", async (req, res) => {
    const { message } = req.body;
    const sessionId = uuidv4();

    try {
        // Dialogflow API
        const dfResponse = await fetch(`https://api.dialogflow.com/v1/query?v=20150910`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${DIALOGFLOW_TOKEN}` },
            body: JSON.stringify({ query: message, lang: "en", sessionId })
        });
        const dfData = await dfResponse.json();
        const dfReply = dfData.result?.fulfillment?.speech;

        if (dfReply && dfReply.trim() !== "") return res.json({ reply: dfReply });

        // GPT API
        const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${OPENAI_API_KEY}` },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: message }]
            })
        });
        const gptData = await gptResponse.json();
        return res.json({ reply: gptData.choices[0].message.content });

    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "Error connecting to chatbot services." });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
