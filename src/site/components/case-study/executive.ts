// Les valeurs permises pour une carte executive, séparées du composant pour que
// le schéma de la collection puisse les lire sans importer de .astro ni de .svg.
// Ajouter un glyphe, c'est ajouter son nom ici et son fichier dans icons/.

export const executiveIcons = ['alert-triangle', 'edit', 'trending-up'] as const;
export type ExecutiveIcon = (typeof executiveIcons)[number];

/** Les trois pastilles de Figma (executive-card) : highlight.200, accent.100,
 *  bg.section. Des noms de rôle, pas de couleur, pour survivre à un changement
 *  de palette. */
export const executiveTones = ['highlight', 'accent', 'section'] as const;
export type ExecutiveTone = (typeof executiveTones)[number];
