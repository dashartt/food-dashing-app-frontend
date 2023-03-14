import { usePathname } from "next/navigation";

export default function useSignParams() {
  const path = usePathname() || "";
  const pathSplitted = path?.split("/");
  const shopId = pathSplitted[1] || "";
  const isAdmin = pathSplitted[2] === "admin" || pathSplitted[1] === "";

  return { shopId, isAdmin };
}
