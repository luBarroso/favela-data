const getLimites = `
SELECT
  'Feature' AS type,
  jsonb_build_object(
    'type', 'MultiPolygon',
    'coordinates', ST_AsGeoJSON(ST_Transform(
            ST_SetSRID(geom, 31983), 
            4326))::jsonb->'coordinates'
  ) AS geometry
FROM limite.favela;
`;

/*
jsonb_build_object(
      'codfavela', codfavela,
      'fid', fid,
      'objectid_12', objectid_12,
      'objectid_1', objectid_1,
      'objectid', objectid,
      'nome', nome,
      'cod_comple', cod_comple,
      'complexo', complexo,
      'flag_ativa', flag_ativa,
      'data_cadas', data_cadas,
      'data_saida', data_saida,
      'data_alter', data_alter,
      'porte', porte,
      'upp', upp,
      'shapestare', shapestare,
      'shapestlen', shapestlen,
      'pop_sabren', pop_sabren,
      'dom_sabren', dom_sabren,
      'fonte', fonte,
      'bairro_', bairro_,
      'rp', rp,
      'ra', ra,
      'ap', ap,
      'shape_st_1', shape_st_1,
      'shape_st_2', shape_st_2,
      'classificacao', classificacao,
      'shape_length', shape_length,
      'shape_area', shape_area
  ) AS properties
*/

module.exports = {
  getLimites,
};
