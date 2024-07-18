// import { useNavigate } from "react-router-dom";
// import styles from "./Map.module.css";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";
// import { useEffect, useState } from "react";
// import { useCities } from "../contexts/CitiesContext";
// import { useMap } from "react-leaflet";
// import { useGeolocation } from "../hooks/useGeolocation";
// import Button from "./Button";
// import { useUrlPosition } from "../hooks/useUrlPosition";

// function Map() {
//   const { citiesList } = useCities();

//   const [mapPosition, setMapPosition] = useState([40, 0]);

//   const {
//     isLoading: isLoadingPosition,
//     position: geoLocationPosition,
//     getPosition,
//   } = useGeolocation();

//   const [mapLat, mapLng] = useUrlPosition();

//   useEffect(
//     function () {
//       if (mapLat && mapLng) {
//         setMapPosition([mapLat, mapLng]);
//       }
//     },
//     [mapLat, mapLng]
//   );
//   useEffect(
//     function () {
//       if (geoLocationPosition) {
//         setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
//       }
//     },
//     [geoLocationPosition]
//   );

//   return (
//     <div className={styles.mapContainer}>
//       {!geoLocationPosition && (
//         <Button type="position" onClick={getPosition}>
//           {isLoadingPosition ? "Loading your position" : "Get your position"}
//         </Button>
//       )}
//       <MapContainer
//         center={mapPosition}
//         zoom={5}
//         scrollWheelZoom={true}
//         className={styles.map}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//         />
//         {citiesList.map(
//           (city) => (
//             console.log(city.position.lat),
//             (
//               <Marker
//                 position={[city.position.lat, city.position.lng]}
//                 key={city.id}
//               >
//                 <Popup>
//                   <span>{city.emoji}</span>
//                   <span>{city.cityName}</span>
//                 </Popup>
//               </Marker>
//             )
//           )
//         )}
//         <ChangeCenter position={mapPosition} />
//         <DetectClick />
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;

// function ChangeCenter({ position }) {
//   const map = useMap();
//   map.setView(position);
//   return null;
// }

// function DetectClick() {
//   const navigate = useNavigate();
//   useMapEvents({
//     click: (e) => {
//       navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
//     },
//   });
// }

import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";

function Map() {
  const { citiesList } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {citiesList.map((city) =>
          city.position ? (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span> <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ) : null
        )}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
