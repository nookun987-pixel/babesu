export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  async function callGemini(retries = 3) {
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (r.status === 429 && retries > 0) {
      await new Promise(s => setTimeout(s, (4 - retries) * 1000));
      return callGemini(retries - 1);
    }

    if (!r.ok) {
      throw new Error("Gemini error " + r.status);
    }

    return r.json();
  }

  try {
    const data = await callGemini();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
