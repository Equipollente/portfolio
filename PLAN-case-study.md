# Plan : un gabarit d'étude de cas réutilisable (Figma Folio2026 · 79:928)

## Contexte
On intègre la maquette de l'étude de cas Decathlon (fichier `Kalny7U7bPBcfPcEaPtxyl`, nœud `79:928`) en l'**analysant pour en tirer un gabarit** : les prochaines études de cas réutiliseront le même layout, les mêmes sections et les mêmes composants. Le tout suit la documentation Astro (layouts imbriqués via `<slot />`, content collections, MDX, `astro:assets`) et le design system `ux-design-system`.

Structure imposée par Judith :
- **Layout global, toujours identique** : Title → Intro → Executive.
- **Sections variables ensuite**, qui sont des *layouts imbriqués* dans le layout global. Chaque étude en compte **au moins une Design decision, au moins une UX decision, et une Résultats**.

Arbitrages déjà pris :
- Nouveaux composants dans le site pour l'instant ; écart documenté, à remonter dans le DS plus tard.
- Content collection.
- Tout d'affilée, un commit par étape.

Dossier : `C:\Users\judit\Documents\Claude\Projects\portfolio`. Brancher depuis `main` sur `case-study-decathlon-account-vision`.

## Analyse de la maquette → standardisation

| Nœud Figma | Rôle standard | Pièce de code |
|---|---|---|
| 88:3073 case-study-title | fixe | `CaseStudyLayout` → `CaseStudyTitle` |
| 94:3102 case-study-intro | fixe | `CaseStudyLayout` → `CaseStudyIntro` |
| 107:175 case-study-executive-section | fixe | `CaseStudyLayout` → `CaseStudyExecutive` |
| 114:3611, 114:2831 images de contexte | variable, facultative | layout `MediaSection` |
| 121:3650 « decision 1 », 134:4628 « decision 2 » + 134:4924 | **UX decision** | layout `UxDecision` |
| 182:12443, 182:12452, 182:12535 (nommés « case study design decisions ») | **Design decision** | layout `DesignDecision` |
| 182:12599 case-study-impact / Outcomes | **Résultats** | layout `Results` |

Motif commun à toutes les sections variables : **en-tête** (sur-titre, titre `title`, texte `lead`) puis **contenu enrichi** (slot). Ce qui change d'une section à l'autre :
- l'alignement : gauche sur 1104 px pour UX et Résultats, centré sur 768 px pour Design ;
- le fond : `--color-bg-default` ou `--color-bg-surface` ;
- le sur-titre par défaut.

On en tire un layout de base `CaseStudySection`, et trois layouts spécialisés qui l'imbriquent, sur le modèle `BlogPostLayout` → `BaseLayout` de la doc Astro.

## Architecture (docs Astro : layouts imbriqués, collections, MDX)

```
src/
  content.config.ts                         collection `caseStudies` (glob *.mdx + schéma Zod)
  content/case-studies/
    _template.mdx                           squelette commenté pour la prochaine étude (ignoré : préfixe _)
    decathlon-account-vision.mdx            frontmatter = parties fixes ; corps = sections
  assets/case-studies/decathlon-account-vision/   images optimisées par astro:assets
  pages/projets/[slug].astro                getStaticPaths + render(entry) + <Content />
  site/layouts/
    SiteLayout.astro                        (existant) coquille + Header
    CaseStudyLayout.astro                   imbrique SiteLayout ; Title/Intro/Executive ; <slot />
    case-study/
      CaseStudySection.astro                layout de base : <section> + en-tête + <slot />
      UxDecision.astro                      imbrique CaseStudySection (gauche, eyebrow « UX decision »)
      DesignDecision.astro                  imbrique CaseStudySection (centré, mesure 768)
      Results.astro                         imbrique CaseStudySection (eyebrow « Outcomes »)
      MediaSection.astro                    imbrique CaseStudySection (en-tête facultatif)
  site/sections/case-study/                 parties fixes du layout global
    CaseStudyTitle.astro · CaseStudyIntro.astro · CaseStudyExecutive.astro
  site/components/case-study/               briques réutilisables dans les slots
    SectionHeading · BulletList · MetadataList · ExecutiveCard · QuoteCard · QuoteWall
    Panel · VisionCard · MetricCard · Figure · ScreenGallery · TiltedImage
```

### 0. Enregistrer ce plan
Première action après validation : copier ce plan dans le dépôt, sous `C:\Users\judit\Documents\Claude\Projects\portfolio\PLAN-case-study.md`, et le committer sur la branche `case-study-decathlon-account-vision`.

