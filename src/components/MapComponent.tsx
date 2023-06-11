import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import locations from '../locations.json';
import 'leaflet/dist/leaflet.css';

type MapComponentProps = {
  searchValues: string[];
};

function MapComponent(props: MapComponentProps) {
  const filteredPlaces = locations.filter((location) => {
    return props.searchValues.includes(location.type);
  });

  const facilitiesMarkers = filteredPlaces.map((location) => {
    const latLngs: [number, number] = [
      location.coordinates[0],
      location.coordinates[1],
    ];

    return (
      <Marker key={location.id} position={latLngs}>
        <Popup className="popup">
          <h2 className="popup__title">{location.name}</h2>
          <p className="popup__phoneNumber">{location.phoneNumber}</p>
        </Popup>
      </Marker>
    );
  });

  return (
    <div className="map">
      <MapContainer center={[50.04, 19.94]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {facilitiesMarkers}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
