import { default as axios } from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const API_KEY = process.env.API_KEY
const headers = {
    "Content-Type": "application/json",
    "X-API-KEY" : API_KEY
}

// Se comunica com a API, recebe as cartas que já existem via GET e envia as cartas geradas com POST - 1
// Precisa refatorar!
export async function getCardsFromCategory(category) {
    try {
        let res = await axios.get(`${process.env.URL_API}api/card/Category/${category}`, { headers });
        console.log(`Status : ${res.status}`)
        return res.data;
    } catch (error) {
        console.error('Erro ao buscar cartas da categoria:', category, error.message);
        return [];
    }
}
export async function createCard(createCardDto) {
    try {
        let res = await axios.post(`${process.env.URL_API}api/Card/`, createCardDto, { headers });
        console.log(`Status : ${res.status}`)
    } catch (error) {
        console.error('Erro ao criar carta:', error.message);
    }
}
