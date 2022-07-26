export type Offer = {
  id: number;
  price: number;
  rating: number;
  title: string;
  type: string;
  isPremium: boolean;
  isBookmark: boolean;
  pictures: string[];
}

export type Offers = Offer[];
