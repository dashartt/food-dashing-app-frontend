// GEOCODE TYPES --------------------------------------------------->
export interface IProperties {
  datasource: {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
  };
  name: string;
  country: string;
  country_code: string;
  region: string;
  state: string;
  county: string;
  city: string;
  housenumber?: string;
  nonVerifiedParts?: string[];
  municipality: string;
  postcode: string;
  district: string;
  suburb: string;
  street: string;
  lon: number;
  lat: number;
  state_code: string;
  distance: number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  timezone: {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
  };
  result_type: string;
  rank: {
    importance: number;
    confidence: number;
    confidence_city_level: number;
    confidence_street_level: number;
    match_type: string;
  };
  place_id: string;
}
export interface IAddressAutocompletePayload {
  type: string;
  bbox: number[];
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: IProperties;
}

// ROUTE MATRIX TYPES --------------------------------------------------->
interface ISourceToTarget {
  distance: number;
  time: number;
  source_index: number;
  target_index: number;
}

interface ILocation {
  original_location: number[];
  location: number[];
}
interface IAvoid {
  type: "tolls" | "ferries" | "highways";
}
export interface IRouteMatrix {
  sources: ILocation[];
  targets: ILocation[];
  sources_to_targets: ISourceToTarget[][];
  units: "metric";
  distance_units: "meters";
  type?: "short" | "less_maneuvers";
  traffic?: "approximated";
  avoid?: IAvoid[];
  mode: "scooter";
}
