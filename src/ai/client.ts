'use server'

const GEMINI_URL =process.env.ACCESS_URL;

export async function askGemini(prompt: string) {
    const res = await fetch(
        `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 200,
                    temperature: 0.7
                }
            })
        }
    );

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    const data = await res.json();

    return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Нет ответа"
    );
}
