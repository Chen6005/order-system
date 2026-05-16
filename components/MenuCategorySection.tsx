import { MenuItemCard } from "@/components/MenuItemCard";
import type { CartItem, MenuItem } from "@/lib/types";

type MenuCategorySectionProps = {
  title: string;
  items: MenuItem[];
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onIncreaseQuantity: (menuItemId: string) => void;
  onDecreaseQuantity: (menuItemId: string) => void;
};

export function MenuCategorySection({
  title,
  items,
  cartItems,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
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
            onDecrease={onDecreaseQuantity}
            onIncrease={onIncreaseQuantity}
            quantityInCart={
              cartItems.find((cartItem) => cartItem.menuItemId === item.id)
                ?.quantity ?? 0
            }
          />
        ))}
      </div>
    </section>
  );
}
