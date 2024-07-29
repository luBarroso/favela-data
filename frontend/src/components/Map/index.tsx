import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import { Container } from "./styles";
import GeoJson from "../../geojson_test.json";

// Se precisar dos props
interface MapComponentProps {
  lng: number;
  lat: number;
  zoom: number;
}

const Map: React.FC<MapComponentProps> = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  //TODO: entender o que essa função de useEffect faz
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current, // Pass the actual DOM element
        style: "https://demotiles.maplibre.org/style.json",
        center: [-43.36817303243969, -22.824809245004662], //o primeiro ponto do banco
        zoom: 5,
      });

      map.current.on("load", () => {
        GeoJson.content.forEach((marker) => {
          new maplibregl.Marker()
            .setLngLat([
              marker.geometry.coordinates[0],
              marker.geometry.coordinates[1],
            ])
            .addTo(map.current!);
          //TODO: entender essa parte melhor
        });
      });

      // Para que o mapa não seja gerado mais de uma vez
      return () => {
        /* TODO: resolver esse erro
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
        */
      };
    }
  });

  //TODO: Aqui na verdade dar um return do mapa e das informações.
  return <Container ref={mapContainer} />;
};

export default Map;
