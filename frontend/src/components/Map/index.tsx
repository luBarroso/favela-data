import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import { Container } from "./styles";
import GeoJson from "../../geojson_test.json";
import { Information } from "../Information";

// Se precisar dos props
interface MapComponentProps {
  lng: number;
  lat: number;
  zoom: number;
}

interface PointInfoProps {
  favela: String;
  bairro: String;
}

const Map: React.FC<MapComponentProps> = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [infoState, setInfoState] = useState<PointInfoProps>({
    favela: "",
    bairro: "",
  });

  //TODO: entender o que essa função de useEffect faz
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current, // Pass the actual DOM element
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
        center: [-43.36817303243969, -22.824809245004662], //o primeiro ponto do banco
        zoom: 10,
      });

      map.current.on("load", () => {
        GeoJson.content.forEach((marker) => {
          //TODO: transformar a parte de baixo em código React
          const el = document.createElement("div");
          el.className = "marker";
          el.style.backgroundColor = "red";
          el.style.width = `10px`;
          el.style.height = `10px`;
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";

          el.addEventListener("click", () => {
            setInfoState({
              favela: marker.properties.plan_favel,
              bairro: marker.properties.bairro_nom,
            });
            console.log(marker.properties);
          });

          new maplibregl.Marker({ element: el })
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

  return (
    <>
      <Information favela={infoState.favela} bairro={infoState.bairro} />
      <Container ref={mapContainer} />
    </>
  );
};

export default Map;
