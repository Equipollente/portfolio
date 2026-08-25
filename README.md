# Portfolio — Judith Heckmann

Le portfolio de Judith Heckmann, product designer. Site Astro publié sur
**<https://equipollente.github.io/portfolio/>**.

> **État : coquille.** Le `Header` est fini ; les cinq pages attendent leurs sections. Le site est
> volontairement en `Disallow: /` dans [robots.txt](public/robots.txt) tant qu'il n'y a rien à lire —
> deux lignes à retirer le jour où le contenu arrive.

## Il consomme le design system, il ne le contient pas

Les composants, les layouts et les 115 tokens viennent du paquet
[`ux-design-system`](https://github.com/Equipollente/UX-design-system), installé depuis son dépôt :

```js
import BaseLayout from 'ux-design-system/layouts/BaseLayout.astro';
import Nav from 'ux-design-system/components/Nav.astro';
```

Rien du système n'est recopié ici — c'est tout l'intérêt. Pour prendre la dernière version :

```sh
npm update ux-design-system
```

Ce qui appartient en propre au portfolio :

```
src/site/layouts/SiteLayout.astro   la coquille du système + la chrome du site
src/site/sections/Header.astro      donne au Nav les pages et la page courante ; le collage est au Nav
src/pages/                          /, /projets, /how-i-work, /about, /cv
public/images/                      l'avatar et les visuels d'étude de cas, passés en props
```

Les icônes, elles, viennent du système : le `Nav` reçoit des **noms** (`icon="route"`), pas des
chemins. Elles sont inlinées, donc sans URL — et le site n'a rien à servir pour elles.

## Commandes

| Commande | Effet |
| --- | --- |
| `npm install` | Installe les dépendances, design system compris (Node ≥ 22.12) |
| `npm run dev` | Serveur de développement |
| `npm run build` | Construit le site dans `dist/` |
| `npm run preview` | Sert `dist/` |

## Déploiement

GitHub Pages, à chaque push sur `main`, via [le workflow](.github/workflows/deploy.yml).

Faute de domaine propre pour l'instant, le site est servi sous le nom du dépôt : `base: '/portfolio'`
dans la configuration Astro, et **tout chemin absolu passe par `withBase()`** — un `/icons/x.svg`
laissé tel quel marche en local et renvoie un 404 en ligne.

Le domaine `equipollente.org` est prêt à être branché quand tu voudras. Trois gestes, aucun autre
code à toucher :

1. `astro.config.mjs` : remettre `site: 'https://equipollente.org'` et **supprimer `base`** —
   `withBase()` redevient alors une fonction identité.
2. Recréer `public/CNAME` avec `equipollente.org` dedans (il doit vivre dans `public/` pour être
   republié à chaque déploiement, sinon GitHub perd le domaine).
3. Pointer le DNS vers GitHub Pages, en laissant les MX et le SPF intacts.

## Les maquettes

Fichier Figma, prototypes et nœuds par page : [LINKS.md](LINKS.md).
