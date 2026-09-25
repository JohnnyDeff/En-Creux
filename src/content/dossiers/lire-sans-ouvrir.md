---
episodeNumber: "002"
themes:
  - histoire-patrimoine
  - sciences-techniques
mechanisms:
  - trace-indice
mechanismAngle: "Révélation technique"
title: "Lire sans ouvrir"
subtitle: "Les papyrus d'Herculanum"
publishDate: 2026-09-18
description: "Carbonisés par le Vésuve il y a près de deux mille ans, les papyrus d’Herculanum commencent à être lus sans être ouverts. Enquête sur le Vesuvius Challenge."
cardDescription: "Les papyrus carbonisés d’Herculanum étaient trop fragiles pour être déroulés. La tomographie, la géométrie 3D et l’apprentissage automatique commencent à rendre leurs textes visibles."
---

<!-- Image 1 : rouleau carbonisé documenté ; fichier, crédit et droits à vérifier. -->

Ils ressemblent moins à des livres qu’à des morceaux de charbon.

Des cylindres noirs, déformés, comprimés sur eux-mêmes. À première vue, rien ne permet d’imaginer que sous cette matière brûlée subsistent encore des lignes, des mots, des phrases écrites il y a plus de deux mille ans.

Et pourtant, elles sont là.

Le problème est précisément celui-ci : **le texte existe, mais on ne peut pas aller le chercher.**

Dérouler le papyrus risque de le réduire en fragments. Le laisser intact revient à accepter de ne jamais le lire.

Pendant des siècles, les rouleaux d’Herculanum ont été pris dans ce paradoxe.

Aujourd’hui, on commence à les ouvrir sans les ouvrir.

---

## Une bibliothèque brûlée

En 79 de notre ère, l’éruption du Vésuve ensevelit Pompéi et Herculanum.

À Herculanum, les phénomènes volcaniques atteignent des températures de plusieurs centaines de degrés. Les matières organiques sont carbonisées. Le bois, les aliments, les tissus — et les rouleaux de papyrus — subissent une transformation qui aurait pu signifier leur disparition.

Elle va aussi contribuer à leur conservation.

Enfermés sous les dépôts volcaniques, privés d’air et protégés de la décomposition ordinaire, certains matériaux traversent les siècles. Le phénomène est suffisamment exceptionnel pour que soient parvenus jusqu’à nous des objets organiques qui, ailleurs, auraient depuis longtemps disparu.

Parmi eux se trouve quelque chose d’unique.

Au XVIIIe siècle, les fouilles d’une immense résidence romaine d’Herculanum mettent au jour une collection de papyrus carbonisés. La villa en tirera son nom : **la Villa des Papyrus**.

Entre 1752 et 1754, environ 1 800 fragments de rouleaux sont extraits du site. Ils ne correspondent pas nécessairement à autant de livres : les estimations suggèrent plutôt de l’ordre de **800 volumes originaux**.

La distinction est importante.

Car les chiffres spectaculaires ont parfois fini par masquer la réalité matérielle de cette bibliothèque : des rouleaux entiers, mais aussi des fragments, des portions séparées, des objets endommagés ou partiellement déroulés.

L’ensemble reste néanmoins sans équivalent. Il constitue la plus importante collection de livres conservée de l’Antiquité gréco-romaine et la seule bibliothèque antique de cette ampleur à nous être parvenue sous cette forme.

Une part importante des textes identifiés relève de la philosophie grecque, notamment de l’épicurisme et de l’œuvre de Philodème de Gadara.

Dès leur découverte, la tentation est évidente.

Il faut les lire.

Et pour les lire, on essaie de les ouvrir.

C’est là que commence le désastre.

---

## Le livre impossible

Un papyrus carbonisé n’est pas un rouleau ancien que l’on pourrait dérouler avec suffisamment de précautions.

Les couches ont été chauffées, comprimées, déformées. Elles adhèrent parfois les unes aux autres. Certaines sont déchirées. D’autres sont devenues si fragiles qu’une manipulation suffit à les briser.

Les premières tentatives d’ouverture sont parfois brutales.

