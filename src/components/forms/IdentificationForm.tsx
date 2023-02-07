import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

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
              className="border border-gray-400 bg-gray-100"
              id="fullName"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone">Celular</FormLabel>
            <Input
              as={InputMask}
              mask="(99) 99999-9999"
              value={session?.phone}
              onChange={({ target }) =>
                setSession({
                  ...session!,
                  phone: target.value || "",
                })
              }
              className="border border-gray-400 bg-gray-100"
              id="phone"
            />
          </FormControl>
        </form>
      )}
    </>
  );
}
