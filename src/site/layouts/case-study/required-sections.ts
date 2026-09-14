// La règle d'une étude de cas : au moins une UX decision, au moins une Design
// decision, et une section Résultats. Le schéma de la collection ne voit pas le
// corps MDX, donc c'est ici, appelé par getStaticPaths(), que la règle se tient :
// une étude incomplète fait échouer le build, avec un message qui dit laquelle et
// ce qui lui manque.
//
// C'est un test sur le texte du MDX, pas sur son arbre. Les commentaires
// {/* … */} sont retirés avant, pour qu'une section commentée ne compte pas.

const rules = [
  { tag: 'UxDecision', min: 1, max: Infinity, label: 'au moins une <UxDecision>' },
  { tag: 'DesignDecision', min: 1, max: Infinity, label: 'au moins une <DesignDecision>' },
  { tag: 'Results', min: 1, max: 1, label: 'exactement une <Results>' },
];

export function assertRequiredSections(id: string, body: string | undefined): void {
  const code = (body ?? '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  const broken = rules.filter(({ tag, min, max }) => {
    const count = code.match(new RegExp(`<${tag}[\\s>/]`, 'g'))?.length ?? 0;
    return count < min || count > max;
  });

  if (broken.length > 0) {
    throw new Error(
      `Étude de cas « ${id} » : il faut ${broken.map((r) => r.label).join(', ')}. ` +
        `Voir src/content/case-studies/_template.mdx.`,
    );
  }
}
