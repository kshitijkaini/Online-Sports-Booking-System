import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';



const Maps = () => {
  const [clickedPosition, setClickedPosition] = useState(null);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const defaultMarker = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });
  






//geolocate
function LocateControl() {
    const map = useMapEvents({
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom());
      },
    });
  
    return (
      <div style={{float: 'right' }}  className="leaflet-bar leaflet-control leaflet-control-custom">
        <a href='#' 
          className="leaflet-control-locate leaflet-bar-part leaflet-bar-part-single"
          onClick={() => {
            map.locate();
          }}
        >
          <i className="fas fa-map-marker-alt"></i>
        </a>
      </div>
    );
  }
  
//

  const handleClick = (event) => {
    const { lat, lng } = event.latlng;
    setClickedPosition(event.latlng);
    setLongitude(lat.toFixed(6)); 
    setLatitude(lng.toFixed(6));
  };

  return (
    <div>
      <MapContainer
        className="leaflet-map"
        center={[32.313268, 35.022895]}
        zoom={17}
        scrollWheelZoom={true}
        style={{ height: '60vh'}}
      >
        <TileLayer 
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         <LocateControl />
        {clickedPosition && (
          <Marker position={clickedPosition} icon={defaultMarker}>
            <Popup>Clicked at {clickedPosition.lat.toFixed(6)}, {clickedPosition.lng.toFixed(6)}</Popup>
          </Marker>
        )}
        <MapEvents onClick={handleClick} />
      </MapContainer>
      <div>
        <input type="text" id="longitude" className="form-control" value={longitude} onChange={(event) => setLongitude(event.target.value)} placeholder="Longitude" />
        <input type="text" id="latitude" className="form-control" value={latitude} onChange={(event) => setLatitude(event.target.value)} placeholder="Latitude" />
      </div>
    </div>
  );
};

const MapEvents = ({ onClick }) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};




export default Maps;
