import { Groq } from 'groq-sdk';
import { promptBuilderCase } from './prompt_builder.js';
import { ToCardDto } from './parser.js';
// import { promptBuilderCase } from './prompt_builder';
// Recebe os prompts de prompt_builder e se comunica com a IA e cria novas cartas - 2

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateCard(prompt) {
    const chatCompletion = await getGroqChatCompletion(prompt);

    // console.log(chatCompletion.choices[0]?.message?.content || "");
    return ToCardDto(chatCompletion.choices[0]?.message?.content);
}

export async function generatePrank(prompt) {
    const chatCompletion = await getGroqChatCompletion(prompt);
}

export async function getGroqChatCompletion(prompt, model="openai/gpt-oss-20b") {
    if (prompt != null) {
        return groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: model,
        });
    }
}
