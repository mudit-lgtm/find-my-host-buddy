import { AdsterraAd } from "./AdsterraAd";

/**
 * 160x600 desktop-only sticky sidebar ad.
 */
export function AdsterraSidebar() {
  return (
    <aside className="hidden xl:block sticky top-20 self-start ml-4">
      <AdsterraAd adKey="2755c86594539a288e3bf1f09fcd014d" width={160} height={600} />
    </aside>
  );
}
