import { MenuItemCard } from "@/components/MenuItemCard";
import type { MenuItem } from "@/lib/types";

type MenuCategorySectionProps = {
  title: string;
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
};

export function MenuCategorySection({
  title,
  items,
  onAddToCart,
}: MenuCategorySectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold text-[#234336]">{title}</h2>
        <div className="h-px flex-1 bg-[#d9c7a8]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard
            item={item}
            key={item.id}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
