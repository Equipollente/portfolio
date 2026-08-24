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

- Le site est servi sous `/portfolio/`, pas à la racine d'un domaine. **Tout chemin absolu passe par
  `withBase()`** (importé de `ux-design-system/lib/url`) : un `/icons/x.svg` laissé tel quel marche en
  `npm run dev` et renvoie un 404 en ligne. C'est une erreur qui ne se voit pas en développement —
  seul `npm run build && npm run preview` la montre.
- Pour la même raison, `Header.astro` compare la page courante à `withBase('/')` et non à `'/'` :
  sous un préfixe, l'accueil ne se reconnaîtrait pas et proposerait un retour vers lui-même.
- **`public/robots.txt`** interdit toute indexation tant que les pages sont vides. À retirer quand le
  contenu arrive — sinon le site restera invisible des moteurs sans que rien ne le signale.
- Le domaine `equipollente.org` n'est pas branché : voir le README pour les trois gestes qui le
  rebranchent. Il a de la messagerie Gandi active, donc toute intervention DNS doit laisser les MX et
  le TXT SPF intacts.

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