### 1. Dépendances
1. Mettre à jour le DS **depuis le `main` GitHub** : `npm update ux-design-system` (spec `github:Equipollente/UX-design-system` inchangée), qui doit donner le commit `820cda6` dans le lock. Lire d'abord le diff de `Intro`, `CaseStudyList` et `Nav`. On récupère ainsi les tokens `--shadow-*`, les variantes de `Tag` et `--color-border-strong`.
   - Vérifier le lock et `tokens.css`.
   - Vérifier que l'accueil n'a pas régressé.
   - Commit à part.
2. `npx astro add mdx` (intégration officielle `@astrojs/mdx`). Vérifier sa compatibilité avec Astro 7 et `vite.ssr.noExternal`.

### 2. Collection (`src/content.config.ts`)
- `defineCollection({ loader: glob({ pattern: '[^_]*.mdx', base: './src/content/case-studies' }), schema: ({ image }) => z.object({...}) })`.
- Le schéma porte **les parties fixes**, qui sont donc obligatoires et validées au build :
  - `title`, `description` (SEO) ;
  - `intro: { heading, paragraphs[] }` ;
  - `metadata: { label, tags[] }[]` ;
  - `executive: { icon, tone, title, bullets[] }[]` (3 éléments) ;
  - `lang: z.enum(['fr','en'])` ;
  - `cover?: image()`.
- **Règle « ≥ 1 Design, ≥ 1 UX, Résultats »** : le schéma ne voit pas le corps MDX. `[slug].astro` contrôle donc `entry.body` dans `getStaticPaths()`, pour y trouver `<DesignDecision`, `<UxDecision` et `<Results`. Si l'un manque, le build échoue avec un message clair qui nomme l'étude et la section absente. C'est une ligne de code, sans plugin remark.

### 3. Page et layouts
- `src/pages/projets/[slug].astro` : `getStaticPaths` à partir de `getCollection('caseStudies')`, puis `const { Content } = await render(entry)`, puis `<CaseStudyLayout entry={entry.data}><Content /></CaseStudyLayout>`. On vérifie que `projets.astro` coexiste avec `projets/[slug].astro` ; sinon, déplacer vers `projets/index.astro`.
- `CaseStudyLayout.astro` : `<SiteLayout title description>`, `<article>`, puis `CaseStudyTitle` (seul `h1`), `CaseStudyIntro`, `CaseStudyExecutive`, puis `<slot />`.
- `CaseStudySection.astro` :
  - Props : `eyebrow`, `title`, `lead?: string | string[]`, `headingLevel = 2`, `align: 'start'|'center'`, `tone: 'default'|'surface'`, `id?`, `lang?` ;
  - rend `<section aria-labelledby>`, un en-tête (`SectionHeading` + texte), puis le `<slot />` par défaut, qui ne reçoit que des briques.
- `UxDecision`, `DesignDecision`, `Results`, `MediaSection` : des layouts minces qui fixent les réglages, relaient les props et imbriquent `CaseStudySection` avec `<slot />` (pattern « Nesting layouts » de la doc).

Exemple de corps MDX :
```mdx
import UxDecision from '../../site/layouts/case-study/UxDecision.astro';
import QuoteWall from '../../site/components/case-study/QuoteWall.astro';
import journey from '../../assets/case-studies/decathlon-account-vision/parcours.png';

<UxDecision
  eyebrow="decision 1"
  title="Turned the team's certainties into hypotheses research could break"
  lead={["Rejected: present the written strategy, collect approval.", "Instead: …", "Trade: …"]}
>
  <QuoteWall title="Ce dont l'équipe étaient convaincues" quotes={[…]} />
</UxDecision>
```
Les composants sont **importés explicitement** en tête de chaque MDX, comme le documente Astro. `_template.mdx` fournit le bloc d'imports tout prêt (voir risque 6).

### 4. Briques (`src/site/components/case-study/`), en tokens seulement
Conventions reprises de `atelier/conventions.md` du DS :
- en-tête en français avec le nœud Figma ;
- `interface Props` documentée ;
- `class?` et `...rest` sur la racine ;
- `headingLevel` pour tout titre ;
- `<style>` scopé en **100 % `var(--*)`** ;
- toute valeur sans token devient une variable locale nommée et commentée (`--case-measure: 48rem`, `--metric-size` pour 56 px, `--quote-accent-width` pour 3 px, `--executive-icon-size` pour 100 px).

