import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useIdentification from "../../store/checkout/useIdentification";

export default function IdentificationForm() {
  const [mounted, setMounted] = useState(false);

  const { setName, setPhone, name, phone } = useIdentification();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <>
          <FormControl>
            <FormLabel htmlFor="fullName">Nome completo</FormLabel>
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              className="border border-gray-400 bg-gray-100 border border-gray-400"
              id="fullName"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone">Celular</FormLabel>
            <Input
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
              className="border border-gray-400 bg-gray-100 border border-gray-400"
              id="phone"
            />
          </FormControl>
        </>
      )}
    </>
  );
}
