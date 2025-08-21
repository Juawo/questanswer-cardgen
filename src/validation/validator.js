// Valida as cartas geradas por generator - 5

export function validateCard(card, existingCards) {
    try {
        const categories = ["local", "momento", "objeto", "pessoa", "pop"];
        console.log(card.category);
        
        if (!card?.answer || !card?.category || !card?.tips) {
            console.log("Essa carta possui campos nulos. Geração cancelada.");
            return null;
        }
        if (!categories.includes(card.category)) {
            console.log("A categoria dessa carta não está dentro das categorias previstas. Geração cancelada.");
            return null;
        }
        if (card?.tips.length != 10) {
            console.log("A carta não possui 10 dicas. Geração Cancelada.");
            return null;
        }
        
        if (existingCards.find(existingCard => existingCard.answer === card.answer && existingCard.category === card.category)) {
            console.log("Essa carta já existe na base de dados.", card.answer, "Geração Cancelada.");
            return null;
        }

        console.log("A carta é válida! Geração permitida!");
        return card;
    } catch (error) {
        console.error("Erro ao validar carta:", error.message);
        return null;
    }
}