Des rouleaux sont découpés. D’autres sont progressivement déroulés à l’aide de dispositifs mécaniques, au prix de pertes parfois irréversibles. On parvient malgré tout à sauver et à lire une partie des textes.

Mais chaque lecture peut coûter une partie de l’objet.

Le problème devient alors presque insoluble :

**comment accéder à l’intérieur d’un livre sans traverser sa matière ?**

Il faudra changer complètement de logique.

Ne plus ouvrir le rouleau.

En fabriquer une représentation.

---

## Entrer dans le papyrus

L’idée paraît simple : scanner le rouleau aux rayons X, reconstituer son intérieur en trois dimensions puis dérouler virtuellement les différentes couches de papyrus.

Dans la pratique, chaque étape devient un problème scientifique à part entière.

La tomographie ne produit pas des pages.

Elle produit un volume tridimensionnel composé de minuscules éléments appelés voxels.

À l’intérieur de ce volume, les feuilles de papyrus sont pliées, écrasées, déchirées et imbriquées les unes dans les autres.

Il faut d’abord retrouver leurs surfaces.

Puis les suivre.

Puis construire une géométrie capable de représenter chaque feuille sans la confondre avec celle qui la touche.

Puis transformer cette surface courbe en une image plane.

Autrement dit : reconstituer une page qui n’a pas été physiquement mise à plat depuis l’Antiquité.

Cette technique de **déroulage virtuel** n’est pas née avec le Vesuvius Challenge. Le chercheur Brent Seales et son équipe travaillent depuis des années sur ces méthodes. Elles avaient notamment permis de lire virtuellement le rouleau carbonisé d’En-Gedi, découvert en Israël.

Mais les papyrus d’Herculanum présentent une difficulté supplémentaire.

L’encre.

---

## Chercher du noir dans du noir

Avec certains manuscrits anciens, l’encre contient des éléments métalliques qui apparaissent nettement dans une tomographie.

Pas ici.

L’encre utilisée sur les papyrus d’Herculanum est principalement carbonée.

Le papyrus carbonisé l’est lui aussi.

Aux rayons X, les deux matériaux présentent donc des propriétés extrêmement proches.

On cherche, littéralement, **du carbone déposé sur du carbone**.

Le texte peut se trouver sous les yeux de la machine sans apparaître comme une écriture.

C’est à cet endroit qu’intervient l’apprentissage automatique.

En mars 2023 est lancé le **Vesuvius Challenge**, une compétition internationale initiée notamment par l’ancien dirigeant de GitHub Nat Friedman, l’entrepreneur Daniel Gross et Brent Seales.

Le projet met à disposition des scans, des données et des outils, et propose des récompenses financières à ceux qui permettront de franchir les différents obstacles techniques.

L’idée n’est pas de demander à une intelligence artificielle de comprendre un texte antique dissimulé dans un rouleau.

Il faut d’abord lui apprendre quelque chose de beaucoup plus élémentaire :

**où se trouve l’encre ?**

Des modèles sont entraînés à reconnaître dans les volumes X des signaux associés aux zones écrites.

En octobre 2023, Luke Farritor, alors étudiant en informatique, parvient à faire apparaître plusieurs lettres grecques dans les scans d’un rouleau fermé.

Parmi elles, un premier mot devient lisible :

**πορφύρας — porphyras.**

Le pourpre.

Pour la première fois, quelques signes tracés avant l’éruption du Vésuve réapparaissent depuis l’intérieur d’un rouleau que personne n’a déroulé.

---

<!-- Image 2 : mot πορφύρας issu des lectures de 2023 ; fichier, crédit et droits à vérifier. -->

## Ce que fait réellement l’IA

L’image est irrésistible.

**Une intelligence artificielle lit un livre vieux de deux mille ans.**

Elle est aussi trompeuse.

Car aucune machine ne prend seule un rouleau carbonisé pour en livrer soudain la traduction.

Entre l’objet archéologique et le texte lisible se déploie une chaîne extrêmement humaine.

Il faut conserver les papyrus.

Les transporter.

Les scanner à l’aide d’instruments capables de produire des images d’une résolution suffisante.

Reconstruire leur volume.

Identifier les feuilles.

Les segmenter.

Les déplier virtuellement.

Détecter les traces susceptibles d’être de l’encre.

