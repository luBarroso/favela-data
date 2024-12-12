import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import {
  MapContainer,
  Container,
  InformationContainer,
  InformationButton,
  ControlContainer,
} from "./styles";
import { Information } from "../Information";

import {
  getPontos,
  getLimite,
  getCaminhos,
  getSubap,
  getPontoOnibus,
  getEstacaoMetro,
  getEstacaoTrem,
  getTrajetosTrem,
  getTrajetosBrt,
  getTrajetosTrans,
  getTrajetosMetro,
} from "../../services/api";
import { Feature, GeoJsonProperties, Geometry } from "geojson";

// Se precisar dos props
interface MapComponentProps {
  zoom: number;
  center: [number, number];
}

interface PointInfoProps {
  rp_cod: string;
  rp: string;
  ra_cod: number;
  ra: string;
  cod_bairro: number;
  bairro: string;
  favela: string;
  morfologia: string;
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
  properties: PointInfoProps;
}

interface FavelaProperties {
  name: string;
  morfologia: string;
}

interface LimitJson extends Feature<Geometry, GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
  properties: FavelaProperties;
}

interface SubapJson extends Feature<Geometry, GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
  properties: {
    fid: number;
    área: number | null;
    nome: string | null;
    regiao_adm: string | null;
    area_plane: string | null;
    codbairro: string | null;
    codra: number | null;
    codbnum: number | null;
    rp: string | null;
    cod_rp: string | null;
    codbairro_: number | null;
  };
}
interface GeneralPointJson extends Feature<Geometry, GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    fid: number;
  };
}

