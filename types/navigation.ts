import { Listing } from './listing';

export type RootStackParamList = {
  MainTabs: undefined;
  ListingDetail: { listing: Listing };
};

export type TabParamList = {
  Explore: undefined;
  Wishlist: undefined;
  Trips: undefined;
  Profile: undefined;
};