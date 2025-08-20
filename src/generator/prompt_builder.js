// Constrói os prompt's para que o generator possa usar - 3
import { getCardsFromCategory } from "../api/communication_api.js"
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function promptBuilder(jsonPromptPath, category)
{
    const fullPath = path.resolve(__dirname, "../../", jsonPromptPath);
    let jsonPrompt = JSON.parse(await readFile(fullPath, "utf-8"));
    const cards = await getCardsFromCategory(category);
    let prompt = jsonPrompt["gerar-carta"] + "\n" + JSON.stringify(cards);
    return prompt;
}

export async function promptBuilderCase(category) {
    category = category.charAt(0).toUpperCase() + category.slice(1);
    console.log(category);
    
    switch (category) {
        case "Local":
            return await promptBuilder("prompts/local.json", category);
        break;
        case "Momento":
            return await promptBuilder("prompts/momento.json", category);
        break;
        case "Objeto":
            return await promptBuilder("prompts/objeto.json", category);
        break;
        case "Pessoa":
            return await promptBuilder("prompts/pessoa.json", category);
        break;
        case "Pop":
            return await promptBuilder("prompts/pop.json", category);
        break;
    
        default:
            console.log("Categoria inválida, tente novamente!");
            return null;
        break;
    }
}