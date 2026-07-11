# Skaldly Frontend

Interface web de l'application Skaldly, une plateforme d'apprentissage des langues gamifiée assistée par IA.

🔗 [skaldly.fr](https://skaldly.fr)

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Sommaire

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Installation](#installation)
- [Variables d'environnement](#variables-denvironnement)
- [Commandes](#commandes)
- [Docker](#docker)
- [Structure](#structure)

## À propos

Frontend React/TypeScript de Skaldly.

> 🖙 Backend : [Skaldly](https://github.com/Sid-Ahmed7/Projet_Annuel)

## Fonctionnalités

- Exercices interactifs : QCM, flashcards, matching pairs, tri, interactifs
- Défis 1v1 en temps réel et défis publics asynchrones
- Classements global et par langue (WebSocket)
- Aide pédagogique par IA (Mistral) avec quota par plan
- Système de révision par répétition espacée
- Système d'amis
- Authentification JWT + 2FA (TOTP)
- Abonnements Stripe (plans Free / Premium)
- Notifications temps réel (STOMP/SSE) et push navigateur (VAPID / Service Worker)
- Internationalisation FR / EN (i18next)
- Interface admin (stats, gestion utilisateurs, leçons, modération)
- Thème clair / sombre

## Stack technique

- React 19 / TypeScript 5
- Vite 6
- Tailwind CSS 4
- React Router v7
- React Hook Form + Yup
- i18next (translation FR / EN)
- Axios
- @stomp/stompjs 
- Recharts (graphiques admin)
- Lucide React (icônes)
- Service Worker + Web Push API 

## Installation

### Prérequis

| Outil | Vérification |
|-------|-------------|
| Node.js 20+ | `node --version` |
| npm | `npm --version` |
| Docker | `docker --version` |

Le backend doit être lancé séparément. Voir [Skaldly Backend](https://github.com/Sid-Ahmed7/Projet_Annuel).

### 1. Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_API_BASE_URL=http://localhost:8080
```

| Variable | Rôle |
|----------|------|
| `VITE_API_URL` | URL de base de l'API REST (avec `/api/v1`) |
| `VITE_API_BASE_URL` | URL de base du backend (sans `/api/v1`) — utilisée pour les WebSockets |

### 2. Installation des dépendances

```bash
npm install
```

### 3. Lancement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

## Docker

### Développement

**Premier lancement (ou après modification de `package.json` / `Dockerfile.dev`) :**

```bash
docker compose -f compose.dev.yml up -d --build
```

**Lancements suivants :**

```bash
docker compose -f compose.dev.yml up -d
```

**Voir les logs en temps réel :**

```bash
docker compose -f compose.dev.yml logs -f
```

**Arrêter les conteneurs :**

```bash
docker compose -f compose.dev.yml down
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

> Les fichiers sources sont synchronisés en temps réel via un volume — pas besoin de reconstruire l'image à chaque modification de code.

## Commandes

### Développement
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview (build de production en local)
```bash
npm run preview
```

### Tests
```bash
npm run test
npm run test:ui
npm run test:coverage
```

### Linting
```bash
npm run lint
```

## Structure

```
src/
├── pages/          # Pages de l'application (routes)
├── components/     # Composants réutilisables
├── hooks/          # Hooks personnalisés
├── services/       # Appels API (Axios)
├── contexts/       # Contextes React (Auth, Toast, Push…)
├── types/          # Types TypeScript
├── constants/      # Constantes globales
├── lib/            # Utilitaires
└── messages/       # Fichiers de traduction (fr.json, en.json, etc..)
```

---