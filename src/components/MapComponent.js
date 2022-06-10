import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { UserContext } from '../context/UserContext';

export default function MapComponent(props) {
  const { savedMarker, setSavedMarker, setJustLogged } =
    useContext(UserContext);

  mapboxgl.accessToken =
    'pk.eyJ1IjoiZGllc3Ryb2NvcnAiLCJhIjoiY2wxbmk5cHptMHVqajNianh2MW52c2U3MiJ9.a_02bq_H45ktO1czDGegGg';

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(savedMarker.lon || -58.37);
  const [lat, setLat] = useState(savedMarker.lat || -34.61);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    if (savedMarker.place) {
      loadSavedMarker();
    }
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    if (props.isPlaceSelected) {
      map.current.flyTo({
        center: [props.chosenPlace.chosenLon, props.chosenPlace.chosenLat],
        zoom: map.current.getZoom().toFixed(2),
      });

      if (savedMarker.marker) {
        savedMarker.marker.remove();
      }

      createMarker();
    }
  }, [props.isPlaceSelected]);

  function createMarker() {
    const marker = new mapboxgl.Marker()
      .setLngLat([props.chosenPlace.chosenLon, props.chosenPlace.chosenLat])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          '<h5>Verás mascotas extraviadas cerca de: </h5><p>' +
            props.chosenPlace.chosenName +
            '</p>'
        )
      )
      .addTo(map.current);
    setSavedMarker({
      marker: marker,
      lon: props.chosenPlace.chosenLon,
      lat: props.chosenPlace.chosenLat,
      place: props.chosenPlace.chosenName,
    });
    setJustLogged(true);
    props.setSearchPlace('');
    props.setIsPlaceSelected(false);
  }

  function loadSavedMarker() {
    const marker = new mapboxgl.Marker()
      .setLngLat([savedMarker.lon, savedMarker.lat])
      .setPopup(
        new mapboxgl.Popup().setHTML(
          '<h5>Verás mascotas extraviadas cerca de: </h5><p>' +
            savedMarker.place +
            '</p>'
        )
      )
      .addTo(map.current);
  }

  return (
    <div>
      <small>
        Lat: {lat} | Long: {lng}{' '}
      </small>
      <br />
      <br />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
