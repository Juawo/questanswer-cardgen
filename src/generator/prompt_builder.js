// Constrói os prompt's para que o generator possa usar - 3
import { getCardsFromCategory } from "../api/communication_api.js"
import { readFile } from "fs/promises";


export async function promptBuilder(jsonPromptPath, category)
{
    let jsonPrompt = JSON.parse(await readFile(jsonPromptPath, "utf-8"));
    const cards = await getCardsFromCategory(category);
    let prompt = jsonPrompt["gerar-carta"] + "\n" + JSON.stringify(cards);
    return prompt;
}