export default function ShopAdminPage({
  params,
}: {
  params: { shopId: string };
}) {
  console.log(params.shopId);

  return <p>{params.shopId}</p>;
}
