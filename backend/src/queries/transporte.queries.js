const getPontoOnibus = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb AS geometry
FROM public."MFV_AP3_PONTOS_ONIBUS";
`;

const getEstacaoMetro = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb AS geometry,
    jsonb_build_object(
        'fid', fid
    ) as properties
FROM public."MFV_AP3_ESTACOES_METRO";
`;

const getEstacaoTrem = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb AS geometry
FROM public."MFV_AP3_ESTACOES_TREM";
`;

const getTrajetosBrt = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform((ST_Dump(geom)).geom, 4326))::jsonb AS geometry
FROM public."MUN_TRAJETOS_BRT";
`;

const getTrajetosMetro = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform((ST_Dump(geom)).geom, 4326))::jsonb AS geometry
FROM public."MUN_TRAJETOS_BRT";
`;

const getTrajetosTrans = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform((ST_Dump(geom)).geom, 4326))::jsonb AS geometry
FROM public."MUN_TRAJETOS_TRANSBRASIL";
`;

const getTrajetosTrem = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb AS geometry
FROM public."MUN_TRAJETOS_TREM";
`;

module.exports = {
  getPontoOnibus,
  getEstacaoMetro,
  getEstacaoTrem,
  getTrajetosBrt,
  getTrajetosMetro,
  getTrajetosTrans,
  getTrajetosTrem,
};
