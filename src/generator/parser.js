// Converte o texto gerado pela IA para JSON válido (CreateCardRequestDto) - 4

export function ToCardDto(response) {
    response = JSON.parse(response);
    return {
        answer: response?.answer,
        category: response?.category,
        tips: response?.tips
    }
}