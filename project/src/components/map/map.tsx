import { useRef, useEffect } from 'react';
import { Icon, LatLng, Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import { MarkerDefault, MarkerCurrent } from '../../utils/const';
import { City, Offers, Offer } from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
  className: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: MarkerDefault.URL,
  iconSize: [MarkerDefault.WIDTH, MarkerDefault.HEIGHT],
  iconAnchor: [MarkerDefault.WIDTH / 2, MarkerDefault.HEIGHT],
});

const currentCustomIcon = new Icon({
  iconUrl: MarkerCurrent.URL,
  iconSize: [MarkerCurrent.WIDTH, MarkerCurrent.HEIGHT],
  iconAnchor: [MarkerCurrent.WIDTH / 2, MarkerCurrent.HEIGHT],
});

export default function Map(props: MapProps): JSX.Element {
  const { city, offers, selectedOffer } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markers = offers.map(({ id, location }) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        return marker
          .setIcon(
            selectedOffer !== undefined && id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });

      map.panTo(new LatLng(city.location.latitude, city.location.longitude));

      return () => {
        markers.forEach((marker) => {
          marker.removeFrom(map);
        });
      };
    }
  }, [city, map, offers, selectedOffer]);

  return (
    <section
      ref={mapRef}
      className={`${props.className} map`}
    />
  );
}
