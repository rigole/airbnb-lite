import { Listing } from '../types/listing';

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Sunlit Loft in Montmartre',
    location: 'Paris, France',
    pricePerNight: 142,
    imageUrl: 'https://picsum.photos/seed/montmartre/800/600',
  },
  {
    id: '2',
    title: 'Modern Beachfront Villa',
    location: 'Bali, Indonesia',
    pricePerNight: 210,
    imageUrl: 'https://picsum.photos/seed/bali/800/600',
  },
  {
    id: '3',
    title: 'Cozy Cabin Near Yosemite',
    location: 'California, USA',
    pricePerNight: 98,
    imageUrl: 'https://picsum.photos/seed/yosemite/800/600',
  },
];