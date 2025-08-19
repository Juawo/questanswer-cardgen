import { default as axios } from "axios";
import dotenv from "dotenv";
dotenv.config();

// Se comunica com a API, recebe as cartas que já existem via GET e envia as cartas geradas com POST - 1
// Precisa refatorar!
export async function getCardsFromCategory(category) {
    let answers = [];
    let res = await axios.get(`${process.env.URL_API}api/card/Category/${category}`);
    for (const card of res.data) {
        answers.push(card.answer);
        // console.log(card.answer);
    }
    return answers;
}
export async function createCard(createCardDto) {
    await axios.post(`${process.env.API_URL}/api/card/`, createCardDto);
}
