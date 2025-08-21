// Converte o texto gerado pela IA para JSON válido (CreateCardRequestDto) - 4

export function ToCardDto(response) {
    try {
        response = JSON.parse(response);
        return {
            answer: response?.answer,
            category: response?.category,
            tips: response?.tips
        }

    } catch (error) {
        console.log('Invalid JSON: ', response);   
    }
}