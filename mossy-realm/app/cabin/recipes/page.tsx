'use client';

import { useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import InsetPanel from '@/components/ui/InsetPanel';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { recipeBox, type Recipe, type RecipeSection } from '@/lib/cabin-content';

/**
 * /cabin/recipes - the recipe box crossed with an old database.
 *
 * A searchable index of cards. The filter is real: type to query
 * titles, tags, and notes. Sections keep their own trays.
 * All content from lib/cabin-content.ts.
 */

const sections: RecipeSection[] = ['favorites', 'quick meals', 'experiments', 'kerala'];

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <li
      className="
        relative border-panel border-border-structural rounded-sm
        bg-surface-panel-alt p-3
      "
    >
      {recipe.sample && (
        <span
          className="
            absolute top-2 right-2
            font-nav text-micro uppercase tracking-wider
            text-fg-inverse bg-surface-strip
            px-1.5 py-0.5
          "
        >
          sample
        </span>
      )}
      <p className="font-heading text-sm text-fg-heading pr-14">
        {recipe.title}
      </p>
      <div className="flex flex-wrap items-center gap-2 mt-1 font-nav text-meta uppercase tracking-wider text-fg-secondary">
        {recipe.time && <span>{recipe.time}</span>}
        {recipe.serves && <span>serves {recipe.serves}</span>}
        {recipe.outcome && (
          <span className={recipe.outcome === 'worked' ? 'text-status-success' : 'text-fg-warning'}>
            {recipe.outcome === 'worked' ? '✓ worked' : '✗ failed'}
          </span>
        )}
      </div>
      <p className="text-sm text-fg-primary mt-1.5">{recipe.note}</p>
      {recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="pill">{tag}</Badge>
          ))}
        </div>
      )}
    </li>
  );
}

export default function RecipesPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipeBox.recipes;
    return recipeBox.recipes.filter((r) =>
      [r.title, r.note, r.section, ...r.tags].join(' ').toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="my cabin"
        title="recipes"
        deckAccent="~ the kitchen database ~"
      />

      <div className="space-y-5">
        {/* Database strip */}
        <Panel title="{ recipe box }" surface="alt">
          <p className="text-sm text-fg-secondary mb-3">{recipeBox.intro}</p>
          <InsetPanel padding="sm" className="crt">
            <div className="terminal text-md flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>&gt; recipes.db</span>
              <span className="text-fg-secondary">
                {filtered.length}/{recipeBox.recipes.length} records
              </span>
              <label className="flex items-center gap-2 flex-1 min-w-40">
                <span>&gt; query:</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="search the box..."
                  className="
                    flex-1 min-w-0 bg-transparent
                    border-b border-dashed border-border-inset-edge
                    font-terminal text-status-success
                    placeholder:text-fg-secondary placeholder:italic
                    focus:outline-none focus:border-border-focus
                  "
                />
              </label>
            </div>
          </InsetPanel>
        </Panel>

        {/* Section trays */}
        {sections.map((section) => {
          const cards = filtered.filter((r) => r.section === section);
          if (cards.length === 0 && query) return null;
          return (
            <Panel key={section} title={`{ ${section} }`}>
              {cards.length === 0 ? (
                <EmptyState
                  title="~ empty tray ~"
                  message={`no cards filed under ${section} yet. the box is ready when the recipes are.`}
                />
              ) : (
                <ul className="space-y-3">
                  {cards.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </ul>
              )}
            </Panel>
          );
        })}

        <p className="text-center text-caption text-fg-secondary italic">
          cards marked &quot;sample&quot; are placeholders until real recipes get filed.
        </p>
      </div>
    </>
  );
}
