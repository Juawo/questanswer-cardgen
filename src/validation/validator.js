// Valida as cartas geradas por generator - 5

export function validateCard(card) {
    const categories = ["loca", "momento", "objeto", "pessoa", "pop"]
    if (!card?.answer || !card?.category || !card?.tips) {
        console.log("Essa carta possui campos nulos. Geração cancelada.");
        return null;
    }
    if (card?.category in categories == false) {
        console.log("A categoria dessa carta não está dentro das categorias previstas. Geração cancelada.");
        return null;
    }
    if (card?.tips.length != 10) {
        console.log("A carta não possui 10 dicas. Geração Cancelada.");
    }

    console.log("A carta é válida! Geração permitida!");
    return card;
}