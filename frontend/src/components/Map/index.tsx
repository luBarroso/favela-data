import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import {
  MapContainer,
  Container,
  InfromationContainer,
  InformationButton,
} from "./styles";
import { Information } from "../Information";

import { getPontos, getLimite } from "../../services/api";
import { Feature, GeoJsonProperties, Geometry } from "geojson";

// Se precisar dos props
interface MapComponentProps {
  lng: number;
  lat: number;
  zoom: number;
}

interface PointInfoProps {
  rp_cod: string;
  rp: string;
  ra_cod: number;
  ra: string;
  cod_bairro: number;
  bairro: string;
  favela: string;
  cat_entrada: string;
  tipo_entrada: string;
  grau_entrada: string;
}

interface PointJson extends Feature<Geometry, GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    fid: number;
    rp_cod: string;
    rp: string;
    ra_cod: number;
    ra: string;
    cod_bairro: number;
    bairro: string;
    favela: string;
    cat_entrada: string;
    tipo_entrada: string;
    grau_entrada: string;
  };
}

interface LimitJson extends Feature<Geometry, GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
}

const Map: React.FC<MapComponentProps> = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [infoState, setInfoState] = useState<PointInfoProps>({
    rp_cod: "",
    rp: "",
    ra_cod: 0,
    ra: "",
    cod_bairro: 0,
    bairro: "",
    favela: "",
    cat_entrada: "",
    tipo_entrada: "",
    grau_entrada: "",
  });
  const [infoOpen, setInfoOpen] = useState(false);

  const [pontos, setPontos] = useState<PointJson[]>([]);
  const [limite, setLimite] = useState<LimitJson[]>([]);

  const fetchPointData = async () => {
    const PointData = await getPontos();
    setPontos(PointData);
  };

  const fetchLimitData = async () => {
    const LimitData = await getLimite();
    setLimite(LimitData);
  };

  //carregar os dados
  useEffect(() => {
    const fetchData = async () => {
      await fetchLimitData();
      await fetchPointData();
    };

    fetchData();
  }, []);

  //criar o mapa
  useEffect(() => {
    // Se os pontos ainda não foram carregados, não inicialize o mapa
    if (pontos.length === 0) return;

    if (map.current) return; //Inicializar o mapa apenas uma vez

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current, // Passando o elemento DOM
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
        center: [-43.36817303243969, -22.824809245004662], //o primeiro ponto do banco
        zoom: 10,
      });

      // Adicionando controle de zoom.
      map.current.addControl(new maplibregl.NavigationControl());

      const scale = new maplibregl.ScaleControl({
        maxWidth: 100,
        unit: "metric",
      });

      map.current.addControl(scale, "bottom-left");

      map.current.on("load", () => {
        map.current!.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: pontos,
          },
        });

        map.current!.addSource("limite", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: limite,
          },
        });

        console.log("Source:", map.current!.getSource("limite"));

        map.current!.addLayer({
          id: "limite-layer",
          type: "fill",
          source: "limite",
          layout: {},
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0.3,
            "fill-outline-color": "#000",
          },
        });

        map.current!.addLayer({
          id: "points-layer",
          type: "circle",
          source: "points",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#78A050",
            "circle-radius": 5,
          },
        });
      });

      map.current.on("click", "points-layer", (e) => {
        if (e.features && e.features.length > 0) {
          const clickedFeature = e.features[0];

          // Porpriedades do ponto clicado
          const properties = clickedFeature.properties;

          // TODO: Excluir ou modificar este popup
          // new maplibregl.Popup()
          //   .setLngLat(e.lngLat)
          //   .setHTML(
          //     `<h3>${properties.bairro}</h3><p>Favela: ${properties.favela}</p>`
          //   )
          //   .addTo(map.current!);

          setInfoState({
            rp_cod: properties.rp_cod,
            rp: properties.rp,
            ra_cod: properties.ra_cod,
            ra: properties.ra,
            cod_bairro: properties.cod_bairro,
            bairro: properties.bairro,
            favela: properties.favela,
            cat_entrada: properties.cat_entrada,
            tipo_entrada: properties.tipo_entrada,
            grau_entrada: properties.grau_entrada,
          });
          setInfoOpen(true);
        }
      });

      map.current.on("mouseenter", "points-layer", () => {
        map.current!.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "points-layer", () => {
        map.current!.getCanvas().style.cursor = "";
      });
    }

    // Para que o mapa não seja gerado mais de uma vez
    //TODO: Ver se posso implementar esta função. Parece não estar precisando dela
    // return () => {
    //   if (map.current) {
    //     map.current.remove();
    //     map.current = null;
    //   }
    // };
    // };
  }, [limite, pontos]);

  return (
    <Container>
      <MapContainer ref={mapContainer} />
      {infoOpen ? (
        <InfromationContainer>
          <InformationButton onClick={() => setInfoOpen(false)}>
            x
          </InformationButton>
          <Information
            rp_cod={infoState.rp_cod}
            rp={infoState.rp}
            ra_cod={infoState.ra_cod}
            ra={infoState.ra}
            cod_bairro={infoState.cod_bairro}
            bairro={infoState.bairro}
            favela={infoState.favela}
            cat_entrada={infoState.cat_entrada}
            tipo_entrada={infoState.tipo_entrada}
            grau_entrada={infoState.grau_entrada}
          />
        </InfromationContainer>
      ) : null}
    </Container>
  );
};

export default Map;
