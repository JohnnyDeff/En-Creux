---
themes:
  - jeu-video
mechanisms:
  - signification-involontaire
mechanismAngle: "Effets imprévus"
title: "Street Fighter II — La commande qui pardonnait"
episodeNumber: "003"
category: "Culture"
publishDate: 2026-09-23
description: "En voulant faciliter les coups spéciaux, les créateurs de Street Fighter II ont ouvert une nouvelle manière de maîtriser le jeu."
---

En 1991, *Street Fighter II* arrive dans les salles d’arcade. Deux personnages se font face. Un joystick, six boutons, quelques dizaines de secondes pour prendre l’avantage.

Parmi les combattants, Ryu possède une attaque devenue célèbre : le Hadoken, une boule d’énergie qu’il projette vers son adversaire. Pour la déclencher, le joueur doit effectuer un mouvement précis au joystick, puis appuyer sur un bouton de coup de poing.

Mais lorsqu’on découvre le jeu, les doigts ne font pas toujours ce que l’on voudrait.

Une pression arrive trop tôt. Au lieu du Hadoken attendu, Ryu lance un coup de poing ordinaire.

Pour les concepteurs, le problème est simple : le joueur a essayé de réaliser une attaque spéciale, mais le jeu lui a répondu par une autre action.

Ils vont chercher à rendre cette réponse plus tolérante.

Et découvrir, presque malgré eux, une nouvelle manière de jouer.

## Quand le jeu accepte de changer d’avis

L’une des solutions consiste à autoriser une attaque spéciale à remplacer le mouvement d’une attaque normale déjà commencée.

Prenons un exemple.

Ryu donne un coup de pied bas. Celui-ci touche son adversaire. Normalement, le personnage doit encore terminer son mouvement avant de revenir à sa position de repos.

Mais si le joueur entre à temps la commande du Hadoken, le jeu peut interrompre la fin du coup de pied et lancer immédiatement la boule d’énergie.

L’attaque normale a touché. L’attaque spéciale prend sa suite. L’adversaire peut être atteint une seconde fois avant d’avoir récupéré du premier impact.

C’est le principe d’un *cancel* : l’annulation d’une partie du mouvement en cours par une autre action.

Il ne s’agit ni d’un espace vide entre deux animations, ni de deux coups simplement exécutés l’un après l’autre. Le second remplace la fin du premier, dans une fenêtre autorisée par le jeu.

Tous les coups ne peuvent pas être annulés, et une annulation ne garantit pas à elle seule que les deux attaques toucheront. Mais certaines combinaisons permettent désormais de réaliser des enchaînements que les concepteurs n’avaient pas initialement cherchés à créer de cette manière : des *combos*.

<figure class="article-figure">
  <picture>
    <source media="(max-width: 600px)" srcset="/images/street-fighter-ii-cancel-mobile.svg" width="360" height="720" />
    <img src="/images/street-fighter-ii-cancel.svg" alt="Sans cancel : attaque normale, impact, fin du mouvement, retour au repos, action suivante. Avec cancel : à l’impact, la fin du mouvement est interrompue et remplacée par le Hadoken, l’attaque spéciale enchaînée." width="720" height="460" loading="lazy" />
  </picture>
  <figcaption>
    Schéma explicatif EN CREUX, d’après les explications techniques publiées par Capcom. Dans certaines conditions, l’attaque normale touche, puis l’attaque spéciale remplace la fin de son mouvement.
    <span class="article-figure-credit">Illustration : EN CREUX.</span>
  </figcaption>
</figure>

## Une découverte, pas un bug oublié

L’histoire pourrait s’arrêter ici : une erreur de programmation aurait créé l’une des techniques emblématiques du jeu de combat.

Mais ce récit ne correspond pas exactement aux témoignages des développeurs.

Akira Nishitani, responsable de la conception de *Street Fighter II*, évoque dès 1991 un enchaînement imprévu entre un uppercut normal et un Shoryuken, l’attaque ascendante de Ryu. Il explique que cette combinaison est apparue à la suite d’ajustements apportés aux paramètres du jeu et raconte sa surprise lorsqu’il l’a découverte.

Les développeurs n’avaient pas programmé cet enchaînement comme une technique à enseigner aux joueurs. Mais ils l’avaient vu avant la sortie du jeu.

Nishitani revient plus précisément sur le mécanisme dans un entretien publié en 2017. L’équipe voulait améliorer la réponse des commandes : lorsqu’un joueur tentait un Hadoken mais appuyait trop tôt sur un bouton, le jeu devait pouvoir reconnaître son intention plutôt que le laisser avec un coup ordinaire.

L’annulation des attaques normales n’était pas l’objectif recherché pour lui-même. C’est une possibilité que les développeurs ont constatée en travaillant sur cette tolérance. Ils l’ont trouvée intéressante et ont décidé de la conserver.

Nishitani conteste d’ailleurs le terme de *bug* appliqué à cette mécanique : son apparition n’était pas prévue, mais son intégration au jeu a été délibérée.

La nuance est décisive.

Une possibilité imprévue n’est pas nécessairement une erreur laissée sans correction. Elle peut devenir une décision de conception à partir du moment où ses créateurs découvrent ce qu’elle permet.

## Ce qui devait pardonner devient une exigence

Revenons au joueur qui rate son Hadoken.

Le système a été pensé pour lui éviter de subir trop sévèrement une imprécision de commande. Il veut effectuer une attaque spéciale ; le jeu essaie de lui permettre d’y parvenir malgré un bouton pressé trop tôt.

Mais cette indulgence ouvre autre chose.

Un joueur peut désormais chercher volontairement à faire toucher une attaque normale, puis à l’interrompre au moment approprié. Il ne s’agit plus de récupérer une commande maladroite. Il s’agit de maîtriser une succession d’actions.

L’erreur que le système devait pardonner devient un geste que l’on peut apprendre à provoquer.

Avec les cancels, une partie de la difficulté se déplace. Elle ne consiste plus seulement à réussir un coup spécial isolé, mais à connaître les attaques qui peuvent être annulées, choisir la bonne suite et respecter le moment où le jeu accepte l’enchaînement.

Capcom consacre aujourd’hui des explications techniques détaillées à ces possibilités, y compris à leurs différences selon les versions de *Street Fighter II*. Ce qui avait émergé comme effet secondaire d’un réglage appartient désormais au vocabulaire que l’on enseigne pour comprendre le jeu.

Ce déplacement raconte quelque chose de plus intéressant que la naissance accidentelle d’un combo.

Les concepteurs avaient défini des personnages, des attaques et des règles. Ils n’avaient pas prévu tous les gestes que ces règles rendraient possibles.

Les joueurs, eux, n’ont pas créé le mécanisme. Ils ont appris à en faire un usage.

Entre l’intention de départ et la pratique qui se développe, *Street Fighter II* révèle ainsi une propriété particulière des systèmes interactifs : **une fonction conçue pour faciliter une action peut ouvrir un nouvel espace de maîtrise que personne n’avait entièrement dessiné à l’avance.**

La commande devait pardonner.

**Les joueurs ont appris à ne plus lui demander pardon.**
