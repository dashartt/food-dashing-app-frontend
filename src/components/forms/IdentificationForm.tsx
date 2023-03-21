import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useSessionState from "@/store/useSession";

export default function IdentificationForm() {
  const [mounted, setMounted] = useState(false);
  const { session, setSession } = useSessionState();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <form className="space-y-4">
          <FormControl>
            <FormLabel htmlFor="fullName">Nome completo</FormLabel>
            <Input
              value={session?.fullName}
              onChange={({ target }) =>
                setSession({
                  ...session!,
                  fullName: target.value || "",
                })
              }
              className="border border-gray-400"
              id="fullName"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              value={session?.email}
              onChange={({ target }) =>
                setSession({
                  ...session!,
                  email: target.value || "",
                })
              }
              className="border border-gray-400"
              id="email"
            />
          </FormControl>
        </form>
      )}
    </>
  );
}