interface pathJson extends Feature<Geometry, GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "MultiLineString";
    coordinates: number[][][];
  };
  properties: {};
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
    morfologia: "",
    cat_entrada: "",
    tipo_entrada: "",
    grau_entrada: "",
  });

  const [infoOpen, setInfoOpen] = useState(false);

  const [mapState, setMapState] = useState<MapComponentProps>({
    zoom: 11,
    center: [-43.30817303243969, -22.856809245004662],
  });

  const [pontos, setPontos] = useState<PointJson[]>([]);
  const [limite, setLimite] = useState<LimitJson[]>([]);
  const [caminhos, setCaminhos] = useState<pathJson[]>([]);
  const [subap, setSubap] = useState<SubapJson[]>([]);
  const [pOnibus, setPOnibus] = useState<GeneralPointJson[]>([]);
  const [pMetro, setPMetro] = useState<GeneralPointJson[]>([]);
  const [pTrem, setPTrem] = useState<GeneralPointJson[]>([]);
  const [tBrt, setTBrt] = useState<pathJson[]>([]);
  const [tTrans, setTTrans] = useState<pathJson[]>([]);
  const [tTrem, setTTrem] = useState<pathJson[]>([]);
  const [tMetro, setTMetro] = useState<pathJson[]>([]);

  const [isPMetroVisible, setIsPMetroVisible] = useState(false);
  const [isPOnibusVisible, setIsPOnibusVisible] = useState(false);
  const [isPTremVisible, setIsPTremVisible] = useState(false);
  const [isSubapVisible, setIsSubapVisiblee] = useState(false);

  const [favelaSelected, setFavelaSelected] = useState("");

  const fetchData = async () => {
    try {
      const [
        PointData,
        LimitData,
        SubapData,
        CaminhoData,
        POnibusData,
        PMetroData,
        PTremData,
        TTremData,
        TBrtData,
        TTransData,
        TMetroData,
      ] = await Promise.all([
        getPontos(),
        getLimite(),
        getSubap(),
        getCaminhos(),
        getPontoOnibus(),
        getEstacaoMetro(),
        getEstacaoTrem(),
        getTrajetosTrem(),
        getTrajetosBrt(),
        getTrajetosTrans(),
        getTrajetosMetro(),
      ]);

      setPontos(PointData);
      setLimite(LimitData);
      setSubap(SubapData);
      setCaminhos(CaminhoData);
      setPOnibus(POnibusData);
      setPMetro(PMetroData);
      setPTrem(PTremData);
      setTTrem(TTremData);
      setTBrt(TBrtData);
      setTTrans(TTransData);
      setTMetro(TMetroData);
    } catch (error) {
      console.error("Erro ao carregar o dado:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //criar o mapa
  useEffect(() => {
    // Se os pontos ainda não foram carregados, não inicialize o mapa
    if (pontos.length === 0) return;

    if (map.current) return; //Inicializar o mapa apenas uma vez

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/satellite/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
        center: mapState.center,
        zoom: mapState.zoom,
      });

      // Adicionando controle de zoom.
      map.current.addControl(new maplibregl.NavigationControl(), "top-left");

      //Escala do mapa
      map.current.addControl(
        new maplibregl.ScaleControl({
          maxWidth: 100,
          unit: "metric",
        }),
        "bottom-left"
      );

      /* Adicionando os dados para o mapa */

      map.current.on("load", async () => {
        map.current!.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: pontos,
          },
        });

        map.current!.addSource("caminhos", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: caminhos,
          },
        });

        map.current!.addSource("limite", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: limite,
          },
        });

        map.current!.addSource("subap", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: subap,
          },
        });

        map.current!.addSource("pOnibus", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: pOnibus,
          },
        });

        map.current!.addSource("pMetro", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: pMetro,
          },
        });

        map.current!.addSource("pTrem", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: pTrem,
          },
        });

        map.current!.addSource("tBrt", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: tBrt,
          },
        });

        map.current!.addSource("tTrans", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: tTrans,
          },
        });

        map.current!.addSource("tTtrem", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: tTrem,
          },
        });

        map.current!.addSource("tMetro", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: tMetro,
          },
        });

        map.current!.addLayer({
          id: "limite-layer",
          type: "fill",
          source: "limite",
          layout: {},
          paint: {
            "fill-color": [
              "match",
              ["get", "morfologia"],
              "Enclave",
              "#00f0f0",
              "Linha",
              "#f900f9",
              "Malha",
              "#a7a700",
              "Quadra",
              "#009933",
              /* default */ "#808080",
            ],
            "fill-opacity": 0.2,
            "fill-outline-color": "#000",
          },
        });

        map.current!.addLayer({
          id: "limite-outline-layer",
          type: "line",
          source: "limite",
          layout: {},
          paint: {
            "line-color": "#000000",
            "line-width": 1,
            "line-opacity": 1,
          },
        });

        map.current!.addLayer({
          id: "subap-layer",
          type: "fill",
          source: "subap",
          layout: {
            visibility: isSubapVisible ? "visible" : "none",
          },
          paint: {
            "fill-color": [
              "match",
              ["get", "cod_rp"],
              "3.1",
              "#dc61a5",
              "3.2",
              "#59d12a",
              "3.3",
              "#484dcb",
              "3.4",
              "#da9b3c",
              "3.5",
              "#79cb9f",
              "3.6",
              "#1fb9e4",
              "3.7",
              "#d5d03d",
              "#b873d5",
            ],
            "fill-opacity": 0.2,
            "fill-outline-color": "#000",
          },
        });

        map.current!.addLayer({
          id: "subap-outline-layer",
          type: "line",
          source: "subap",
          layout: {
            visibility: isSubapVisible ? "visible" : "none",
          },
          paint: {
            "line-color": "#000000",
            "line-width": 0.5,
            "line-opacity": 1,
          },
        });

        map.current!.addLayer({
          id: "caminhos-layer",
          type: "line",
          source: "caminhos",
          paint: {
            "line-color": "#dbff10",
            "line-width": 2,
            "line-opacity": 1,
          },
        });

        map.current!.addLayer({
          id: "points-layer",
          type: "circle",
          source: "points",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": [
              "match",
              ["get", "cat_entrada"],
              "Acesso",
              "#ff7600",
              "Portal",
              "#cc8899",
              /* default */ "#ff7600",
            ],
            "circle-radius": 5,
          },
        });

        map.current!.addLayer({
          id: "pMetro-layer",
          type: "circle",
          source: "pMetro",
          layout: {
            visibility: isPMetroVisible ? "visible" : "none",
          },
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#4ebbee",
            "circle-radius": 5,
          },
        });

        const busStopImage = await map.current!.loadImage(
          "/assets/bus_stop-icon.png"
        );
        map.current!.addImage("busStop", busStopImage.data);
        console.log(map.current!.getImage("busStop"));

        // map.current!.addLayer({ //outra opção de imagem para os pontos
        //   id: "pOnibus-layer",
        //   type: "symbol",
        //   source: "pOnibus",
        //   layout: {
        //     visibility: "none",
        //     "icon-image": "busStop",
        //     "icon-size": 0.08,
        //   },
        // });
        map.current!.addLayer({
          id: "pOnibus-layer",
          type: "circle",
          source: "pOnibus",
          layout: {
            visibility: "none",
          },
          paint: {
            "circle-color": "#39d4a6",
            "circle-radius": 4,
          },
        });

        map.current!.addLayer({
          id: "pTrem-layer",
          type: "circle",
          source: "pTrem",
          layout: {
            visibility: "none",
          },
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#d0e76a",
            "circle-radius": 4,
          },
        });
      });

      map.current.on("click", "points-layer", (e) => {
        if (e.features && e.features.length > 0) {
          const clickedFeature = e.features[0];

          // Porpriedades do ponto clicado
          const properties = clickedFeature.properties;

          /*
          // TODO: Excluir ou modificar este popup
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
              `<h3>${properties.bairro}</h3><p>Favela: ${properties.favela}</p>`
            )
            .addTo(map.current!);*/

          const center: [number, number] = [e.lngLat.lng, e.lngLat.lat];
          map.current!.flyTo({
            center: center,
            zoom: 15,
          });

          setMapState({
            zoom: 15,
            center: center,
          });

          setInfoState({
            rp_cod: properties.rp_cod,
            rp: properties.rp,
            ra_cod: properties.ra_cod,
            ra: properties.ra,
            cod_bairro: properties.cod_bairro,
            bairro: properties.bairro,
            favela: properties.favela,
            morfologia: properties.morfologia,
            cat_entrada: properties.cat_entrada,
            tipo_entrada: properties.tipo_entrada,
            grau_entrada: properties.grau_entrada,
          });
          setInfoOpen(true);
          setFavelaSelected(properties.favela);
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
    //TODO: Ver se posso implementar esta função. Parece que ela exclui o mapa
    // return () => {
    //   if (map.current) {
    //     map.current.remove();
    //     map.current = null;
    //   }
    // };
    // };
  }, [
    limite,
    pontos,
    subap,
    caminhos,
    pOnibus,
    pMetro,
    pTrem,
    tBrt,
    tTrans,
    tMetro,
    tTrem,
    mapState,
  ]);

  useEffect(() => {
    if (!map.current) return;

    if (map.current.getLayer("pMetro-layer")) {
      map.current.setLayoutProperty(
        "pMetro-layer",
        "visibility",
        isPMetroVisible ? "visible" : "none"
      );
    }
    if (
      map.current.getLayer("subap-outline-layer") &&
      map.current.getLayer("subap-layer")
    ) {
      map.current.setLayoutProperty(
        "subap-outline-layer",
        "visibility",
        isSubapVisible ? "visible" : "none"
      );
      map.current.setLayoutProperty(
        "subap-layer",
        "visibility",
        isSubapVisible ? "visible" : "none"
      );
      map.current.setLayoutProperty(
        "pOnibus-layer",
        "visibility",
        isPOnibusVisible ? "visible" : "none"
      );
      map.current.setLayoutProperty(
        "pTrem-layer",
        "visibility",
        isPTremVisible ? "visible" : "none"
      );

      map.current.setPaintProperty("limite-layer", "fill-opacity", [
        "match",
        ["get", "nome"],
        favelaSelected,
        0.8,
        0.2,
      ]);
    }
  }, [
    isPMetroVisible,
    isSubapVisible,
    isPOnibusVisible,
    isPTremVisible,
    favelaSelected,
  ]);

  return (
    <Container>
      <MapContainer ref={mapContainer} />
      <ControlContainer>
        <details>
          <summary>Limites</summary>
          <label>
            <input
              type="checkbox"
              checked={isSubapVisible}
              onChange={() => setIsSubapVisiblee(!isSubapVisible)}
            />
            Bairros
          </label>
        </details>
        <details>
          <summary>Transporte</summary>
          <label>
            <input
              type="checkbox"
              checked={isPMetroVisible}
              onChange={() => setIsPMetroVisible(!isPMetroVisible)}
            />
            Estações de Metrô
          </label>
          <label>
            <input
              type="checkbox"
              checked={isPOnibusVisible}
              onChange={() => setIsPOnibusVisible(!isPOnibusVisible)}
            />
            Pontos de Ônibus
          </label>
          <label>
            <input
              type="checkbox"
              checked={isPTremVisible}
              onChange={() => setIsPTremVisible(!isPTremVisible)}
            />
            Estações de Trem
          </label>
        </details>
      </ControlContainer>
      <InformationContainer open={infoOpen}>
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
          morfologia={infoState.morfologia}
          cat_entrada={infoState.cat_entrada}
          tipo_entrada={infoState.tipo_entrada}
          grau_entrada={infoState.grau_entrada}
        />
      </InformationContainer>
    </Container>
  );
};

export default Map;
