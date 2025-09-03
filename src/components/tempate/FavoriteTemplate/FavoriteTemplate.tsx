'use client';

import { CardMovie } from '@/components/molecules/CardMovie';
import { useFavoriteList } from '@/hooks/use-favorite-list';

export function FavoriteTemplate() {
  const { favorites } = useFavoriteList();

  // gestire i loading

  if (favorites.length === 0 || !favorites) {
    return <div>Nessun elemento nella lista dei preferiti.</div>;
  }

  return (
    <div className="grid gap-[13px]">
      {favorites.map((c) => (
        <CardMovie key={c.id} card={c} />
      ))}
    </div>
  );
}
