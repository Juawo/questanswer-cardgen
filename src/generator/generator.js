import { Groq } from 'groq-sdk';
import { promptBuilderCase } from './prompt_builder.js';
import { ToCardDto } from './parser.js';
import { addPrankInCard } from './insertPrank.js';
import { validateCard } from '../validation/validator.js';
import { getCardsFromCategory } from '../api/communication_api.js';
// import { promptBuilderCase } from './prompt_builder';
// Recebe os prompts de prompt_builder e se comunica com a IA e cria novas cartas - 2


export async function generateCard(prompt) {
    try {
        const chatCompletion = await getGroqChatCompletion(prompt);
        let card = ToCardDto(chatCompletion.choices[0]?.message?.content);
        if (!validateCard(card, await getCardsFromCategory(card.category)))
        {
            return null;
        }
        console.log("passou do validate");
        
        card = await addPrankInCard(card);
        return card;
    } catch (error) {
        console.error('Erro ao gerar carta:', error.message);
        return null;
    }
}

export async function getGroqChatCompletion(prompt, model="openai/gpt-oss-20b") {
    try {
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
    } catch (error) {
        console.error('Erro ao obter resposta do Groq:', error.message);
        return null;
    }
}
