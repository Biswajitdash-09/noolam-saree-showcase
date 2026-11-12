"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";

import { SilkArt } from "@/components/site/silk-fabric";
import { useStore } from "@/components/site/store";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { bridal, CATEGORIES, getProduct, looks, products, type Swatch } from "@/lib/data";
import { formatINR } from "@/lib/utils";

type Entry = {
  id: string;
  title: string;
  kind: string;
  href: string;
  price?: number;
  swatch?: Swatch;
  /** Lower-case words to match against. */
  words: string[];
  /** Words in the title score higher. */
  titleWords: string[];
};

const words = (...parts: (string | undefined)[]) =>
  parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label;

const index: Entry[] = [
  ...products.map((p) => ({
    id: `p-${p.id}`,
    title: p.name,
    kind: p.kind === "blouse" ? "Blouse" : "Saree",
    href: `/product/${p.slug}`,
    price: p.price,
    swatch: p.swatch,
    titleWords: words(p.name),
    words: words(
      p.name,
      p.fabric,
      p.pallu,
      p.swatch.name,
      p.kind,
      p.badge,
      ...p.categories.map(categoryLabel),
      p.madeToOrder ? "made to order" : undefined,
    ),
  })),
  ...looks.map((l) => ({
    id: `l-${l.id}`,
    title: l.name,
    kind: "Look",
    href: "/#try-the-look",
    titleWords: words(l.name),
    words: words(l.name, "look", ...l.pieces.map((piece) => piece.name)),
  })),
  ...bridal.map((b) => ({
    id: `b-${b.id}`,
    title: b.name,
    kind: "Bridal",
    href: "/bridal",
    price: b.price,
    swatch: b.swatch,
    titleWords: words(b.name),
    words: words(b.name, b.fabric, b.pallu, b.swatch.name, "bridal wedding muhurtham"),
  })),
];

function search(query: string) {
  const tokens = words(query);
  if (!tokens.length) return [];
  return index
    .map((entry) => {
      let score = 0;
      for (const token of tokens) {
        const inTitle = entry.titleWords.some((word) => word.startsWith(token));
        const inBody = entry.words.some((word) => word.startsWith(token));
        if (!inTitle && !inBody) return null;
        score += inTitle ? 3 : 1;
      }
      if (entry.title.toLowerCase().startsWith(query.trim().toLowerCase())) score += 2;
      return { entry, score };
    })
    .filter((item): item is { entry: Entry; score: number } => item !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((item) => item.entry);
}

const suggestions = ["Bridal", "Zari", "Green", "Blouse", "Checked", "Half saree"];

/** ⌘K / Ctrl+K search across sarees, blouses, looks and bridal pieces. */
export function SearchDialog() {
  const { searchOpen, setSearchOpen, recent } = useStore();
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const listId = React.useId();

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(!searchOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  React.useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const recentEntries = React.useMemo(
    () =>
      recent
        .map((slug) => getProduct(slug))
        .filter((p) => p !== undefined)
        .slice(0, 5)
        .map((p) => index.find((entry) => entry.id === `p-${p.id}`)!)
        .filter(Boolean),
    [recent],
  );

  const results = React.useMemo(() => search(query), [query]);
  const list = query.trim() ? results : recentEntries;

  React.useEffect(() => setActive(0), [query]);

  const open = (entry: Entry) => {
    setSearchOpen(false);
    router.push(entry.href);
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent
        showClose={false}
        className="top-[12svh] max-w-[620px] -translate-y-0 overflow-hidden p-0"
      >
        <DialogTitle className="sr-only">Search the collection</DialogTitle>
        <DialogDescription className="sr-only">
          Type to search sarees, blouses, looks and bridal pieces. Use the arrow keys to choose, Enter to open.
        </DialogDescription>
        <div className="flex items-center gap-3 border-b border-ink/10 px-5">
          <Search className="size-5 shrink-0 text-ink-soft" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((value) => (list.length ? (value + 1) % list.length : 0));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((value) => (list.length ? (value - 1 + list.length) % list.length : 0));
              } else if (event.key === "Enter" && list[active]) {
                event.preventDefault();
                open(list[active]);
              }
            }}
            role="combobox"
            aria-expanded={list.length > 0}
            aria-controls={listId}
            aria-activedescendant={list[active] ? `${listId}-${list[active].id}` : undefined}
            aria-autocomplete="list"
            aria-label="Search the collection"
            placeholder="Search by colour, weave or name"
            className="h-16 min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-soft/55"
          />
          <kbd className="hidden rounded-md border border-ink/15 px-1.5 py-0.5 text-[11px] text-ink-soft sm:block">Esc</kbd>
        </div>

        <div data-lenis-prevent className="max-h-[min(60svh,460px)] overflow-y-auto p-2">
          {list.length > 0 && (
            <p className="px-3 pb-1.5 pt-2 text-[12px] text-ink-soft">
              {query.trim() ? `${results.length} ${results.length === 1 ? "match" : "matches"}` : "Recently viewed"}
            </p>
          )}
          <ul id={listId} role="listbox" aria-label="Results">
            {list.map((entry, i) => (
              <li
                key={entry.id}
                id={`${listId}-${entry.id}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => open(entry)}
                className="flex cursor-pointer items-center gap-3.5 rounded-2xl px-3 py-2.5 aria-selected:bg-cream"
              >
                <span className="h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-cream">
                  {entry.swatch && <SilkArt swatch={entry.swatch} shape="drape" className="h-full w-full" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-medium text-ink">{entry.title}</span>
                  <span className="block text-[12px] text-ink-soft">{entry.kind}</span>
                </span>
                {entry.price !== undefined && (
                  <span className="text-[13px] tabular-nums text-gold-700">{formatINR(entry.price)}</span>
                )}
                {i === active && <CornerDownLeft aria-hidden className="size-4 text-ink-soft" />}
              </li>
            ))}
          </ul>

          {query.trim() && results.length === 0 && (
            <p className="px-3 py-8 text-center text-[14px] text-ink-soft">
              Nothing matches &ldquo;{query}&rdquo;. Try a colour like &ldquo;green&rdquo; or a weave like &ldquo;zari&rdquo;.
            </p>
          )}

          {!query.trim() && (
            <div className="px-3 pb-3 pt-3">
              <p className="text-[12px] text-ink-soft">Try</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] text-ink transition hover:border-maroon-600 hover:text-maroon-700"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
