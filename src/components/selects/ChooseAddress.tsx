"use client";

import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAddressesState from "src/store/checkout/useAddresses";

import LoadingSimple from "../loading/LoadingSimple";

export default function ListAddress() {
  const { addresses, address, setAddress } = useAddressesState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const placeholderText =
    addresses.length === 0
      ? "Nenhum endereço cadastrado"
      : "Selecione algum endereço";

  return (
    <>
      {!mounted && <LoadingSimple />}
      {mounted && (
        <Select
          className="border border-gray-400"
          onChange={({ target }) => setAddress(target.value)}
          value={address?._id}
        >
          <option value="" className="hidden">
            {placeholderText}
          </option>
          {addresses?.map((address_) => (
            <option key={address_._id} value={address_._id}>
              {`${address_.street} - ${address_.housenumber} ${
                address_?.complement || ""
              }, ${address_.suburb}`}
            </option>
          ))}
        </Select>
      )}
    </>
  );
}
