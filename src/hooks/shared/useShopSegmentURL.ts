import { usePathname, useRouter } from "next/navigation";

export default function useShopSegmentURL() {
  const router = useRouter();
  const path = usePathname();
  const urlParams = { isAdmin: false, shopId: "" };

  if (path?.includes("shop")) {
    const [rootSegment = "", rest = ""] = path.split("shop");

    urlParams.shopId = rest.split("/")[1] || "";
    urlParams.isAdmin = !!rootSegment.includes("dashboard");
  }

  return {
    isAdmin: urlParams.isAdmin,
    shopId: urlParams.shopId,
    goTo: (href: string) =>
      router.push(href.replace("[shopId]", urlParams.shopId)),
  };
}
