export const getFormattedProductAndOrderIds = (
  orderId: string,
  perviousOrderProductIds: { productId: string }[],
  uniqueProductIds: string[],
): { productId: string; orderId: string }[] => {
  const existingOrderProductIds = perviousOrderProductIds.map(
    (product) => product.productId,
  );

  const newProductIds = uniqueProductIds.filter(
    (productId) => !existingOrderProductIds.includes(productId),
  );

  const formattedProductIds = newProductIds.map((productId) => {
    return { productId, orderId };
  });

  return formattedProductIds;
};
