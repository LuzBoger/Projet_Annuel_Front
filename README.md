# Skaldly Frontend

Partie frontend de l'application Skaldly, une application d'apprentissage de langues assistée par l'IA.

## Configuration

Créer un fichier `.env` à la racine du projet :

### `.env` — Développement local

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_API_BASE_URL=http://localhost:8080
```

## Installation

```bash
npm install
```

## Commandes

### Développement
```bash
npm run dev
```

### Tests
```bash
npm run test
npm run test:ui
npm run test:coverage
```

### Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

### Preview
```bash
npm run preview
```

## Docker

### Développement


```bash
docker compose -f compose.dev.yml up --build
```
L'application sera accessible sur [http://localhost:5173](http://localhost:5173).


## Structure

- `/src/pages` : Pages de l'application
- `/src/components` : Composants réutilisables
- `/src/hooks` : Hooks personnalisés
- `/src/services` : Appels API
- `/src/types` : Types TypeScript
- `/src/messages` : Fichiers de traduction (fr/en)