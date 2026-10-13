# CLAUDE.md

Site vitrine statique de Maroc Patrimoine (biens en déshérence, démarches foncières au Maroc). Public : héritiers, souvent à l'étranger (MRE). Tout le contenu est **en français** ; répondre à l'utilisateur en français.

## Essentiel

- Page unique : `index.html`. Pas de framework, pas de JS externe (petit script inline en bas de page).
- Tailwind **3.4** compilé (pas de CDN). Après toute modification de classes dans `index.html` : `npm run build` (régénère `css/style.css`, minifié, versionné). Thème dans `tailwind.config.js` (couleurs `primary`, `primary-container`, or `#f5a623`…).
- Déploiement : `git push` sur `main` → GitHub Pages (build "legacy", ~1 min). Vérifier : `gh api repos/marocpatrimoine/siteweb/pages/builds/latest`.
- Compte GitHub requis : `marocpatrimoine` (admin). `ktmmarocofficiel` n'a qu'un accès en lecture → push et réglages Pages échouent (404).
- Ne jamais supprimer `CNAME`. Modifier le domaine via les réglages Pages peut créer des commits automatiques « Delete/Create CNAME » côté GitHub → `git pull` avant de pousser.

## Conventions à respecter

- **Icônes Material Symbols** : écrire `<span aria-hidden="true" translate="no" class="material-symbols-outlined ..." data-icon="nom_icone"></span>` (span vide, nom dans `data-icon`, rendu par `::before { content: attr(data-icon) }`). Le nom ne doit pas être dans le texte (sinon Google l'indexe, il est copié, et la traduction auto de Chrome casse l'icône).
- **Nouvelle icône** : l'ajouter aussi au paramètre `icon_names=` de l'URL Google Fonts dans le `<head>`, **en ordre alphabétique**, sinon elle s'affiche en texte. (La police est limitée aux icônes utilisées : 13 Ko au lieu de 1,1 Mo.)
- Animations : les sections ont la classe `fade-up` (invisibles jusqu'au défilement). Pour une capture pleine page, ajouter `.visible` via JS d'abord.
- Hiérarchie des titres : un seul `h1` (hero), `h2` par section, `h3` en dessous — ne pas sauter de niveau.
- Contenu de la FAQ : dupliqué dans le JSON-LD `FAQPage` du `<head>` → modifier les deux ensemble. Ne pas inventer de délais, prix ou garanties : reprendre uniquement ce que dit le client.
- Images : servir en WebP avec repli JPG (`<picture>`), hébergées dans `assets/`.

## SEO (état au 2026-10-13)

- Title / meta / OG / Twitter ciblent « biens en déshérence au Maroc » + héritiers à l'étranger.
- JSON-LD `@graph` : `ProfessionalService` + `WebSite` + `FAQPage`. Pas d'adresse, téléphone ni logo : le client n'a pas fourni ces infos (téléphone retiré volontairement, email masqué volontairement).
- `robots.txt` + `sitemap.xml` (mettre à jour `<lastmod>` et ajouter chaque nouvelle page).
- Lighthouse mobile avant optimisation police : Perf 88, SEO 100, A11y 98, BP 100.
- Reste à faire (nécessite des infos du client) : mentions légales + politique de confidentialité (loi 09-08 / CNDP), page À propos, pages dédiées par service (`/biens-en-desherence-maroc`, `/indemnisation-expropriation-maroc`, `/recuperer-sommes-consignees-cdg`, `/succession-titre-foncier-heritiers`, `/partage-biens-indivis-maroc`), vrai logo/favicon, Google Search Console, version arabe.

## Formulaire

FormSubmit (`action="https://formsubmit.co/<jeton>"`), captcha activé, champ piège `_honey`, redirection `_next` vers le site. Tout envoi de test arrive dans la vraie boîte mail du client : prévenir avant d'en faire un.

## Vérification

- Servir en local : `python -m http.server 8000` puis http://localhost:8000.
- Le Chromium embarqué de Playwright peut refuser le certificat du site en ligne (`ERR_CERTIFICATE_TRANSPARENCY_REQUIRED`, liste CT obsolète) : vérifier le site en ligne dans le vrai Chrome de l'utilisateur ou avec `curl`.
- Après un push : contrôler `https://marocpatrimoine.com/?v=<commit>` (cache CDN GitHub ~10 min).
