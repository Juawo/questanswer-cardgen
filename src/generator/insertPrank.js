import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { promptBuilder, promptBuilderCase } from "./prompt_builder.js";
import { generateCard } from "./generator.js";

// Adiciona "pegadinhas" nas cartas geradas

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function addPrankInCard(card) {
    try {
        let prank = rafflePrankChanceAndPosition();
        if (prank.prankNum == 0) return card;
        prank = await raffleDefautlPrank(prank);
        for (let index = 0; index < prank.prankNum; index++) {
            card.tips[prank.positions[index]] = prank.pranks[index];
        }
        return card;
    } catch (error) {
        console.error('Erro ao adicionar pegadinha na carta:', error.message);
        return card;
    }
}

// Sorteia se haverá pegadinhas e em quais posições estarão
function rafflePrankChanceAndPosition() {
    let prankChanceObj = {
        prankNum: 0,
        pranks : [],
        positions : []
    };

    const prankChance = Math.random() * 0.1 + 0.3; // valor entre 0.3 e 0.4
    
    if (Math.random() < prankChance) {
        // Vai adicionar pegadinhas
        const numPrank = Math.floor(Math.random() * 2) + 1; // 1 a 2 pegadinhas
        prankChanceObj.prankNum = numPrank

        const positions = [];
        while (positions.length < numPrank) {
            const pos = Math.floor(Math.random() * 10); // posições 0-9
            if (!positions.includes(pos)) {
                positions.push(pos);
            }
        }
        prankChanceObj.positions = positions;
    }
    return prankChanceObj
}

// Sorteia quais pegadinhas serão esccolhidas
async function raffleDefautlPrank(prankObj) {
    try {
        const fullPath = path.resolve(__dirname, "../../", "prompts/prank.json");
        const defaultPranksJson = JSON.parse(await readFile(fullPath, "utf-8"));
        const pranksList = defaultPranksJson["default-pranks"];
        const pranklen = pranksList.length;
        let indexs = [];
        let pranks = [];
        while (indexs.length < prankObj.prankNum) {
            const idx = Math.floor(Math.random() * pranklen);
            if (!indexs.includes(idx) && !pranks.includes(pranksList[idx])) {
                indexs.push(idx);
                pranks.push(pranksList[idx]);
                prankObj.pranks.push(pranksList[idx]);
            }
        }
        return prankObj;
    } catch (error) {
        console.error('Erro ao sortear pegadinhas:', error.message);
        return prankObj;
    }
}

// let prompt = await promptBuilderCase("objeto");
// let card = await generateCard(prompt); 
// console.log(await addPrankInCard(card));
