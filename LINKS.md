# Liens du portfolio

La partie « site » des liens. Tout ce qui concerne le système lui-même — fondations, composants,
variables — est dans le `LINKS.md` du dépôt design system.

Fichier Figma : `uQ5j90wu2MJSvzsN3Oc0pT`
<https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system>

Les maquettes du site vivent sur la page **Templates** du fichier :
[`9-2`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=9-2)

## Prototypes

Deux points de départ, tous deux sur la page Templates.

| Prototype | Lien |
| --- | --- |
| HP — Desktop | [`45-388`](https://www.figma.com/proto/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=45-388&starting-point-node-id=45%3A388) |
| HP — Mobile | [`142-1193`](https://www.figma.com/proto/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=142-1193&starting-point-node-id=142%3A1193) |

## Maquettes, par page du site

| Page | URL prévue | Nœud | Statut d'intégration |
| --- | --- | --- | --- |
| HP (desktop) | `/` | [`45-388`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=45-388) | Header + intro + pile d'études de cas ([`222-1168`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=222-1168)) |
| HP (mobile) | `/` | [`142-1193`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=142-1193) | Header + intro + pile d'études de cas |
| Projets | `/projets` | [`166-453`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=166-453) | Coquille vide |
| How I work | `/how-i-work` | [`166-327`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=166-327) | Coquille vide |
| About me | `/about` | [`166-579`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=166-579) | Coquille vide |
| CV | `/cv` | [`166-705`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=166-705) | Coquille vide |

Les prototypes des pages Projets / How I work / About / CV n'ont pas encore de point de départ dans
Figma.

L'ancre `#projets` est portée par la pile d'études de cas de la HP. Deux choses y mènent : le bouton
de l'intro, et l'onglet « Projets » du menu — mais celui-ci seulement depuis l'accueil ; depuis les
autres pages, il ouvre `/projets`.

## Études de cas

Les maquettes d'étude de cas vivent dans un autre fichier, **Folio2026** : `Kalny7U7bPBcfPcEaPtxyl`
<https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026>

| Étude | URL | Nœud | Statut d'intégration |
| --- | --- | --- | --- |
| Decathlon — account vision | `/projets/decathlon-account-vision` | [`79-928`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=79-928) | Intégrée, sert de référence au gabarit |

Correspondance entre la maquette et le gabarit (voir `CLAUDE.md` → Études de cas) :

| Nœud Figma | Pièce de code |
| --- | --- |
| [`88-3073`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=88-3073) case-study-title | `CaseStudyLayout` → `CaseStudyTitle` (fixe) |
| [`94-3102`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=94-3102) case-study-intro | `CaseStudyLayout` → `CaseStudyIntro` (fixe) |
| [`107-175`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=107-175) case-study-executive-section | `CaseStudyLayout` → `CaseStudyExecutive` (fixe) |
| [`114-3611`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=114-3611), [`114-2831`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=114-2831) visuels de contexte | `MediaSection` + `Figure` |
| [`121-3650`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=121-3650) decision 1 | `UxDecision` + `Split`, `QuoteWall`, `Panel` |
| [`134-4628`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=134-4628) + [`134-4924`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=134-4924) decision 2 | `UxDecision body="band"` + `CardGrid`, `VisionCard` |
| [`182-12443`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=182-12443), [`182-12452`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=182-12452), [`182-12535`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=182-12535) | `DesignDecision` + `ScreenGallery` |
| [`182-12599`](https://www.figma.com/design/Kalny7U7bPBcfPcEaPtxyl/Folio2026?node-id=182-12599) outcomes | `Results` + `MetricCard`, `ExecutiveCard` |

Composants Figma sans équivalent dans le design system, intégrés côté site en attendant d'y
remonter : section-heading, section-body-list, casestudy-metadata-list, executive-card,
Cards/Stakeholder Quote, Cards/User Quote, Cards/UXVision, Cards/Metric Highlight.

## Le Nav en situation

Le composant est documenté côté design system ; ces deux nœuds montrent ce que le `Header` en fait.

| Cas | Nœud |
| --- | --- |
| État accueil (sans avatar) | [`60-992`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=60-992) |
| État page courante | [`166-475`](https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=166-475) |

## Construire un lien Figma à la main

- **Design** : `https://www.figma.com/design/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=<id>`
- **Prototype** : `https://www.figma.com/proto/uQ5j90wu2MJSvzsN3Oc0pT/UX-design-system?node-id=<id>&starting-point-node-id=<id-encodé>`

Dans une URL, l'identifiant de nœud s'écrit avec un tiret (`45-388`) ; l'API et les outils l'écrivent
avec deux-points (`45:388`). C'est le même nœud.
