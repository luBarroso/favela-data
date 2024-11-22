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

interface LimitJson extends Feature<Geometry, GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
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
  const [isSubapVisible, setIsSubapVisiblee] = useState(false);

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
        container: mapContainer.current, // Passando o elemento DOM
        style:
          "https://api.maptiler.com/maps/satellite/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
        center: mapState.center, //o primeiro ponto do banco
        zoom: mapState.zoom,
      });

      // Adicionando controle de zoom.
      map.current.addControl(new maplibregl.NavigationControl(), "top-left");

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

        console.log("Source:", map.current!.getSource("limite"));

        map.current!.addLayer({
          id: "limite-layer",
          type: "fill",
          source: "limite",
          layout: {},
          paint: {
            "fill-color": "#808080",
            "fill-opacity": 0.8,
            "fill-outline-color": "#000",
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
            "fill-color": "#ffdb63",
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
            "line-width": 1,
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
    if (!map.current) return; //garantir que o mapa existe

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
    }
  }, [isPMetroVisible, isSubapVisible]);

  return (
    <Container>
      <MapContainer ref={mapContainer} />
      <ControlContainer>
        <label>
          <input
            type="checkbox"
            checked={isSubapVisible}
            onChange={() => setIsSubapVisiblee(!isSubapVisible)}
          />
          Sub Aps
        </label>
        <label>
          <input
            type="checkbox"
            checked={isPMetroVisible}
            onChange={() => setIsPMetroVisible(!isPMetroVisible)}
          />
          Estações de Metrô
        </label>
      </ControlContainer>
      {infoOpen ? (
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
            cat_entrada={infoState.cat_entrada}
            tipo_entrada={infoState.tipo_entrada}
            grau_entrada={infoState.grau_entrada}
          />
        </InformationContainer>
      ) : null}
    </Container>
  );
};

export default Map;
