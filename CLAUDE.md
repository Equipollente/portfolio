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
  passent par là, pas par `BaseLayout` directement. Sa prop `header={false}` laisse une page monter
  le `Header` elle-même : l'accueil est le seul cas, et la raison est ci-dessous.
- `src/site/sections/Header.astro` — une composition, pas une barre : elle fournit au `Nav` les pages
  du site et celle où l'on se trouve, et rien de plus. Le collage, l'effacement au défilement et le
  seul `z-index` du système appartiennent au `Nav`, par sa prop `sticky`. Ce fichier **ne rend aucune
  balise à lui** : la raison est ci-dessous.
- `src/pages/index.astro` — l'accueil : le premier écran (nav + intro) puis la pile d'études de cas.
  Sa structure et son `<style>` viennent du gabarit `src/pages/templates/home.astro` du design
  system, qui reste la référence si le comportement de la pile doit être revu.
- `src/pages/` — `/projets`, `/how-i-work`, `/about`, `/cv` sont encore des coquilles : les sections
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
  contenu arrive — sinon le site restera invisible des moteurs sans que rien ne le signale. La pile
  de la HP ne suffit pas : elle publie trois fois la même étude de démonstration.
- **Envelopper le `Nav` dans une balise casse son collage, sans erreur ni trace.** Un élément collé
  ne voyage pas hors de son parent : un wrapper de la hauteur de la barre lui rend une boîte où elle
  ne peut plus bouger, et l'effacement l'en fait sortir en laissant le cadre sur place. C'est ce qui a
  coûté au site son repère ARIA `banner` — aucune page n'en porte plus ; le repère `navigation` du
  `Nav`, lui, reste. Pour la même raison, la barre doit rester **hors** du bloc qu'elle surplombe :
  sur l'accueil elle est au-dessus de `.home-first`, jamais dedans.
- **La barre n'a pas de fond**, et c'est le système qui le dit : ce qui flotte au-dessus du contenu,
  ce sont trois objets déjà opaques. Ne pas lui en rendre un ici — si le fond doit revenir, cela se
  décide dans Figma et s'ouvre dans le dépôt du système, pas dans une feuille de ce site.
- Un `overflow` (même `auto`) sur un ancêtre de la pile de l'accueil casse `position: sticky` sans
  erreur ni trace, et la pile redevient une simple liste. Ni `BaseLayout` ni `SiteLayout` n'en posent
  aujourd'hui — c'est à préserver.
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
