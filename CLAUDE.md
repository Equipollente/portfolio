## Liens

Fichier Figma, prototypes, maquettes par page : [LINKS.md](LINKS.md). À tenir à jour quand une
maquette ou un prototype s'ajoute.

## La règle du projet

Le design system n'est **pas** dans ce dépôt : il est installé comme dépendance depuis
[Equipollente/UX-design-system](https://github.com/Equipollente/UX-design-system) et s'importe par
son nom de paquet (`ux-design-system/components/…`, `ux-design-system/layouts/…`).

**Ne jamais recopier un composant du système ici pour le modifier.** S'il manque quelque chose, cela
se corrige dans le dépôt du système, puis `npm update ux-design-system`. Une copie locale qui diverge
est exactement ce que la séparation en deux dépôts sert à empêcher.

Ce qui est propre au site — la liste des pages, la page courante, les textes, les chemins d'icônes —
se passe en props aux composants du système. Un composant qui connaîtrait les pages du portfolio ne
serait plus un composant.

## Structure

- `src/site/layouts/SiteLayout.astro` — la coquille du système plus la chrome du site. Les pages
  passent par là, pas par `BaseLayout` directement.
- `src/site/sections/Header.astro` — la barre collante ; c'est elle qui fournit au `Nav` les pages du
  site et celle où l'on se trouve.
- `src/pages/` — `/`, `/projets`, `/how-i-work`, `/about`, `/cv`. Encore des coquilles : les sections
  viendront s'empiler dans le `<slot>` du layout.
- `public/icons/`, `public/images/` — les assets que le site passe en props au système.

## Ce qui casse silencieusement

- **`public/CNAME`** porte le domaine `equipollente.org`. S'il disparaît de `public/`, le prochain
  déploiement fait perdre le domaine à GitHub Pages.
- **`public/robots.txt`** interdit toute indexation tant que les pages sont vides. À retirer quand le
  contenu arrive — sinon le site restera invisible des moteurs sans que rien ne le signale.
- Le site est servi à la racine du domaine : **pas de `base`** dans `astro.config.mjs`. Le
  `withBase()` du système renvoie alors les chemins inchangés, il n'y a rien à faire.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Deploying to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