Assembler les images.

Puis viennent les papyrologues.

Ce sont eux qui examinent les caractères, évaluent les incertitudes, distinguent une lettre d’une autre, reconstruisent les mots, identifient la langue, reconnaissent éventuellement un auteur ou une œuvre et replacent le fragment dans son contexte historique.

L’intelligence artificielle ne remplace pas cette chaîne.

Elle prend place à l’intérieur.

La réalité est donc moins spectaculaire qu’une machine ressuscitant seule une bibliothèque antique.

Elle est aussi beaucoup plus intéressante.

Un objet archéologique passe par un synchrotron, devient un volume numérique, puis une surface reconstruite, puis une image dans laquelle des algorithmes tentent de distinguer l’encre avant qu’un spécialiste puisse enfin retrouver une phrase.

C’est peut-être précisément ce qui rend le Vesuvius Challenge intéressant : il montre une utilisation de l’IA presque opposée au fantasme d’une machine omnisciente.

Elle ne sait pas ce que le texte signifie.

Elle aide à le rendre visible.

---

## Quelques colonnes dans l’obscurité

En février 2024, une nouvelle étape est franchie.

Trois participants — Youssef Nader, Luke Farritor et Julian Schilliger — remportent le Grand Prize du Vesuvius Challenge après avoir permis de révéler plusieurs passages continus d’un rouleau jusque-là fermé.

Cette fois, il ne s’agit plus seulement de quelques lettres.

Un texte apparaît.

Il est en grec. Il est philosophique. Il parle notamment du plaisir, de la musique et des sensations.

Les papyrologues peuvent commencer à suivre un raisonnement resté inaccessible pendant près de deux millénaires.

Le projet vient de franchir une frontière importante.

Il ne démontre plus seulement qu’une trace d’encre peut être retrouvée.

Il commence à restituer un texte.

En 2025, une autre découverte apporte quelque chose de différent : non plus seulement des phrases, mais une identité.

Dans le rouleau **PHerc. 172**, les dernières lignes permettent d’identifier une partie de *Sur les vices*, du philosophe épicurien Philodème.

Un titre.

Un auteur.

Un livre qui avait matériellement survécu, mais dont l’identité restait enfermée dans sa propre matière.

---

## Un rouleau presque revenu à l’état de livre

Puis vient 2026.

Avec **PHerc. 1667**, le Vesuvius Challenge franchit un nouveau seuil.

Il faut ici être précis.

PHerc. 1667 n’est pas un rouleau antique resté parfaitement intact depuis l’éruption.

Il avait déjà subi plusieurs tentatives d’ouverture physique aux XIXe et XXe siècles. Une partie de ses couches externes avait été détruite ou perdue.

Ce qui subsiste est un noyau encore roulé.

En juin 2026, les équipes annoncent être parvenues à virtuellement dérouler et lire **l’intégralité de cette portion conservée** : environ 1,4 mètre de papyrus et une vingtaine de colonnes de texte grec.

Ce n’est donc pas « le premier rouleau antique intégralement lu sans l’ouvrir » au sens où nous posséderions toutes les pages du volume original.

C’est quelque chose de plus précis :

**le premier rouleau d’Herculanum dont toute la partie encore préservée sous forme roulée a été virtuellement déroulée et lue.**

Le texte relève de l’éthique et présente des caractéristiques stoïciennes.

La dernière partie conservée mentionne Aristocréon, neveu et disciple de Chrysippe.

Le rouleau lui-même semble également ancien. L’analyse paléographique et le contenu du texte conduisent les chercheurs à le situer au **IIe siècle avant notre ère, sans exclure la toute fin du IIIe siècle**. Il serait ainsi antérieur à Philodème et appartiendrait à une strate plus ancienne que nombre des textes jusqu’ici identifiés dans la bibliothèque.

La tentation serait immédiatement d’aller plus loin.

D’imaginer une œuvre perdue de Chrysippe.

Mais rien ne permet encore de l’affirmer.

Le texte peut être situé dans un contexte stoïcien.

Son auteur précis reste inconnu.

La nuance ne diminue pas la découverte.

Elle évite seulement d’ajouter au rouleau ce que nous aimerions y trouver.

---

