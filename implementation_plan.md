# Plan : Synchronisation de la langue d'interface et refonte du switcher

Ce plan décrit les modifications à effectuer pour adapter la langue de l'application à la langue native de l'utilisateur et refondre le switcher de langue du Header/Sidebar sous forme de menu déroulant.

## Revue Utilisateur Requise

- **Onboarding** : Dès la validation de la langue native lors de l'onboarding, l'application bascule automatiquement sa langue d'interface.
- **Restauration** : Si l'utilisateur change d'appareil ou vide le stockage local de son navigateur, l'application restaurera automatiquement sa langue native enregistrée sur le serveur lors de la connexion.
- **Refonte du sélecteur de langue** : Le sélecteur en ligne (actuellement restreint à FR/EN) dans le Header et le Sidebar est remplacé par un composant Dropdown (Select) réutilisant le style du sélecteur de langue d'apprentissage, et proposant les 5 langues supportées (Français, Anglais, Espagnol, Allemand, Italien).

## Changements Proposés

---

### [MODIFY] [OnBoardingModal.tsx](file:///C:/Tous/glotrush-front/glotrush-front/src/components/onBoarding/OnBoardingModal.tsx)
- Modifier le comportement du bouton de validation pour qu'il :
  1. Identifie le code de langue correspondant à l'ID de la langue native sélectionnée.
  2. Applique le changement de langue dans `i18next` via `i18n.changeLanguage()`.
  3. Enregistre cette préférence dans le `localStorage` sous la clé `"language"`.

---

### [MODIFY] [AuthProvider.tsx](file:///C:/Tous/glotrush-front/glotrush-front/src/contexts/AuthProvider.tsx)
- Lors du chargement initial de l'utilisateur (ou après sa connexion), si aucune langue n'est enregistrée dans le `localStorage` :
  1. Récupérer les langues natives de l'utilisateur via l'API `userLanguageService.getUserNativeLanguages()`.
  2. Si une langue native est trouvée, appliquer son code dans `i18next` et l'enregistrer dans le `localStorage` pour les futures sessions.

---

### [MODIFY] [LocaleLanguageSwitcher.tsx](file:///C:/Tous/glotrush-front/glotrush-front/src/components/layout/LocaleLanguageSwitcher.tsx)
- Remplacer le sélecteur horizontal par un composant déroulant (Select) en utilisant :
  - `SelectedLanguagesButton`
  - `DropDownMenu`
  - `LanguageFlag`
- Proposer les 5 langues de l'application (FR, EN, ES, DE, IT) avec leurs traductions respectives et leurs drapeaux.

---

## Plan de Vérification

### Tests Automatisés
- Lancer le build de l'application via `npm run build`.
- Lancer les tests unitaires via `npm run test -- --run`.

### Vérification Manuelle
- Créer un compte d'utilisateur de test.
- Lors de l'onboarding, sélectionner "Espagnol" en langue native et valider.
- Vérifier que l'application passe immédiatement en espagnol.
- Ouvrir le menu déroulant du switcher de langue dans le Header et le Sidebar, basculer entre les 5 langues et vérifier la traduction globale du site.
- Vider le `localStorage` du navigateur, se connecter au compte, et s'assurer que le site se traduit automatiquement en espagnol après la récupération du profil.
