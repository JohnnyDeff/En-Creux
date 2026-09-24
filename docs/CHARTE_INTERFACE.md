# Charte d’interface EN CREUX

Cette charte fixe les invariants de l’interface. Elle s’applique à l’accueil et aux listes de publications, indépendamment du sujet, du format ou du nombre d’articles.

## Une grille commune

Toutes les publications d’une même liste utilisent les mêmes colonnes, gouttières et marges. Leurs titres commencent au même alignement horizontal, quelle que soit leur longueur. La dernière publication hérite de cette grille ; elle ne possède pas de colonne éditoriale décalée. Sur mobile, toutes les lignes passent ensemble à une seule colonne.

## Une hiérarchie typographique stable

Les rôles restent distincts : numéro, format, date, titre, description et liens de découverte. Les titres conservent une échelle commune et un interligne cohérent. Les retours à la ligne suivent la largeur disponible et le contenu, sans hauteur fixe ni troncature destinée à égaliser artificiellement les articles.

## Une mise en avant modérée

La dernière publication se distingue par le repère « Dernière publication », le vermillon du numéro et une légère augmentation typographique. Repères pour les listes : numéro mis en avant plafonné à 3rem et titre à environ 3.3rem sur ordinateur. Cette variante ne change ni la grille ni les espacements extérieurs communs ; elle ne doit pas dominer l’ensemble du flux.

Les espacements verticaux suivent le même rythme pour toutes les publications. Une différence de hauteur doit provenir du contenu utile, pas d’un surcroît de marges réservé à la première ligne.

## Des règles indépendantes des sujets

Aucune règle CSS ne cible un sujet, un numéro éditorial ou un slug. Les variantes expriment un rôle réutilisable, comme la dernière publication, et continuent de fonctionner lorsque le corpus ou son ordre évolue. Ne pas ajouter de saut de ligne manuel dans un titre pour résoudre un défaut de composition.

## Des composants partagés

Réutiliser les composants de liste, de date et de taxonomie sur l’accueil, les index et les pages de découverte. Corriger les styles communs lorsque le problème est commun ; éviter les copies de composants et les exceptions locales. Une modification partagée doit être vérifiée dans les autres contextes qui l’utilisent.

## L’identité EN CREUX

- Fond blanc cassé : `#F5F5F3`.
- Texte noir : `#0A0A0A`.
- Accent vermillon : `#D64833`.
- Titres et numéros : Space Grotesk.
- Corps et métadonnées : Inter.
- Composition : grilles, filets et repères discrets. Les codes de thèmes restent secondaires ; ils ne remplacent pas l’accent de marque.

## Validation comparative

Avant une modification systémique, capturer le rendu de référence et identifier le défaut à corriger. Comparer ensuite les mêmes publications ensemble, avant et après, à 1280, 768, 390 et 320 px. Contrôler les alignements avec des titres courts et longs, l’échelle des numéros et titres, les espacements, les métadonnées, la lisibilité des liens et l’absence de débordement horizontal.

Vérifier aussi les listes réutilisant les composants concernés. Une validation ne repose pas sur une carte isolée : conserver des captures montrant plusieurs publications successives. Exécuter le build avant livraison et soumettre le diff et les captures à validation avant commit ou push.
