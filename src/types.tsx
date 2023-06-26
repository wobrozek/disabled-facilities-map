export type Location = {
  id: number;
  name: string;
  coordinates: [number, number];
  phoneNumber: string;
}[];

export type PlaceResult = {
  categories: {}[];
  chains: [];
  distance: number;
  fsq_id: string;
  geocodes: {
    drop_off: {
      latitude: number;
      longitude: number;
    };
    main: {
      latitude: number;
      longitude: number;
    };
    roof: {
      latitude: number;
      longitude: number;
    };
  };
  link: string;
  location: {
    address: string;
  };
  name: string;
  related_places: {};
  timezone: string;
};
