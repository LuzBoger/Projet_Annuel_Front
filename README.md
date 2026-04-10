# GloTrush Frontend

Application React avec TypeScript et Vite.

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

## Déploiement

### Docker

#### Build l'image
```bash
docker build -t glotrush-front:latest .
```

#### Tag et Push
```bash
docker tag glotrush-front:latest arthurbrd/glotrush-front:latest
docker push arthurbrd/glotrush-front:latest
```

#### Run sur le serveur
```bash
# Récupérer la dernière version
docker pull arthurbrd/glotrush-front:latest

# Lancer le conteneur
docker run -d -p 80:80 --name glotrush-front arthurbrd/glotrush-front:latest
```

## Structure

- `/src/pages` : Pages de l'application (Home, Login, Register)
- `/src/components` : Composants réutilisables
- `/src/test` : Configuration des tests
