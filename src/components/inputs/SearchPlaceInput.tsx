import "@geoapify/geocoder-autocomplete/styles/minimal.css";

import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";

import type { IAddress } from "@/types/address.type";
import type { IAddressAutocompletePayload } from "@/types/geoapify.type";

type Props = {
  onSelectAddress: (address: IAddress) => void;
  city: string;
  stateCode: string;
};

export default function SearchPlaceInput({
  onSelectAddress,
  city,
  stateCode,
}: Props) {
  function preprocessHook(value: string) {
    return `${value}, ${city}, ${stateCode}`;
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
