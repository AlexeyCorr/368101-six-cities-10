export const favorites = [
  {
    id: 123,
    city: 'Amsterdam',
    offers: [
      {
        id: 10,
        price: 180,
        rating: 70,
        title: 'Beautiful & luxurious apartment at great location',
        type: 'Apartment',
        isPremium: false,
        isBookmark: false,
        pictures: ['./img/amsterdam.jpg', './img/apartment-01.jpg', './img/apartment-02.jpg', './img/apartment-03.jpg']
      },
      {
        id: 20,
        price: 50,
        rating: 10,
        title: 'Nice, cozy, warm big bed apartment',
        type: 'Private room',
        isPremium: false,
        isBookmark: true,
        pictures: ['./img/amsterdam.jpg', './img/apartment-small-01.jpg', './img/apartment-small-02.jpg']
      }
    ]
  },
  {
    id: 124,
    city: 'Cologne',
    offers: [
      {
        id: 40,
        price: 1000,
        rating: 100,
        title: 'Canal View Prinsengracht',
        type: 'Private room',
        isPremium: true,
        isBookmark: false,
        pictures: ['./img/apartment-small-04.jpg', './img/apartment-03.jpg']
      }
    ]
  }
];
