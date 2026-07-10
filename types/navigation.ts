import { Listing } from './listing';

export type RootStackParamList = {
  Home: undefined;
  ListingDetail: { listing: Listing };
};