<!-- Image 3 : surface virtuellement déroulée de PHerc. 1667 ; fichier, crédit et droits à vérifier. -->

## La trace laissée par l’écriture

Quelques jours avant l’annonce concernant PHerc. 1667, une étude publiée en juin 2026 apporte un autre élément à l’histoire.

Elle cherche à comprendre ce que les modèles peuvent réellement détecter lorsque l’encre et le papyrus sont tous deux composés essentiellement de carbone.

L’hypothèse est étonnante.

Écrire ne dépose peut-être pas seulement une substance sur le papyrus.

Le geste pourrait également modifier, à une échelle minuscule, **la topographie de sa surface**.

Les chercheurs examinent des lettres provenant de papyrus déjà ouverts à l’aide d’une mesure extrêmement précise de leur relief.

Un modèle entraîné sur ces informations parvient, dans ces conditions expérimentales, à distinguer les zones portant de l’encre des zones non écrites.

Il serait tentant d’en tirer une formule parfaite :

**la plume a laissé son empreinte dans la matière.**

Mais le résultat demande encore de la prudence.

L’étude repose sur un petit nombre d’échantillons. Les résultats varient selon les papyrus. Les auteurs eux-mêmes parlent d’une preuve de concept.

Nous ne savons donc pas encore si ce signal pourra être exploité avec la même efficacité dans tous les rouleaux fermés.

Mais l’idée demeure saisissante.

Même lorsque l’encre se confond chimiquement avec son support, l’acte d’écrire semble avoir laissé autre chose.

Un relief.

Une déformation de quelques micromètres.

Une trace assez faible pour rester invisible pendant deux mille ans.

Mais peut-être assez réelle pour être retrouvée.

---

<!-- Image 4 facultative : figure de microtopographie, sous réserve de lisibilité mobile et de droits vérifiés. -->

## Une découverte ouverte

Il existe un autre aspect moins spectaculaire du Vesuvius Challenge qui mérite pourtant autant d’attention que les images de lettres surgissant du noir.

Une grande partie du travail est ouverte.

Les scans sont mis à disposition.

Les surfaces reconstruites peuvent être téléchargées.

Des outils sont publiés.

Des modèles sont partagés.

Des équipes extérieures peuvent reprendre les données, tester d’autres approches, proposer une meilleure segmentation ou contester une lecture.

Le concours lui-même est construit autour de cette circulation.

Cela ne signifie pas que toutes les interprétations soient automatiquement vraies.

Mais cela change profondément le rapport au résultat.

Il n’est pas nécessaire de croire uniquement une image publiée dans un communiqué de presse.

On peut revenir vers les données.

Et cette ouverture compte particulièrement lorsque l’image visible est issue de plusieurs couches successives de traitement algorithmique.

---

## Une bibliothèque et ses mécènes

Le Vesuvius Challenge n’est pas non plus une institution archéologique traditionnelle.

Son histoire ne commence pourtant pas avec ses mécènes. Avant le lancement du concours en 2023, les recherches de Brent Seales et de son équipe avaient notamment bénéficié de financements publics américains, destinés au développement des méthodes de détection d’encre et des infrastructures de recherche. Le concours vient prolonger et accélérer des travaux déjà engagés depuis plusieurs années.

Son financement est principalement privé.

Nat Friedman en est à la fois l’un des initiateurs, le directeur et le principal mécène affiché. Daniel Gross fait partie des sponsors fondateurs. Le projet reçoit également des financements importants de plusieurs personnalités et fondations privées, parmi lesquelles la Musk Foundation.

Les montants se chiffrent en millions de dollars.

Cela mérite d’être dit.

Pas parce qu’un financement privé rendrait automatiquement les résultats suspects.

Mais parce qu’il indique qui rend cette recherche possible, qui organise le concours et qui produit une partie de sa communication.

Une annonce publiée par le Vesuvius Challenge reste une source primaire sur le Vesuvius Challenge.

Elle ne devient pas une corroboration indépendante parce qu’elle est reprise ailleurs.

D’où la nécessité de revenir aux publications scientifiques, aux institutions qui réalisent les scans, aux équipes de papyrologues et aux données ouvertes.

