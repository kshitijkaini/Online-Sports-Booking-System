import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Circle } from 'react-leaflet';
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import Loader from "../components/Loader";
import Error from "../components/Error";






const Maps = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //markers
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/futsals/mapdata');
      const data = await response.json();
      setLoading(false);
      setMarkers(data);
      console.log(data)


    }
    fetchData();
  }, []);


  const [center] = useState({ lat: 27.704405267645072, lng: 85.31921281203175 });
  const ZOOM_LEVEL = 17;

  const customIcon = new Icon({
    iconUrl: require("./soccer.png"),
    iconSize: [38, 38]//size of the icon
  })

  const customIcon1 = new Icon({
    iconUrl: require("./soccer.png"),
    iconSize: [38, 38]//size of the icon
  })

  const customIcon2 = new Icon({
    iconUrl: require("./gym.png"),
    iconSize: [38, 38]//size of the icon
  })

  const customIcon3 = new Icon({
    iconUrl: require("./swim.png"),
    iconSize: [38, 38]//size of the icon 
  })


  //geolocate
  function LocateControl() {
    const map = useMapEvents({
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return (
      <div style={{ float: 'right' }} className="leaflet-bar leaflet-control leaflet-control-custom">
        <a
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





  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (

        <div className="row">
          <div className="col text-center">
            {console.log(markers._id)}
            <div className="col"></div>
            <MapContainer center={center} zoom={ZOOM_LEVEL} className="map-container" >
              <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
              <MarkerClusterGroup>
                <LocateControl />
                {markers.map((marker =>

                  <Marker key={marker.id} position={marker.geocode} icon={customIcon} onClick={marker.url} >
                    <Popup openPopup={false} autoPan={true} autoClose={false} closeOnClick={false} autoOpen={true}><h5><a href={marker.url}>{marker.popUP}</a></h5></Popup>
                  </Marker>))
                  }
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default Maps;
