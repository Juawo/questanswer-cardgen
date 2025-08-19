import { default as axios } from "axios";

// Se comunica com a API, recebe as cartas que já existem via GET e envia as cartas geradas com POST - 1
// Precisa refatorar!
export async function getCardsFromCategory(category) {
    let answers = [];
    let res = await axios.get(`http://localhost:5161/api/card/category/${category}`)
    for (const card of res.data) {
        answers.push(card.answer);
        console.log(card.answer);
    }
    return answers
}

export async function createCard(createCardDto) {
    await axios.post(`http://localhost:5161/api/card`, createCardDto);
}
