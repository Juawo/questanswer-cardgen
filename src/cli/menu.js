// Menu em CLI para escolher (Gerar 1 carta de X categoria ou Gerar uma carta de cada categoria)
import readline from 'readline';
import { promptBuilderCase } from '../generator/prompt_builder.js';
import { generateCard } from '../generator/generator.js';
import { create } from 'domain';
import { createCard } from '../api/communication_api.js';

const categories = [
	{ name: 'Pessoa', value: 'pessoa' },
	{ name: 'Objeto', value: 'objeto' },
	{ name: 'Local', value: 'local' },
	{ name: 'Momento', value: 'momento' },
	{ name: 'Pop', value: 'pop' }
];

function showMenu() {
	console.log('=== Criador de Cartas QuestAnswer ===');
	console.log('Escolha a categoria da carta:');
	categories.forEach((cat, idx) => {
		console.log(`${idx + 1} - ${cat.name}`);
	});
	console.log('0 - Sair');
}

export async function mainMenu() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	function showMainMenu() {
		console.log('=== Criador de Cartas QuestAnswer ===');
		console.log('1 - Gerar carta de categoria individual');
		console.log('2 - Gerar uma carta de cada categoria');
		console.log('3 - Gerar X cartas de uma categoria');
		console.log('0 - Sair');
	}

	while (true) {
		showMainMenu();
		const answer = await new Promise(res => rl.question('Opção: ', res));
		const mainOpt = parseInt(answer);
		if (isNaN(mainOpt) || mainOpt < 0 || mainOpt > 3) {
			console.log('Opção inválida!');
			continue;
		}
		if (mainOpt === 0) {
			console.log('Saindo...');
			break;
		}

		if (mainOpt === 1) {
			// Gerar carta de categoria individual
			showMenu();
			const catAnswer = await new Promise(res => rl.question('Escolha a categoria: ', res));
			const idx = parseInt(catAnswer);
			if (isNaN(idx) || idx < 1 || idx > categories.length) {
				console.log('Categoria inválida!');
				continue;
			}
			const category = categories[idx - 1].value;
			console.log(`Categoria escolhida: ${categories[idx - 1].name}`);
			console.log('Gerando prompt e criando carta...');
			const prompt = await promptBuilderCase(category);
            const card = await generateCard(prompt);
            if (card != null) {
                await createCard(card);
                console.log('Carta criada:');
                console.log(card);
            }
			console.log('-----------------------------');
		} else if (mainOpt === 2) {
			// Gerar uma carta de cada categoria
			for (const cat of categories) {
				console.log(`Categoria: ${cat.name}`);
				const prompt = await promptBuilderCase(cat.value);
                const card = await generateCard(prompt);
                if (card != null) {
                    await createCard(card);
                    console.log('Carta criada:');
                    console.log(card);
                }
				console.log('-----------------------------');
			}
		} else if (mainOpt === 3) {
			// Gerar X cartas de uma categoria
			showMenu();
			const catAnswer = await new Promise(res => rl.question('Escolha a categoria: ', res));
			const idx = parseInt(catAnswer);
			if (isNaN(idx) || idx < 1 || idx > categories.length) {
				console.log('Categoria inválida!');
				continue;
			}
			const category = categories[idx - 1].value;
			const numAnswer = await new Promise(res => rl.question('Quantas cartas deseja gerar? ', res));
			const num = parseInt(numAnswer);
			if (isNaN(num) || num < 1) {
				console.log('Número inválido!');
				continue;
			}
			for (let i = 0; i < num; i++) {
				console.log(`Gerando carta ${i + 1} de ${num} da categoria ${categories[idx - 1].name}`);
				const prompt = await promptBuilderCase(category);
                const card = await generateCard(prompt);
                if (card != null) {
                    await createCard(card);
                    console.log('Carta criada:');
                    console.log(card);
                }
				console.log(card);
				console.log('-----------------------------');
			}
		}
	}
	rl.close();
}


