import Product from "@/types/productsType";

export function groupStockByVendor(products: Product[]) {
  return products.reduce<Record<string, number>>((acc, prod) => {
    const vendorId = prod.sellerId;
    const qty = Number(prod.productStock ?? 0); // depending on your field name

    if (!vendorId) return acc;

    acc[vendorId] = (acc[vendorId] || 0) + qty;
    return acc;
  }, {});
}
