import { NavigatorScreenParams } from '@react-navigation/native';
import { Listing } from './listing';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  ListingDetail: { listing: Listing };
  Booking: { listing: Listing }
};

export type TabParamList = {
  Explore: undefined
  Wishlist: undefined;
  Trips: undefined;
  Profile: undefined;
};