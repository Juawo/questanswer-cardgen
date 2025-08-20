import { Groq } from 'groq-sdk';
import { promptBuilderCase } from './prompt_builder.js';
// import { promptBuilderCase } from './prompt_builder';
// Recebe os prompts de prompt_builder e se comunica com a IA e cria novas cartas - 2

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateCard(prompt) {
    const chatCompletion = await getGroqChatCompletion(prompt);

    console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(prompt) {
    if (prompt != null) {
        return groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "openai/gpt-oss-20b",
        });
    }
}

let prompt = await promptBuilderCase("pop");
console.log(prompt);

generateCard(prompt);