Images via `<Image>` de `astro:assets`, ce qui gère `base` sans `withBase`. Réemploi du DS : `Tag` (`variant="accent"`), `Icon` (glyphes des cartes executive s'ils existent, sinon SVG exporté de Figma).

| Brique | Figma | Tokens clés |
|---|---|---|
| `SectionHeading` (eyebrow + titre, `size: display\|title\|subtitle`) | section-heading / subheading | `--font-family-heading`, `--font-size-*`, `--font-letter-spacing-widest`, `--color-text-muted` |
| `BulletList` | section-body-list | `--space-lg`, `--space-sm`, `--color-neutral-300` |
| `MetadataList` | casestudy-metadata-list | `--space-xl`, `--space-sm`, `Tag` |
| `ExecutiveCard` (`tone: highlight\|accent\|section`) | executive-card | `--color-border-strong`, `--radius-md`, `--shadow-md`, `--space-2xl` |
| `QuoteCard` (avatar?, citation, auteur?) | Stakeholder Quote / User Quote | `--color-border-default`, `--color-accent-200`, `--font-weight-medium` |
| `QuoteWall` (panneau, 2 colonnes, hauteur bornée) | Convictions 131:3870 | `--color-neutral-100`, `--radius-md`, `--space-xl` |
| `Panel` (sous-titre + texte + slot) | Realite 131:3976 | `--space-lg`, `--space-xl` |
| `TiltedImage` | Image-incline 182:12595 | `--color-neutral-200`, `--radius-md`, `--shadow-contact-*` |
| `VisionCard` | Cards/UXVision | `--color-text-accent`, `--shadow-md` |
| `MetricCard` | Cards/Metric Highlight | `--color-text-accent`, `--color-feedback-success`, `--font-size-body-sm` |
| `Figure` (image + légende titre/texte) | img + caption | `--radius-md`, `--shadow-md`, `--font-size-ui` |
| `ScreenGallery` (bande défilante d'écrans avec légende) | 182:12456, 182:12539, 174:12292 | `--color-neutral-100`, `--space-2xl` |

Sous 768 px, les rangées passent en colonne et les galeries défilent horizontalement (`overflow-x: auto` sur la galerie seule, jamais sur un ancêtre de la nav collante).

### 5. Contenu
- `decathlon-account-vision.mdx` reprend les textes **mot pour mot** du Figma. Les coquilles de la maquette (« Manaeer », « scor », « uin », « Buisness », « Decathlon” s ») seront listées à Judith, pas corrigées en silence.
- Assets téléchargés depuis les URL MCP (elles expirent sous 7 jours) vers `src/assets/case-studies/decathlon-account-vision/`.
- Avant chaque section : `get_design_context` sur son nœud. Il reste à lire 114:2831, 134:4628, 182:12443 et 182:12535.
- `_template.mdx` : frontmatter vide commenté, et un exemple minimal des trois sections obligatoires.

### 6. Documentation
- `LINKS.md` : page case study, avec la table des nœuds et la correspondance Figma → layout.
- `CLAUDE.md` :
  - la structure du gabarit ;
  - comment ajouter une étude (copier `_template.mdx`) ;
  - la règle des 3 sections obligatoires ;
  - `src/site/components/case-study/` comme zone de transit vers le DS.
- Vérifier que « Projets » est bien actif dans `Header.astro` sur `/projets/<slug>` : la comparaison actuelle est stricte. Si ce n'est pas le cas, le signaler plutôt que de modifier le Nav.

## Risques relevés à la relecture, et parades

**Dépendances**
1. **Le DS `main` a 110 commits d'avance** (sur `a1bdb04`) : l'API de `Intro`, `CaseStudyList` ou `Nav` peut avoir changé, et l'accueil casser.
   - Parade : lire le diff de ces 3 composants avant la mise à jour, lancer `astro check` et un build, contrôler l'accueil visuellement (liseré, pile, nav collante).
   - Si ça casse, s'arrêter et le signaler. Ne rien réparer côté DS depuis ici.
2. **`npm install …#main` réécrit `package.json`** en suivant une branche mobile.
   - Parade : garder la spec d'origine `github:Equipollente/UX-design-system` et faire `npm update ux-design-system`, qui prend la tête de `main` en ligne. Contrôler ensuite que le lock indique `820cda6`.
3. **Compatibilité `@astrojs/mdx` avec Astro 7** : `astro add` modifie la config.
   - Parade : vérifier la version peer, relire le diff de `astro.config.mjs` (conserver `base` et `vite.ssr.noExternal`) et faire un build à vide avant d'aller plus loin.

**MDX et slots**
4. **Slots nommés et paragraphes auto dans MDX** : `<Fragment slot="lead">` suivi de markdown produit des `<p>` imprévus, et une ligne vide mal placée casse le JSX.
   - Parade : **plus de slot nommé**. L'en-tête passe en props (`eyebrow`, `title`, `lead: string | string[]`) et le slot par défaut ne reçoit que des briques.
5. **Styles scopés et contenu slotté** : les styles d'un layout ne s'appliquent pas aux éléments que la page lui glisse.
   - Parade : chaque brique porte ses propres styles, et le layout ne stylise que sa grille (`> *` via `:where()`). Aucun markdown brut dans les sections.
6. **`<Content components={{…}}>` pour des composants capitalisés** : ce n'est documenté que pour des noms d'éléments HTML.
   - Parade : **imports explicites en tête du MDX**, le cas documenté. `_template.mdx` fournit le bloc d'imports tout prêt.
7. **Props non typés dans MDX** : `astro check` ne valide pas les props passés depuis un `.mdx`, donc une faute de prop passe inaperçue.
   - Parade : props obligatoires vérifiées dans le frontmatter de chaque layout et brique, avec un `throw` explicite.
8. **Contrôle des sections obligatoires par regex sur `entry.body`** : un commentaire MDX contenant `<Results` fausse le résultat.
   - Parade : ignorer les commentaires `{/* */}` avant le test, et documenter la règle.
9. **Fichiers `_` dans le glob loader** : il n'est pas certain qu'ils soient ignorés par défaut.
   - Parade : le motif `[^_]*.mdx` est explicite ; vérifier que `_template` n'a pas de route.

**Images et icônes**
10. **Assets Figma** : les images masquées (114:2831, raster 2462 px décalé) sont exportées entières, pas recadrées ; les PNG de slides sont lourds.
    - Parade : recadrer en CSS (`object-fit` / `object-position`, variables locales commentées), et laisser `astro:assets` produire du WebP avec `width`/`height`. S'assurer que `sharp` s'installe sous Windows.
11. **Icônes executive exportées** : les SVG de 100 px contiennent probablement la pastille colorée **en hex**, contraire à la règle des tokens.
    - Parade : pastille dessinée en CSS avec tokens, glyphe via `Icon` du DS. Si le glyphe manque, SVG exporté du glyphe seul en `currentColor`, et signalement.

**Contenu et publication**
12. **Langue** : `BaseLayout` pose `lang="fr"` alors que le contenu est majoritairement en anglais, avec du français mêlé. Un lecteur d'écran prononcerait mal.
    - Parade : `lang` dans le frontmatter (`z.enum(['fr','en'])`), posé sur `<article>`, et `lang` local sur les blocs dans l'autre langue.
13. **Confidentialité et publication** : captures Decathlon et slides Digitall, sur un site GitHub Pages public.
    - Parade : rien n'est poussé ni fusionné sans accord ; branche locale. `robots.txt` reste en place. Question ouverte pour Judith : ces visuels sont-ils publiables ?
14. **Coquilles « mot pour mot »** : elles seraient publiées telles quelles.
    - Parade : liste des coquilles remise à Judith à la fin. Rien n'est corrigé sans son accord.

**Intégration au site**
15. **Nav** : « Projets » ne sera probablement pas actif sur `/projets/<slug>`, parce que la comparaison est stricte.
    - Parade : le constater et le signaler. Le correctif éventuel est dans `Header.astro` (préfixe), pas dans le `Nav` du DS.
16. **`overflow` et collage** : `QuoteWall` (hauteur bornée) et `ScreenGallery` ont besoin d'`overflow`.
    - Parade : uniquement sur la brique elle-même, jamais sur `article`, une section ou un layout (règle du CLAUDE.md).
17. **Serveur de dev** : le CLAUDE.md dit `astro dev --background`, mais le Browser pane attend `preview_start`.
    - Parade : `.claude/launch.json` avec `npm run dev`, port 4321.
18. **Nommage** : les « layouts de section » ne sont pas des coquilles de page. La doc Astro l'autorise (« partial UI templates »).
    - Parade : commentaire d'en-tête qui explique le choix, et dossier `site/layouts/case-study/` séparé des composants.

## Ordre des commits
1. DS depuis `main`.
2. MDX + collection + route + `CaseStudyLayout` vide.
3. Title.
4. Intro.
5. Executive.
6. `CaseStudySection` + `MediaSection`.
7. `UxDecision` + briques quotes/panel/tilted/vision.
8. `DesignDecision` + gallery/figure.
9. `Results` + metric.
10. `_template.mdx` + contrôle des sections obligatoires.
11. Docs.

## Vérification
- `npx astro check` : aucune erreur de type ni de schéma.
- Retirer `<Results>` du MDX fait échouer le build avec le message attendu, puis on le remet.
- `astro dev --background`, puis `/portfolio/projets/decathlon-account-vision` dans le Browser pane :
  - comparaison section par section avec les captures Figma ;
  - console vide ;
  - un seul `h1`, et une hiérarchie `h2`/`h3` cohérente (`read_page`) ;
  - mobile 375 px : pas de scroll horizontal de page ;
  - nav collante OK.
- `grep` : ni hex ni px bruts dans `src/site/**/case-study*` hors variables locales commentées.
- `npm run build && npm run preview` : aucune image en 404 sous `/portfolio/`.
- Capture finale envoyée via SendUserFile.
