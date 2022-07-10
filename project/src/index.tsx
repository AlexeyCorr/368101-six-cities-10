import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const places = [
  {
    id: 10,
    price: 180,
    rating: 70,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 20,
    price: 80,
    rating: 99,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 30,
    price: 40,
    rating: 10,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 40,
    price: 580,
    rating: 40,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 50,
    price: 860,
    rating: 100,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
  },
];


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App places={places} />
  </React.StrictMode>
);
