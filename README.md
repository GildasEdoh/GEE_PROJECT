# GEE_PROJECT

GEE_PROJECT - Gestion des Étudiants en Ligne

Description

GEE_PROJECT est une application web de gestion des étudiants développée avec Next.js pour le frontend et Laravel pour le backend. Cette plateforme permet aux administrateurs et enseignants de gérer efficacement les informations des étudiants, leurs examens et leurs résultats.

Structure du projet

Le projet est divisé en deux dossiers principaux :

frontend/ : Contient le code du frontend développé avec Next.js.

backend/ : Contient l'API backend développée avec Laravel.

Fonctionnalités principales

Gestion des étudiants : Ajout, modification et suppression des informations des étudiants.

Gestion des examens : Création et organisation des examens.

Gestion des résultats : Saisie et affichage des résultats des étudiants.

Tableau de bord interactif : Visualisation des statistiques et performances des étudiants.

Technologies utilisées

Frontend : Next.js, React, Tailwind CSS

Backend : Laravel, MySQL

Authentification : (À préciser si nécessaire)

Installation et configuration

Installation du Frontend

Cloner le projet :

git clone https://github.com/votre-repo/GEE_PROJECT.git
cd GEE_PROJECT/frontend

Installer les dépendances :

npm install

Lancer le projet en mode développement :

npm run dev

Accéder à l'application :
Ouvrir un navigateur et aller à http://localhost:3000

Installation du Backend

Aller dans le dossier backend :

cd ../backend

Installer les dépendances Laravel :

composer install

Configurer l'environnement :
Copier le fichier .env.example en .env et modifier les paramètres de la base de données.

cp .env.example .env

Générer la clé d'application :

php artisan key:generate

Lancer le serveur Laravel :

php artisan serve

Structure du projet

GEE_PROJECT/
│-- frontend/      # Code Next.js
│-- backend/       # Code Laravel
│-- README.md

Contributions

Les contributions sont les bienvenues ! N'hésitez pas à proposer des améliorations en ouvrant une pull request.

Licence

Ce projet est sous licence MIT.

Licence

Ce projet est sous licence MIT.

Auteur : Gildas

