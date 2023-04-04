import { usePathname, useRouter } from "next/navigation";

const ENV = process.env.NEXT_PUBLIC_REACT_ENV as string;
const FRONTEND_URL =
  ENV === "dev" ? "http://localhost:3000" : "https://fooddashingapp.vercel.app";

export default function useShopSegmentURL() {
  const router = useRouter();
  const path = usePathname();
  const params = { isAdmin: false, shopId: "", baseURL: "", rootURL: "" };

  if (path?.includes("shop")) {
    const [rootSegment = "", rest = ""] = path.split("shop");

    params.shopId = rest.split("/")[1] || "";
    params.rootURL = FRONTEND_URL;
    params.baseURL = `/shop/${params.shopId}/`;
    params.isAdmin = !!rootSegment.includes("dashboard");
  }

  return {
    ...params,
    router,
    path,
    goTo: (href: string) =>
      router.push(href.replace("[shopId]", params.shopId)),
    goToPath: (href: string) =>
      router.push(
        (params.isAdmin
          ? `/dashboard${params.baseURL}`
          : params.baseURL
        ).concat(href)
      ),
  };
}
