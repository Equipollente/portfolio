// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Domaine personnalisé : le site est servi à la racine, pas sous un préfixe.
  // C'est pourquoi il n'y a pas de `base` ici, contrairement au dépôt du design
  // system dont la doc vit sous /UX-design-system/.
  site: 'https://equipollente.org',

  vite: {
    ssr: {
      // Le design system livre des .astro et un .ts bruts : Vite doit les
      // compiler plutôt que les traiter comme un paquet Node déjà construit.
      noExternal: ['ux-design-system'],
    },
  },
});
