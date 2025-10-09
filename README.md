# MaGazette — Feedbacks personnels avec Auth Supabase

Un mini-outil web pour capturer rapidement ton ressenti en fin de journée (texte ou photo manuscrite), le stocker de manière sécurisée via Supabase, et le revoir plus tard. L’objectif: rendre le feedback quotidien simple, rapide et personnel, avec une esthétique cyberpunk.

## Pitch
- **[Simple]** Une page pour écrire un feedback ou téléverser une image (scan/écriture manuscrite) en 10 secondes.
- **[Sécurisé]** Tes données sont privées. Authentification par Supabase et politiques RLS: tu ne vois que tes feedbacks.
- **[Accessible]** 100% client-side, aucune infra à maintenir. Tu peux l’héberger statiquement (GitHub Pages, Netlify, etc.).

---

## Fonctionnalités clés
- **[Auth utilisateur]** via Supabase (`js/auth.js`, `js/supabaseClient.js`).
- **[Feedback texte ou image]** image uploadée vers ImgBB, l’URL est stockée.
- **[Filtrage par utilisateur]** lecture/écriture sur la table `Feedbaaack` scellée par RLS.
- **[UI réactive]** formulaire désactivé si non connecté, rafraîchissement auto à la connexion/déconnexion.

---

## Structure des fichiers
- `feedbacks.html` — Interface de création/lecture des feedbacks.
- `js/supabaseClient.js` — Initialisation du client Supabase v2 (expose `window.sb`).
- `js/auth.js` — Helpers d’auth (login/logout/signup, session, nav dynamique).
- `login.html` / `register.html` — Pages d’auth correspondantes.
- `index.html` — Page d’accueil (peut lier vers `feedbacks.html`).

---

## Base de données (Supabase)
Table: `Feedbaaack`

Colonnes:
- `id bigint` (PK, identity recommandé)
- `created_at timestamp with time zone` (default `now()` recommandé)
- `content text` (texte libre ou URL de l’image ImgBB)
- `user_id uuid` (référence l’utilisateur authentifié)

Exemple SQL (à adapter):
```sql
create table if not exists public."Feedbaaack" (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  content text not null,
  user_id uuid not null references auth.users(id)
);

alter table public."Feedbaaack" enable row level security;

-- Lecture: l'utilisateur ne voit que ses lignes
create policy "select_own_feedbacks"
  on public."Feedbaaack"
  for select
  using (user_id = auth.uid());

-- Insertion: l'utilisateur ne peut insérer que pour lui-même
create policy "insert_own_feedbacks"
  on public."Feedbaaack"
  for insert
  with check (user_id = auth.uid());
```

---

## Dépendances externes
- Supabase JS v2 (via CDN intégré dans `feedbacks.html`).
- ImgBB (upload image client-side, clé API requise).

---

## Configuration
1. **Supabase**
   - Récupère l’URL et l’Anon Key de ton projet.
   - Ouvre `js/supabaseClient.js` et mets à jour:
     ```js
     window.SUPABASE_CONFIG = {
       url: "https://<YOUR_PROJECT>.supabase.co",
       anonKey: "<YOUR_ANON_KEY>"
     };
     ```
   - Vérifie les policies RLS de `Feedbaaack` (voir section SQL ci-dessus).

2. **ImgBB** (optionnel mais recommandé pour les images)
   - Crée une clé sur imgbb.com, remplace `IMGBB_API_KEY` dans `feedbacks.html`.

---

## Utilisation
- Ouvre `login.html` pour te connecter ou `register.html` pour créer un compte.
- Va sur `feedbacks.html`.
  - Si non connecté: formulaire désactivé + message.
  - Si connecté: saisis du texte ou upload une image (png/jpeg/webp).
  - Clique sur "Sauvegarder feedback".
  - Parcours tes derniers feedbacks, puis "Voir tout" pour charger plus.

Notes:
- Les feedbacks affichés sont uniquement ceux du compte connecté (filtrage `.eq("user_id", session.user.id)`).
- Les images sont hébergées chez ImgBB; seule l’URL est stockée en base.

---

## Outil: Sunset Timer

`sunset-timer-app.html` est un organiseur de tâches avec minuteur élégant, pensé pour des sessions focalisées type pomodoro mais flexibles.

- **[Accès]** Depuis `index.html`:
  - Navbar: bouton "SUNSET"
  - Galerie: carte "Sunset Timer" (icône 🌅)
  - Raccourci clavier: `Ctrl + 6`

- **[Fonctionnalités]**
  - Liste de tâches avec titre et durée (en minutes)
  - Minuteur visuel avec barre de progression
  - Démarrer / Pause / Stop, enchaînement auto optionnel
  - Réglages: son, auto-start, notifications
  - Import CSV des tâches
  - Persistance locale (localStorage)

- **[Utilisation]**
  1. Ajoute une tâche (titre + durée)
  2. Clique "Démarrer", puis utilise Pause/Stop si besoin
  3. Active les notifications si nécessaire (bouton dédié)
  4. Réorganise tes tâches par drag & drop

Cet outil est autonome (pas d’auth ni de backend requis) et peut coexister avec les autres apps du hub.

## Sécurité et bonnes pratiques
- N’expose jamais une Service Role Key côté client.
- L’`anonKey` est publique mais les permissions sont **strictement** contrôlées par RLS.
- Valide les entrées utilisateur si tu ajoutes d’autres champs.

---

## Déploiement
- Héberge statiquement (GitHub Pages, Netlify, Vercel static, etc.).
- Les pages/JS doivent pouvoir charger le CDN Supabase.
- Si tu changes de domaine, rien à reconfigurer côté Supabase (auth par token côté client) tant que l’URL projet est bonne.

---

## Dépannage
- Rien ne se charge dans `feedbacks.html`:
  - Vérifie que `@supabase/supabase-js@2`, `js/supabaseClient.js` et `js/auth.js` sont bien inclus.
  - Ouvre la console: erreurs d’auth/URL/keys.
- Insertion refusée:
  - Vérifie les policies RLS et que `user_id` = `auth.uid()`.
- Images non visibles:
  - Clé ImgBB invalide, quota atteint, ou URL non accessible.

---

## Licence
Voir `LICENSE`.
