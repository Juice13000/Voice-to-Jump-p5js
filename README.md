# Voice Jumper - p5.js

Un jeu d'arcade de type "auto-runner" développé en JavaScript avec la bibliothèque p5.js et p5.sound. Le personnage saute en fonction du volume sonore capté par le microphone.

## Concept et Jouabilité

L'objectif de Voice Jumper est de survivre le plus longtemps possible en sautant de plateforme en plateforme au-dessus du vide, tout en esquivant des murs. 

La mécanique principale repose sur la voix :
1. Autorisez l'accès au microphone lors du lancement (un clic sur l'interface est requis pour débloquer les sécurités du navigateur).
2. Faites du bruit (parlez, soufflez, etc.). Si le volume d'entrée dépasse un certain seuil, le personnage effectue un saut.
3. Le défilement horizontal est automatique. L'ambiance visuelle évolue en fonction du score (Ciel, Grotte, Lave).

(Note : La touche "Espace" est également configurée comme alternative au microphone pour faciliter les tests).

## Architecture du Projet

Le code est structuré en Programmation Orientée Objet (POO) et réparti sur plusieurs fichiers pour garantir de la lisibilité :

* `index.html` : Fichier racine chargeant les bibliothèques et les scripts.
* `sketch.js` : Moteur principal gérant les états du jeu (Accueil, En jeu, Game Over).
* `player.js` : Classe gérant la physique du joueur (gravité, saut au micro) et son affichage.
* `platform.js` : Classe gérant la génération et le défilement du sol.
* `obstacle.js` : Classe gérant les murs et les collisions.
* `particle.js` : Classe gérant les effets visuels de l'arrière-plan (parallaxe).

---

### 1. Les parties pour lesquelles j'ai utilisé une IA

* **Refactorisation en POO :** J'avais déjà la logique de base, mais j'ai utilisé l'IA pour m'aider à réorganiser proprement mon code en différentes classes (Player, Obstacle, Platform) afin de le rendre modulaire un maximum.
* **Logique de défilement et génération infinie :** Aide sur l'algorithme permettant d'instancier le décor à droite de l'écran, de le faire défiler de manière fluide et de le supprimer avec `.splice()` lorsqu'il sort du canvas.
* **Gestion des collisions :** Assistance pour calculer les boîtes de collision entre le joueur, les murs et les plateformes.
* **Améliorations visuelles et décor :** Aide pour intégrer la fonction `lerpColor()` (pour la transition des fonds), la génération des particules d'arrière-plan, et l'application des ombres portées (`drawingContext`).

### 2. Le prompt initial utilisé

Voici le prompt de base formulé après avoir rédigé ma Fiche de Spécification :

> "Depuis cette fiche de spécification, aide-moi à coder étape par étape mon jeu en p5.js. Pour plus
de contexte, mon jeu est un voice jumper, ce jeu aura un décor sobre et contrasté qui évolue plus on avance.
Code toujours de manière simple sans commentaire abusif de partout, et de manière orientée
objet (POO)."


### 3. Les modifications que j'ai apportées et mon implication

* **Logique de base et fondations :** J'ai créé la structure de départ du jeu : la mise en place de l'environnement, l'apparition du joueur (le carré).
* **Résolution Microphone) :** Face aux blocages de sécurité des navigateurs, j'ai effectué mes propres recherches sur le wiki et la documentation de p5.js pour trouver et implémenter la solution appropriée (`userStartAudio().then()`).
* **Level Design (Le Vide) :** C'est mon initiative de faire du "vide" le danger principal. Au lieu d'un sol plat infini classique, j'ai dirigé l'IA pour modifier la structure afin que le joueur doive sauter de plateforme en plateforme.
* **Rééquilibrage global :** J'ai ajusté manuellement les variables du jeu pour le rendre amusant et jouable : la vitesse de défilement, la force de la gravité, la hauteur du saut du personnage, et les algorithmes définissant l'apparition des obstacles et la taille des trous.
