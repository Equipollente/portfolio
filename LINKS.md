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
