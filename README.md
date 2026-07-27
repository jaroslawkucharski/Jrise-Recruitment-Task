![Coverage](./coverage/badge/coverage.svg)

# Jrise Recruitment Task

Projekt frontendowy oparty o `Next.js`, `React 19`, `Tailwind CSS 4` i testy komponentowe w `Vitest`.

## Getting Started

Uruchom lokalnie:

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod `http://localhost:3000`.

## Scripts

```bash
npm run test
npm run test:coverage
npm run coverage
```

`npm run test` uruchamia Vitest w trybie watch, zgodnie z oficjalnym guide Next.js dla Vitest.

`npm run coverage` generuje:

- raport tekstowy w terminalu
- raport HTML w `coverage/index.html`
- podsumowanie JSON w `coverage/coverage-summary.json`
- badge coverage w `coverage/badge/coverage.svg`

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Vitest
- Testing Library

## Coverage

Badge w README jest generowany lokalnie na podstawie rzeczywistego wyniku `lines` z ostatniego uruchomienia coverage. Po zmianach w testach wystarczy ponownie uruchomić:

```bash
npm run coverage
```
