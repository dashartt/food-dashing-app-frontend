import "@geoapify/geocoder-autocomplete/styles/minimal.css";

import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

import type { IAddress } from "@/types/address.type";
import type { IAddressAutocompletePayload } from "@/types/geoapify.type";

type Props = {
  onSelectAddress: (address: IAddress) => void;
};

export default function SearchPlaceInput({ onSelectAddress }: Props) {
  function preprocessHook(value: string) {
    return `${value}, Ilha Solteira, SP`;
  }
  function postprocessHook({ properties }: IAddressAutocompletePayload) {
    onSelectAddress({ ...properties });
    return properties.formatted;
  }

  return (
    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_KEY}>
      <GeoapifyGeocoderAutocomplete
        debounceDelay={1000}
        skipIcons
        allowNonVerifiedHouseNumber
        skipDetails
        lang="br"
        countryCodes={["br"]}
        postprocessHook={postprocessHook}
        preprocessHook={preprocessHook}
        placeholder="Qual endereço quer buscar?"
        // placeSelect={onPlaceSelect}
      />
    </GeoapifyContext>
  );
}
