import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Mark } from "../types"
import locations from "../locations.json"
import 'leaflet/dist/leaflet.css';

function MapComponent() {

    const markers = locations.map(location => {
        return ( 
        <Marker key={location.id} position={location.coordinates}>
            <Popup className='popup'>
                <h2 className='popup__title'>{location.name}</h2>
                <p className='popup__phoneNumber'>{location.phoneNumber}</p>
            </Popup>
        </Marker>
        )
    })

    return( 
        <div className='map'>
            <MapContainer center={[50.04, 19.94]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
            </MapContainer>
        </div>
    )
}

export default MapComponent