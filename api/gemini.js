import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY'); // Get free key from Google AI Studio
export default async function handler(req, res) {
    const { prompt, context } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt + JSON.stringify(context));
    res.status(200).json({ response: result.response.text() });
}
