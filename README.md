# Portfolio — Judith Heckmann

Le portfolio de Judith Heckmann, product designer. Site Astro publié sur
**<https://equipollente.org>**.

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
src/site/sections/Header.astro      barre collante ; donne au Nav les pages et la page courante
src/pages/                          /, /projets, /how-i-work, /about, /cv
public/icons/ public/images/        les icônes et l'avatar que le Header passe au Nav en props
```

Les icônes vivent ici et non dans le système : le `Nav` reçoit ses chemins en props, c'est donc le
site qui décide quelle icône va sur quel onglet.

## Commandes

| Commande | Effet |
| --- | --- |
| `npm install` | Installe les dépendances, design system compris (Node ≥ 22.12) |
| `npm run dev` | Serveur de développement |
| `npm run build` | Construit le site dans `dist/` |
| `npm run preview` | Sert `dist/` |

## Déploiement

GitHub Pages, à chaque push sur `main`, via [le workflow](.github/workflows/deploy.yml). Le domaine
`equipollente.org` est déclaré par [public/CNAME](public/CNAME) : le fichier doit rester dans
`public/` pour être republié à chaque déploiement, sans quoi GitHub perd le domaine.

Le site est servi à la racine du domaine — pas de `base` dans la configuration Astro, contrairement
au dépôt du design system dont la doc vit sous un préfixe.

## Les maquettes

Fichier Figma, prototypes et nœuds par page : [LINKS.md](LINKS.md).
