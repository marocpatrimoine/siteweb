# Maroc Patrimoine — site web

Site vitrine de **Maroc Patrimoine** : recherche de biens en déshérence, démarches juridiques et administratives, déblocage de successions au Maroc.

🌐 **En ligne : https://marocpatrimoine.com**

## Contenu du site

Une seule page (`index.html`), en français :

1. **Accueil** — « Récupérez vos biens hérités au Maroc »
2. **Démarches juridiques et administratives** — expropriation, sommes consignées, biens indivis, biens spoliés, blocages administratifs, mise à jour de propriétés
3. **Biens en déshérence** — Pourquoi agir ? / Notre solution / Pour qui ?
4. **Honoraires** — uniquement en cas de succès (% du résultat récupéré)
5. **FAQ** — questions fréquentes
6. **Contact** — formulaire confidentiel

## Structure

```
index.html          Page unique (HTML + petit script en bas de page)
src/input.css       Source Tailwind
css/style.css       CSS compilé — généré, ne pas modifier à la main
tailwind.config.js  Couleurs, polices, arrondis du thème
assets/             hero.webp / hero.jpg (en-tête), og-image.jpg (partage réseaux sociaux)
robots.txt          Autorise l'indexation, pointe vers le sitemap
sitemap.xml         Plan du site pour Google
CNAME               Domaine personnalisé (marocpatrimoine.com) — ne pas supprimer
```

## Modifier le site

Prérequis : [Node.js](https://nodejs.org) installé.

```bash
npm install        # une seule fois
# ... modifier index.html ...
npm run build      # recompile css/style.css (OBLIGATOIRE après toute modification de classes)
git add -A && git commit -m "Description du changement" && git push
```

`npm run watch` recompile automatiquement pendant que vous travaillez.

La publication est automatique : chaque `git push` sur `main` met le site à jour via **GitHub Pages** en 1 à 2 minutes.

## Formulaire de contact

Le formulaire est géré par [FormSubmit](https://formsubmit.co) : les demandes arrivent par email à l'adresse associée au jeton présent dans l'attribut `action` du formulaire. Pas de serveur, pas de base de données. Anti-spam : captcha FormSubmit + champ piège `_honey`.

## Hébergement

- **GitHub Pages**, branche `main`, dossier racine
- Domaine `marocpatrimoine.com` (DNS : enregistrements A vers GitHub, `www` en alias)
- **HTTPS forcé**, certificat Let's Encrypt renouvelé automatiquement par GitHub
- Seul le compte GitHub `marocpatrimoine` a les droits d'écriture et d'administration
