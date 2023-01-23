"use client";

import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAddressesState from "src/store/checkout/useAddresses";

import LoadingSimple from "../loading/LoadingSimple";

export default function ListAddress() {
  const { addresses, address, setAddress } = useAddressesState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // if (addresses.length === 0) return null;
  return (
    <>
      {!mounted && <LoadingSimple />}
      {mounted && (
        <Select
          className="rounded-none border border-gray-400"
          placeholder=""
          onChange={({ target }) => setAddress(target.value)}
          value={address?._id}
        >
          <option value="" className="hidden">
            Selecione algum endereço
          </option>
          {addresses?.map((address_) => (
            <option key={address_._id} value={address_._id}>
              {`${address_.addressName} - ${address_.addressNumber} ${address_?.complement}, ${address_.districtName}`}
            </option>
          ))}
        </Select>
      )}
    </>
  );
}
