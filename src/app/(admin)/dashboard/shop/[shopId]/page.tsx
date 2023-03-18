"use client";

import { useEffect, useState } from "react";

export default function ShopAdminPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return <>{mounted && <p>shop admin page</p>}</>;
}
