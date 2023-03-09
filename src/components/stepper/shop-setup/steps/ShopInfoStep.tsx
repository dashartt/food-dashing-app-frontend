import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { City, State } from "country-state-city";
import { useState } from "react";

import ServiceDaysCheckbox from "@/components/inputs/checkbox/ServiceDaysInput";
import SearchPlaceInput from "@/components/inputs/SearchPlaceInput";
import TimeInput from "@/components/inputs/TimeInput";

export default function ShopInfoStep() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  return (
    <VStack className=" items-start space-y-8">
      <FormControl className="w-fit">
        <FormLabel htmlFor="storeName">Nome da loja</FormLabel>
        <Input id="storeName" className="w-fit" />
      </FormControl>

      <FormControl className="w-fit">
        <FormLabel htmlFor="state">Estado</FormLabel>
        <Select id="state" onChange={(event) => setState(event.target?.value)}>
          <option className="hidden" value="">
            Selecione o estado
          </option>
          {State.getStatesOfCountry("BR").map(({ isoCode, name }) => (
            <option key={isoCode} value={isoCode}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>

      {state !== "" && (
        <FormControl className="w-fit">
          <FormLabel htmlFor="city">Cidade</FormLabel>
          <Select id="city" onChange={(event) => setCity(event.target?.value)}>
            <option className="hidden" value="">
              Selecione a cidade
            </option>
            {City.getCitiesOfState("BR", state).map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {city !== "" && (
        <FormControl className="w-fit min-w-[17.8rem]">
          <FormLabel htmlFor="storeName">Endereço da loja</FormLabel>
          <SearchPlaceInput onSelectAddress={() => {}} />
        </FormControl>
      )}

      <VStack className="items-start">
        <Text>Dias de atendimento</Text>
        <ServiceDaysCheckbox />
      </VStack>

      <VStack className="items-start ">
        <Text>Horário de atendimento</Text>
        <HStack className="space-x-4">
          <FormControl className="w-fit">
            <FormLabel>Início</FormLabel>
            <TimeInput />
          </FormControl>
          <FormControl className="w-fit ">
            <FormLabel>Fim</FormLabel>
            <TimeInput />
          </FormControl>
        </HStack>
      </VStack>
    </VStack>
  );
}
