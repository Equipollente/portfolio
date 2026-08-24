// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Tant que le site n'a pas de domaine propre, GitHub Pages le sert sous le nom
  // du dépôt. Pour brancher equipollente.org le jour venu, trois gestes : remettre
  // site: 'https://equipollente.org', supprimer `base`, et reposer public/CNAME
  // avec le domaine dedans. Aucun autre code ne bouge — withBase() redevient une
  // fonction identité dès que `base` disparaît.
  site: 'https://equipollente.github.io',
  base: '/portfolio',

  vite: {
    ssr: {
      // Le design system livre des .astro et un .ts bruts : Vite doit les
      // compiler plutôt que les traiter comme un paquet Node déjà construit.
      noExternal: ['ux-design-system'],
    },
  },
});