Sur un sujet où les mots « intelligence artificielle », « texte perdu » et « Antiquité » suffisent à produire des titres spectaculaires, la distinction n’est pas secondaire.

---

## Ce qu’il pourrait y avoir dedans

C’est ici que commence la partie la plus dangereuse de l’histoire.

Parce que la bibliothèque d’Herculanum existe, parce que des centaines de papyrus demeurent difficiles ou impossibles à lire physiquement, et parce que la technologie progresse, la tentation est grande d’imaginer ce qu’ils contiennent.

Des tragédies perdues.

Des ouvrages inconnus.

Des textes d’Aristote.

De nouveaux livres de philosophes dont seules quelques citations nous sont parvenues.

Des pans entiers de la littérature antique ressuscités.

Tout cela appartient au domaine du possible.

Mais nous n’en savons rien.

Les ouvrages déjà identifiés dans la bibliothèque sont très majoritairement liés à la philosophie grecque, en particulier au cercle épicurien et à Philodème. Quelques textes latins ont également été retrouvés.

L’ensemble connu ne constitue donc pas un échantillon aléatoire de toute la littérature antique.

Il existe une autre inconnue.

La Villa des Papyrus demeure en partie enfouie sous la ville moderne.

D’autres pièces peuvent encore exister.

Peut-être contiennent-elles d’autres livres.

Peut-être pas.

Là encore, une possibilité n’est pas une découverte.

Le Vesuvius Challenge est déjà suffisamment extraordinaire sans lui prêter les livres que nous rêvons d’y trouver.

---

## Passer du rouleau à la bibliothèque

En septembre 2026, le Vesuvius Challenge indique avoir scanné **45 rouleaux ou fragments**.

De l’encre a été détectée dans neuf d’entre eux.

Cela ne signifie pas que neuf livres sont désormais lisibles.

Détecter un signal correspondant probablement à de l’encre et reconstruire plusieurs dizaines de colonnes exploitables sont deux choses très différentes.

Pour l’instant, un seul rouleau — PHerc. 1667 — a vu toute sa partie roulée préservée virtuellement déroulée et lue.

C’est à la fois très peu et considérable.

Très peu par rapport à la masse de documents conservés.

Considérable parce que la question scientifique a changé.

Pendant longtemps, elle était :

**est-il possible de lire un papyrus d’Herculanum sans l’ouvrir ?**

Nous connaissons désormais la réponse.

Oui.

La question devient :

**peut-on le faire suffisamment bien, suffisamment vite et suffisamment automatiquement pour passer d’un rouleau à une bibliothèque ?**

Et rien ne garantit encore la réponse.

La segmentation des feuilles reste difficile. Les rouleaux n’ont pas tous été carbonisés ou déformés de la même façon. La qualité des scans varie. La détection de l’encre n’est pas uniforme.

La prochaine révolution ne sera peut-être donc pas la découverte d’un mot spectaculaire.

Elle pourrait être beaucoup moins visible :

une méthode suffisamment robuste pour fonctionner presque systématiquement.

---

## Lire sans ouvrir

Il y a quelque chose de profondément contemporain dans cette histoire.

Pendant des siècles, accéder à une information cachée signifiait intervenir sur son support.

Ouvrir.

Découper.

Prélever.

Détruire parfois.

Ici, le rapport s’inverse.

Nous pouvons observer l’intérieur d’un objet sans y entrer physiquement.

Reconstruire une surface que nous ne touchons pas.

Détecter un signal que l’œil ne voit pas.

Puis restituer un texte sans que le rouleau ait bougé.

Le papyrus reste fermé.

Et pourtant il s’ouvre.

Ce qui réapparaît alors n’est pas seulement une suite de caractères grecs.

C’est un geste.

Quelqu’un a préparé une feuille de papyrus.

Quelqu’un a trempé un calame dans de l’encre.

Quelqu’un a posé sa main sur cette surface.

Quelqu’un a écrit une phrase.

Le Vésuve a brûlé cette feuille.

La matière s’est refermée sur elle.

Deux mille ans plus tard, nous ne pouvons toujours pas la toucher.

Mais nous pouvons recommencer à la lire.

Le texte n’était pas perdu.

Il était là.

**En creux.**

