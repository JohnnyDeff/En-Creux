# Préparer une publication EN CREUX

Cette procédure prépare un Markdown local après validation éditoriale humaine. Elle ne fait aucun commit, push ou déploiement. L’heure enregistrée est celle de la commande, pas celle d’une future compilation ou mise en ligne.

## 1. Préparer un brouillon

Créer `src/content/notes/mon-identifiant.md` ou `src/content/dossiers/mon-identifiant.md`. Utiliser un nom simple en minuscules, chiffres et tirets, sans sous-dossier. Ne pas copier la date d’un article existant. Si un champ `slug` est présent, il doit être identique au nom du fichier sans `.md`.

Exemple de Note :

```yaml
---
status: draft
title: "Titre validé"
episodeNumber: "004"
description: "Description de la publication."
themes:
  - jeu-video
mechanisms:
  - signification-involontaire
---

Texte de la Note et documentation.
```

Pour un Dossier, ajouter `subtitle` et `cardDescription` à ces mêmes métadonnées. Choisir son véritable numéro éditorial et les identifiants adaptés dans `src/data/taxonomy.mjs`. Le champ historique `category` reste compatible, mais n’est plus requis sur une nouvelle Note.

`mechanisms` contient une ou plusieurs des neuf familles fondatrices du cahier V4. `mechanismAngle` est une formulation facultative propre à la publication, par exemple `mechanismAngle: "Effets imprévus"` pour Street Fighter II. Cet angle reste une métadonnée éditoriale : il ne remplace pas la famille dans les liens et ne génère aucune page de taxonomie. Les anciennes valeurs `appropriation-reecriture`, `revelation-technique` et `effets-imprevus` ne sont plus des identifiants valides.

Les familles sans publication restent absentes des index publics et de la génération des routes. Elles deviennent visibles automatiquement au premier contenu publié qui les référence. `decontextualisation` est disponible pour la future Note Amen Break ; aucun contenu ni angle n’est précréé.

Ne pas ajouter `publishDate`, même vide : la commande refuse tout champ déjà présent. `status: draft` rend le contenu privé, même s’il contient accidentellement une date. Un nouveau fichier sans `status` est également privé. Une valeur de statut inconnue provoque une erreur de compilation.

Les brouillons sont exclus avant leur rendu par le chargeur des collections. Ils ne figurent ni dans les index, ni dans les thèmes/mécanismes, ni dans les routes individuelles ou leurs métadonnées. Le build n’est pas une prévisualisation éditoriale privée : relire le Markdown et son appareil documentaire dans l’éditeur. Ne pas placer de brouillon dans `src/pages/` ou `public/`, qui sont des emplacements publics indépendants des collections.

## 2. Vérifier les métadonnées sans publier

```sh
npm run publish -- --type note --id mon-identifiant --check
npm run publish -- --type dossier --id mon-identifiant --check
```

Cette vérification utilise le même schéma que les collections : champs requis, thèmes, mécanismes et dates. Elle n’écrit rien et ne remplace pas la validation humaine des faits, sources, crédits et du texte.

## 3. Après validation humaine

```sh
npm run publish -- --type note --id mon-identifiant --validated
npm run publish -- --type dossier --id mon-identifiant --validated
```

`--validated` atteste que la validation éditoriale a été effectuée. La commande :

- exige un brouillon explicite et des métadonnées valides ;
- remplace `status: draft` par `status: published` ;
- ajoute une date ISO persistée, par exemple `publishDate: "2026-09-23T18:42:18+02:00"` ;
- calcule l’heure et le décalage avec `Intl` et le fuseau IANA `Europe/Paris`, y compris les changements d’heure ;
- conserve le corps et les autres métadonnées ;
- protège les écritures simultanées par un verrou et remplace le fichier après préparation complète ;
- refuse de republier un contenu, d’écraser une date ou de modifier les trois dates historiques.

L’horloge système doit être correcte ; son fuseau local n’a pas besoin d’être Paris. Il n’existe pas d’option de forçage ou d’antidatage. Un verrou `.publish-lock` laissé après un arrêt brutal doit être examiné avant toute intervention manuelle ; vérifier qu’aucune publication n’est encore en cours.

Lancer ensuite `npm run build`, relire le diff et suivre la procédure habituelle de livraison. Le build et Cloudflare ne recalculent jamais les dates. Cette commande n’est pas un planificateur : un contenu marqué `published` est inclus au prochain build, sans attendre une date future.

## Dates historiques et affichage

Les trois articles antérieurs sont reconnus explicitement sans changement de leurs Markdown :

| Publication | Date conservée |
| --- | --- |
| Note 001 — La tapisserie de Bayeux | `2026-09-10` |
| Dossier 002 — Lire sans ouvrir | `2026-09-18` |
| Note 003 — Street Fighter II | `2026-09-23` |

Leur affichage reste `10/09/2026`, `18/09/2026` et `23/09/2026`, sans heure, y compris dans l’attribut HTML `datetime`. Les nouveaux horodatages sont affichés en heure de Paris : `23 septembre 2026 · 18 h 42`. Listes et pages individuelles partagent le même composant et le même formateur.

## Corrections éditoriales

`updatedDate` est facultatif et manuel. Pour une correction significative, consigner sa nature dans l’appareil documentaire conformément à la Méthode, puis ajouter la date réelle :

```yaml
updatedDate: "2026-09-24T10:15:00+02:00"
```

Une date seule `YYYY-MM-DD` est également admise si l’heure n’est pas connue. Ce champ est affiché comme « Mis à jour le … » et ne peut pas précéder la publication. Il ne modifie ni `publishDate` ni l’ordre chronologique initial. Ni la commande de publication, ni Git, ni un build, ni une modification CSS ne le renseignent automatiquement.

## Tests

```sh
npm run test:publication
npm run test:publication:build
npm run build
```

Les tests unitaires couvrent les deux formats, le contrôle humain, les dates existantes, les identifiants, le YAML, les métadonnées, les corrections et les transitions été/hiver. Le test d’intégration crée ses propres brouillons temporaires, compile dans un dossier temporaire non servi, publie localement une Note et un Dossier de test puis recompile deux fois pour contrôler la persistance. Il supprime uniquement ses fichiers temporaires. Ne pas lancer d’autre build ni déploiement simultanément à ce test ; le terminer par le build normal.

`js-yaml`, déjà présent via Astro, est déclaré comme dépendance directe pour que la CLI ne dépende pas d’un détail des dépendances transitives. Aucune dépendance de l’atelier graphique n’est nécessaire.
