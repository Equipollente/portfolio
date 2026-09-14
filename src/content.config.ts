// Les collections du site. Une seule pour l'instant : les études de cas.
//
// Le schéma porte les trois parties que toute étude a, et que le layout global
// monte toujours dans le même ordre — titre, intro, executive. Elles sont donc
// obligatoires et vérifiées au build : une étude à qui il manque son intro ne se
// construit pas.
//
// Les sections qui suivent (UX decisions, Design decisions, Résultats…) vivent
// dans le corps MDX, parce qu'elles varient d'une étude à l'autre et portent des
// composants. Le schéma ne voit pas ce corps : la règle « au moins une UX
// decision, au moins une Design decision, une Résultats » est contrôlée par la
// route, voir src/site/layouts/case-study/required-sections.ts.
//
// Le motif exclut les fichiers préfixés d'un `_` : _template.mdx est un gabarit
// à copier, pas une étude à publier.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { executiveIcons, executiveTones } from './site/components/case-study/executive';

const lang = z.enum(['fr', 'en']);

const caseStudies = defineCollection({
  loader: glob({ pattern: '[^_]*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    /** Le titre de l'étude : le h1 de la page, et le <title> du document. */
    title: z.string(),
    /** La meta description. */
    description: z.string(),
    /** La langue du contenu. Le document est en `fr` (BaseLayout) ; l'article
     *  la reprend pour qu'un lecteur d'écran prononce le texte correctement. */
    lang: lang.default('en'),
    intro: z.object({
      heading: z.string().default('Intro'),
      /** Un paragraphe par entrée ; un saut de ligne dans une entrée reste un
       *  saut de ligne à l'écran. */
      paragraphs: z.array(z.string()).min(1),
    }),
    /** La colonne de droite de l'intro : rôle, livrables, équipe… */
    metadata: z.array(z.object({ label: z.string(), tags: z.array(z.string()).min(1) })).min(1),
    executive: z.object({
      /** À poser quand ce bloc n'est pas dans la langue de l'étude. */
      lang: lang.optional(),
      items: z
        .array(
          z.object({
            icon: z.enum(executiveIcons),
            tone: z.enum(executiveTones),
            title: z.string(),
            bullets: z.array(z.string()).min(1),
          }),
        )
        .length(3),
    }),
  }),
});

export const collections = { caseStudies };
