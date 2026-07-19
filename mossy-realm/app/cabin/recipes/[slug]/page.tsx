import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import InsetPanel from '@/components/ui/InsetPanel';
import Badge from '@/components/ui/Badge';
import TextLink from '@/components/ui/TextLink';
import MetaRow from '@/components/ui/Metadata';
import { recipeBox, type Recipe } from '@/lib/cabin-content';

/**
 * /cabin/recipes/[slug] - the full recipe card.
 *
 * A stained index card pulled from the box: database printout strip
 * on top, ruled lines under the lists, kitchen notes at the bottom
 * in the handwriting font. Prev/next walks the box in filing order.
 */

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return recipeBox.recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipeBox.recipes.find((r) => r.slug === slug);
  return { title: `${recipe?.title ?? 'recipe'} - MossyRealm` };
}

const statusLabels: Record<Recipe['status'], string> = {
  favorite: '★ favorite',
  tested: '✓ tested',
  experiment: '⚗ experiment',
  failed: '✗ failed',
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const index = recipeBox.recipes.findIndex((r) => r.slug === slug);
  if (index === -1) notFound();

  const recipe = recipeBox.recipes[index];
  const prev = recipeBox.recipes[index - 1] ?? null;
  const next = recipeBox.recipes[index + 1] ?? null;
  const recordNo = String(index + 1).padStart(3, '0');

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { href: '/cabin/recipes', label: 'my cabin' },
          { href: '/cabin/recipes', label: 'recipes' },
          { label: recipe.title },
        ]}
        eyebrow="recipe box"
        title={recipe.title}
      />

      <div className="space-y-5 max-w-2xl mx-auto">
        {/* The stained card */}
        <Panel padding="none" surface="alt" className="stained-card">
          {/* Database printout strip */}
          <InsetPanel padding="sm" className="crt m-3 mb-0">
            <div className="terminal text-meta flex flex-wrap gap-x-4 gap-y-1">
              <span>&gt; recipes.db</span>
              <span>record #{recordNo}</span>
              <span>filed: {recipe.section}</span>
              <span className={recipe.status === 'failed' ? 'text-fg-warning' : ''}>
                {statusLabels[recipe.status]}
              </span>
              {recipe.sample && <span className="text-fg-warning">SAMPLE CARD</span>}
            </div>
          </InsetPanel>

          <div className="p-4 space-y-4">
            {/* Measurements */}
            {(recipe.prepTime || recipe.cookTime || recipe.serves) && (
              <MetaRow>
                {recipe.prepTime && <span>prep {recipe.prepTime}</span>}
                {recipe.cookTime && <span>cook {recipe.cookTime}</span>}
                {recipe.serves && <span>serves {recipe.serves}</span>}
              </MetaRow>
            )}

            <p className="text-fg-primary">{recipe.note}</p>

            {/* Ingredients */}
            {recipe.ingredients.length > 0 && (
              <section aria-label="Ingredients">
                <h3 className="font-heading text-sm text-fg-heading uppercase tracking-wider mb-2">
                  ingredients
                </h3>
                <ul className="ruled-lines space-y-0 text-sm">
                  {recipe.ingredients.map((item) => (
                    <li key={item} className="flex gap-2 leading-[1.7em]">
                      <span aria-hidden="true" className="text-border-structural">☐</span>
                      <span className="text-fg-primary">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Steps */}
            {recipe.steps.length > 0 && (
              <section aria-label="Steps">
                <h3 className="font-heading text-sm text-fg-heading uppercase tracking-wider mb-2">
                  steps
                </h3>
                <ol className="ruled-lines space-y-0 text-sm list-none">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-2.5 leading-[1.7em]">
                      <span className="font-nav text-fg-heading shrink-0">{i + 1}.</span>
                      <span className="text-fg-primary">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Kitchen notes, in the margin-handwriting font */}
            {recipe.kitchenNotes.length > 0 && (
              <section aria-label="Kitchen notes" className="border-t border-dashed border-border-subtle pt-3">
                {recipe.kitchenNotes.map((note) => (
                  <p key={note} className="font-accent text-fg-heading text-md">
                    ~ {note}
                  </p>
                ))}
              </section>
            )}

            {recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="pill">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        </Panel>

        {/* Card navigation */}
        <nav aria-label="Recipe box navigation" className="flex flex-wrap justify-between gap-3 font-nav text-sm">
          {prev ? (
            <TextLink href={`/cabin/recipes/${prev.slug}`} back>
              {prev.title}
            </TextLink>
          ) : (
            <span />
          )}
          <TextLink href="/cabin/recipes" className="mx-auto">
            back to the recipe box
          </TextLink>
          {next ? (
            <TextLink href={`/cabin/recipes/${next.slug}`} arrow>
              {next.title}
            </TextLink>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </>
  );
}
