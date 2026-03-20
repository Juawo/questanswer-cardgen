# 🤖 QuestAnswer - AI Card Generator
![JavaScript](https://img.shields.io/badge/JavaScript-Language-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GroqCloud](https://img.shields.io/badge/GroqCloud-AI-FF6B6B?style=for-the-badge)

A CLI-based tool that generates trivia cards using AI, designed to expand the QuestAnswer game content through procedural generation.

The system integrates with an external API and uses prompt engineering to ensure variety, avoid duplication, and enhance replayability.

---

## 📚 Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Technical Decisions](#technical-decisions)
- [Tech Stack](#tech-stack)
- [How to Run](#how-to-run)
- [Project Status](#project-status)
- [Differentials](#differentials)
- [Future Improvements](#future-improvements)
- [Related Projects](#related-projects)

---

## Features

- AI-powered trivia card generation
- Category-based content generation
- Duplicate prevention using existing database data
- Dynamic prompt composition
- CLI interface for generation control
- Optional "trick hints" (misleading clues) for gameplay variety

---

## How It Works

The generator follows a pipeline-based approach:

```text

Select category → Fetch existing cards → Build prompt → Generate with AI → Validate → Apply trick hints → Save to API

```
## Categories

The system supports 5 categories:

Pop → Pop culture (games, series, anime, comics)

Moment → Historical events, dates, years

Object

Place

Person → Celebrities, athletes, biblical characters

## Prompt System

Each category has a predefined JSON prompt template

Prompts follow a standard card structure:

Term (answer)

Category

10 progressive hints

Before sending to AI:

The generator fetches existing card names from the API

Injects them into the prompt to avoid duplication

## AI Generation

The generator uses GroqCloud to generate cards

The response is parsed and validated before being saved

## Validation & Trick System

After generation:

The system checks if the card already exists in the database

A random system may introduce "trick hints":

Up to 3 hints can be replaced

Positions are randomly selected (1–10)

Original hints are replaced with misleading clues

This increases gameplay challenge and unpredictability.

## CLI Menu

The generator is controlled via a CLI interface:

1 → Generate a card from a specific category

2 → Generate one card for each category

3 → Generate X cards for a selected category

## Technical Decisions

**Prompt Engineering per Category**
Each category uses a tailored prompt to improve AI output quality and relevance.

**Database-Aware Generation**
The generator queries the API before generating content, reducing duplication at the source.

**Decoupled Architecture**
The generator does not directly access the database — all persistence is handled through the API.

**Controlled Randomization**
The "trick hint" system introduces variability without breaking the structure of the game.

**CLI-Based Control**
A command-line interface allows flexible and scalable generation workflows.

## Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-Language-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GroqCloud](https://img.shields.io/badge/GroqCloud-AI-FF6B6B?style=for-the-badge)

## How to Run

```
Clone the repository:

git clone <REPO_URL>

Install dependencies:

npm install

Configure environment variables:

Create a .env file with:

GROQ_API_KEY=your_api_key
URL_API=your_backend_api_url

Run the generator:

node src/main.js

Use the CLI menu to generate cards
```

## Project Status

In development — core generation pipeline implemented and being refined.

## Differentials

- AI-powered procedural content generation (PCGML approach)

- Integration between AI, backend API, and game client

- Smart prompt design to avoid duplication

- Dynamic difficulty via trick hints

- Tooling that supports scalable content creation

## Future Improvements

- Improved validation of AI responses

- Better control over trick hint difficulty

- Batch generation optimization

- Logging and analytics of generated cards

- Admin dashboard for managing generated content

## Related Projects

This project is part of the QuestAnswer ecosystem:

🎮 Game Client (Godot): (add link here)

🧠 Backend API: (add link here)