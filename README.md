# Word Master · Harvey

A playful, bilingual vocabulary learning app designed for young learners. It runs entirely in the browser and adapts to phone and iPad layouts.

## Features

- Ten textbook units with flashcards, phonetics, word formation notes, and example sentences
- Six practice modes plus due-word review
- English and Chinese interface switch, with English as the default
- Monthly learning calendar with daily check-ins
- Coins for completing units and a 100-coin weekly bonus after five active days
- Learning statistics, JSON backup and restore, and custom word imports
- Text, Excel, and image OCR import tools

## Run locally

No build step is required. Start any static file server from the project directory, for example:

```bash
python3 -m http.server 8788
```

Then open <http://127.0.0.1:8788/>.

## Validation

```bash
node test/smoke.mjs
node test/formation.mjs
node --check data.js
node --check store.js
node --check quiz.js
node --check app.js
```

## Data storage

Learning progress and settings are stored in the current browser's `localStorage`. Use the JSON backup feature before changing browsers or clearing site data.
