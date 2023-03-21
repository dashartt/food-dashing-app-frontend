import { usePathname, useRouter } from "next/navigation";

export default function useShopSegmentURL() {
  const router = useRouter();
  const path = usePathname();
  const params = { isAdmin: false, shopId: "", baseURL: "" };

  if (path?.includes("shop")) {
    const [rootSegment = "", rest = ""] = path.split("shop");

    params.shopId = rest.split("/")[1] || "";
    params.baseURL = `/shop/${params.shopId}/`;
    params.isAdmin = !!rootSegment.includes("dashboard");
  }

  return {
    ...params,
    router,
    path,
    goTo: (href: string) =>
      router.push(href.replace("[shopId]", params.shopId)),
  };
}
