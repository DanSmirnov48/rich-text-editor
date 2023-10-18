import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
        return new Response(
            "Missing OPENAI_API_KEY – make sure to add it to your .env file.",
            {
                status: 400,
            },
        );
    }
    if (
        process.env.NODE_ENV != "development" &&
        process.env.KV_REST_API_URL &&
        process.env.KV_REST_API_TOKEN
    ) {
    }

    let { prompt } = await req.json();

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "You are an AI writing assistant that continues existing text based on context from prior text. " +
                    "Give more weight/priority to the later characters than the beginning ones. " +
                    "Limit your response to no more than 300 characters, but make sure to construct complete sentences.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.6,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        n: 1,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
