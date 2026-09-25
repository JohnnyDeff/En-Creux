# Les mécanismes fondateurs EN CREUX

Référence : [Cahier de méthode éditoriale EN CREUX V4, fiche 04 — LES 9 MÉCANISMES EN CREUX](https://docs.google.com/document/d/1Q2CsPMmdgEtLmeNkcEkVg-du4IxxlHVaV6GtrqVvPT0/edit). Les neuf définitions reproduites dans `src/data/taxonomy.mjs` sont celles de la fiche 04, transmises pour cette migration.

> Le mécanisme répond à : comment le sens apparaît-il ou se transforme-t-il ?

## Famille et angle

Les neuf familles constituent la taxonomie canonique et stable. Les listes et les pages transversales sont calculées à partir du tableau `mechanisms` des publications. Plusieurs familles peuvent être associées à un même article.

`mechanismAngle` est une formulation facultative propre à une publication. Elle ne génère aucune page ni entrée d’index et ne remplace pas l’intitulé canonique dans les liens. Elle n’est pas ajoutée à la définition générale de la famille.

| Publication | Famille | Identifiant | Angle particulier |
| --- | --- | --- | --- |
| 001 — Bayeux | Histoire / Sédimentation | `histoire-sedimentation` | Appropriation & réécriture |
| 002 — Lire sans ouvrir | Trace / Indice | `trace-indice` | Révélation technique |
| 003 — Street Fighter II | Signification involontaire | `signification-involontaire` | Effets imprévus |

Les six autres familles sont définies mais restent absentes des index publics tant qu’aucune publication ne les utilise. La page et l’entrée d’index apparaissent au premier contenu publié correspondant. `decontextualisation` est disponible pour Amen Break ; aucun article ni angle particulier n’est créé à l’avance.

## Distinctions éditoriales de la fiche 04

Réception possède deux sous-types utiles :

- Réception interprétative : le public reconfigure le sens sans modifier l’objet.
- Réception transformatrice : le public modifie matériellement l’objet — coupe, remix, recadrage, etc. — et cette modification produit le nouveau sens.

Histoire / Sédimentation possède une variante explicitement définie : la *sédimentation cumulative*. Certaines œuvres accumulent des couches de significations contradictoires sans que les précédentes disparaissent. L’Ode à la joie de Beethoven constitue l’exemple de travail développé dans le cahier.

Ces distinctions restent des précisions éditoriales. Elles ne constituent pas de nouvelles familles ni de nouvelles routes.

## Anciennes adresses

`public/_redirects`, copié dans le build statique, déclare des redirections Cloudflare Pages 301, avec et sans barre oblique finale :

- `/mecanismes/appropriation-reecriture/` → `/mecanismes/histoire-sedimentation/`
- `/mecanismes/revelation-technique/` → `/mecanismes/trace-indice/`
- `/mecanismes/effets-imprevus/` → `/mecanismes/signification-involontaire/`

Les anciens identifiants ne sont plus acceptés par les schémas de publication. Aucune ancienne page HTML concurrente n’est générée. Astro preview ne simule pas les règles `_redirects` de Cloudflare : les tests locaux vérifient le fichier généré, les destinations et l’absence de liens obsolètes ; le statut HTTP du service hébergé se vérifie après déploiement.
