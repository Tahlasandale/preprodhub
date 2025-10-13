# Git Remote & Identité

- **Remote (origin)**: `https://github.com/Tahlasandale/preprodhub`
- **Branche par défaut**: `main`
- **Git user.name**: `Jooo`
- **Git user.email**: `mixjojo2006@gmail.com`

## Commandes courantes

- **Vérifier le remote**
```bash
git remote -v
```

- **Changer/forcer l'URL du remote**
```bash
git remote set-url origin https://github.com/Tahlasandale/preprodhub
```

- **Pousser la branche principale**
```bash
git push -u origin main
```

- **Récupérer les updates (rebase recommandé)**
```bash
git pull --rebase origin main
```

- **Commit rapide**
```bash
git add -A
git commit -m "message"
git push
```

## Notes
- `core.autocrlf` a été configuré sur `true` (Windows) pour gérer CRLF/LF.
- Si Git demande une auth, finalise-la dans le navigateur (GitHub) puis relance la commande.

## Script d'automatisation Git
```powershell
./git_auto_push.ps1 -Message "message"
```
/giiit dans cascade pour auto commit et push