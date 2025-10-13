# CYBER PRODUCTIVITY HUB
> Tableau de bord centralisé au style cyberpunk pour accéder à diverses applications de productivité.

## 🧩 Aperçu

**CYBER PRODUCTIVITY HUB** est une interface web en HTML, CSS et JavaScript permettant de regrouper plusieurs applications de productivité dans un même espace.  
Il propose une navigation rapide entre différentes pages (Todo, Feedbacks, RSS, Météo, etc.), un affichage dynamique de l’heure et de la date, ainsi qu’un système d’authentification intégré via **Supabase**.

## ⚙️ Fonctionnalités

- 🕒 Horloge et date dynamiques en temps réel  
- 🧭 Barre de navigation avec accès rapide aux applications  
- 💾 Intégration **Supabase** pour la gestion de l’authentification  
- 🧠 Section "Objectifs Long Terme" personnalisable  
- ⚡ Navigation clavier (raccourcis Ctrl+1 à Ctrl+6)  
- 🎨 Design cyberpunk animé avec effets visuels (glitch, pulse, survol lumineux)  
- 📱 Interface responsive adaptée aux mobiles et tablettes  
- 🔐 Gestion des états utilisateurs : connexion, inscription, compte, déconnexion  

## 🏗️ Structure du projet
```
root/
├── index.html
├── account.html
├── login.html
├── register.html
├── dalyview.html
├── meteo.html
├── pomodoro.html
├── rss.html
├── feedbacks.html
├── todo app.html
├── toolbox.html
├── SimpleTabHTML.html
├── sunset-timer-app.html
├── test.html
├── favicon.png
├── README.md
├── LICENSE
├── TODO.md
├── GIT_REMOTE.md
├── git_auto_push.ps1
├── js/
│   ├── supabaseClient.js
│   ├── auth.js
│   └── utils.js
```

## 🚀 Installation

```bash
git clone <repo-url>
cd cyber-productivity-hub
# Ouvrir le fichier index.html dans un navigateur
```

Aucune installation de dépendances locale n’est nécessaire — tout fonctionne côté client via le navigateur.

## 🧠 Utilisation

1. Ouvrir `index.html` dans un navigateur moderne.
2. Naviguer entre les différentes applications via :

   * La barre supérieure (boutons)
   * Les cartes interactives
   * Les raccourcis clavier :

     * **Ctrl+1** → Todo
     * **Ctrl+2** → Feedbacks
     * **Ctrl+3** → RSS
     * **Ctrl+4** → Météo
     * **Ctrl+5** → Pomodoro
     * **Ctrl+6** → Sunset Timer
3. Les liens externes s’ouvrent automatiquement dans un nouvel onglet.

## 🧪 Tests

- **Navigation**: tous les modules internes s’ouvrent dans le même onglet. Liens externes (ex. Pomodoro) → nouvel onglet.
- **Raccourcis**: `Ctrl+1..6` ouvrent les pages indiquées dans `index.html`.
- **Auth**: navbar réagit à la connexion/déconnexion via `js/auth.js`.
- **Todo** (`todo app.html`):
  - Ajout de tâches (ordre persistant via champ `order`).
  - Section "Tâches terminées" + bouton afficher/cacher (cachée par défaut).
  - Case à cocher déplace vers terminées; décocher la case dans terminées réintègre la tâche.
  - Édition du titre via bouton ✏️ survol (mise à jour Supabase).
  - Drag & Drop actif uniquement sur la liste des tâches actives; ordre sauvegardé.
  - Tags: champ de saisie + filtre par tag. Le client gère deux schémas possibles:
    - `tags` (array/json)
    - `tag` (texte CSV)
    Détection automatique et adaptation des requêtes.

## 🔧 Configuration

Le projet utilise **Supabase** (CDN) et un initialiseur dédié `js/supabaseClient.js`.

- Dans `index.html`/pages, le CDN est chargé:
  - `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`
  - `<script src="js/supabaseClient.js"></script>`

- Renseigner vos identifiants dans `js/supabaseClient.js`:
  ```javascript
  window.SUPABASE_CONFIG = {
    url: 'https://<YOUR-PROJECT>.supabase.co',
    anonKey: '<YOUR-ANON-KEY>'
  };
  // Le fichier crée window.sb = createClient(url, anonKey)
  ```

Autres fichiers utiles:

- `js/auth.js` → helpers d’auth (login/register/logout, session, navbar)
- `js/utils.js` → utilitaires (ex: formatage d’heure)

## 📦 Dépendances

* [Supabase JS v2](https://supabase.com/docs/reference/javascript)
* Polices Google : **Orbitron**
* Aucune dépendance côté serveur

## 🤝 Contribution

Les contributions sont les bienvenues :

```
# Forker le dépôt
# Créer une branche de fonctionnalité
git checkout -b feature/nouvelle-fonctionnalite

# Commit des modifications
git commit -m "Ajout d'une nouvelle fonctionnalité"

# Pousser la branche
git push origin feature/nouvelle-fonctionnalite

# Ouvrir une Pull Request
```

## 🪪 Licence

Ce projet est distribué sous **The Unlicense** (domaine public). Voir `LICENSE`.
