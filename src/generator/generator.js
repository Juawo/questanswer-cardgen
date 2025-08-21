import { Groq } from 'groq-sdk';
import { promptBuilderCase } from './prompt_builder.js';
import { ToCardDto } from './parser.js';
import { addPrankInCard } from './insertPrank.js';
// import { promptBuilderCase } from './prompt_builder';
// Recebe os prompts de prompt_builder e se comunica com a IA e cria novas cartas - 2


export async function generateCard(prompt) {
    const chatCompletion = await getGroqChatCompletion(prompt);
    
    let card = ToCardDto(chatCompletion.choices[0]?.message?.content);
    card = addPrankInCard(card);
    return card;
}

export async function getGroqChatCompletion(prompt, model="openai/gpt-oss-20b") {
    if (prompt != null) {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
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
