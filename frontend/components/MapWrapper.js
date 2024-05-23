// components/Map.js
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const customIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function DraggableMarker() {
  const center = {
    lat: 51.505,
    lng: -0.09,
  };
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

const Map = ({ onCenterChange, selectedPoint }) => {
  const [markers, setMarkers] = useState([]);

  // useEffect(() => {
  //   if (selectedPoint) {
  //     setMarkers([{ lat: selectedPoint.lat, lng: selectedPoint.lng }]);
  //   }
  // }, [selectedPoint]);

  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onCenterChange(center);
      setMarkers([{ lat: center.lat, lng: center.lng }]);
      map.flyTo(center, map.getZoom());
    },
  });

  useEffect(() => {
    if (selectedPoint) {
      map.flyTo([selectedPoint.lat, selectedPoint.lng], 13); // Zoom level 13
    }
  }, [selectedPoint, map]);

  const customIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  return (
    <>
      {markers.map((marker, idx) => (
        <Marker key={idx} position={[marker.lat, marker.lng]} icon={customIcon}>
          <Popup>
            ({marker.lat}, {marker.lng})
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const MapWrapper = ({ onCenterChange, selectedPoint }) => {
  const markers = [
    {
      geocode: [51.505, -0.09],
      popUp: "I am here",
    },
    {
      geocode: [51.505, -0.09],
      popUp: "I am here",
    },
    {
      geocode: [51.505, -0.09],
      popUp: "I am here",
    },
  ];

  return (
    <div className="w-full h-full">
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "80vh", width: "100%", borderRadius: "60px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {/* <DraggableMarker /> */}
        {/* {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))} */}
        <Map onCenterChange={onCenterChange} selectedPoint={selectedPoint} />
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
