# Projet Laravel - Guide d'Installation et d'Exécution

Bienvenue dans ce projet Laravel. Ce guide détaille les étapes d'installation et d'exécution du projet pour les collaborateurs qui souhaitent contribuer.

---

## 📌 Prérequis
Avant de commencer, assure-toi d'avoir installé les éléments suivants sur ton système :
- **PHP (>= 8.1)** [Télécharger ici](https://www.php.net/downloads)
- **Composer** [Télécharger ici](https://getcomposer.org/)
- **Node.js et npm** [Télécharger ici](https://nodejs.org/)
- **MySQL ou MariaDB** (ou toute autre base de données prise en charge par Laravel)

## 📥 Installation du projet

1. **Cloner le dépôt Git**
   ```sh
   git https://github.com/GildasEdoh/GEE_PROJECT.git
   cd backend
   ```

2. **Installer les dépendances PHP avec Composer**
   ```sh
   composer install
   ```

3. **Créer un fichier d'environnement**
   ```sh
   cp .env.example .env
   ```

4. **Générer la clé d'application**
   ```sh
   php artisan key:generate
   ```

     ```
   ```

5. **Installer les dépendances front-end (si applicable)**
   ```sh
   npm install && npm run dev
   ```

## 🚀 Exécution du projet

1. **Lancer le serveur de développement Laravel**
   ```sh
   php artisan serve
   ```
   Cela démarre le serveur sur `http://127.0.0.1:8000`

2. **(Facultatif) Lancer Laravel Queue Worker (si utilisé dans le projet)**
   ```sh
   php artisan queue:work
   ```

3. **(Facultatif) Lancer Horizon (si utilisé dans le projet)**
   ```sh
   php artisan horizon
   ```

## 🛠 Commandes utiles pour les collaborateurs

- **Mettre à jour le projet après un `git pull`**
  ```sh
  composer install
  php artisan migrate
  npm install && npm run dev
  ```

- **Vider le cache**
  ```sh
  php artisan cache:clear
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  ```

- **Créer un nouvel utilisateur administrateur (exemple avec Tinker)**
  ```sh
  php artisan tinker
  >>> \App\Models\User::create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => bcrypt('password')]);
  ```

## 📄 Contribution

1. **Créer une branche pour tes modifications**
   ```sh
   git checkout -b nom-de-ta-branche
   ```
2. **Faire tes modifications et les committer**
   ```sh
   git add .
   git commit -m "Description de la modification"
   ```
3. **Pousser les modifications vers le dépôt distant**
   ```sh
   git push origin nom-de-ta-branche
   ```
4. **Créer une Pull Request sur GitHub**

## 🔗 Ressources utiles
- [Documentation officielle Laravel](https://laravel.com/docs)
- [Documentation Composer](https://getcomposer.org/doc/)
- [Documentation MySQL](https://dev.mysql.com/doc/)

---

📌 **Merci de suivre ce guide pour assurer une installation sans problème et une bonne collaboration !** 🚀
