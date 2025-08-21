import { default as axios } from "axios";
import dotenv from "dotenv";
dotenv.config();

// Se comunica com a API, recebe as cartas que já existem via GET e envia as cartas geradas com POST - 1
// Precisa refatorar!
export async function getCardsFromCategory(category) {
    try {
        let res = await axios.get(`${process.env.URL_API}api/card/Category/${category}`);
        return res.data;
    } catch (error) {
        console.error('Erro ao buscar cartas da categoria:', category, error.message);
        return [];
    }
}
export async function createCard(createCardDto) {
    try {
        await axios.post(`${process.env.URL_API}api/Card/`, createCardDto);
    } catch (error) {
        console.error('Erro ao criar carta:', error.message);
    }
}
