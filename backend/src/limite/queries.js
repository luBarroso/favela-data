const getLimites = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb AS geometry,
    jsonb_build_object(
        'fid', fid,
        'codfavela', codfavela,
        'nome', nome,
        'cod_comple', cod_comple,
        'complexo', complexo,
        'porte', porte,
        'upp', upp,
        'bairro_', bairro_,
        'rp', rp,
        'ra', ra,
        'ap', ap,
        'classifica', classifica,
        'morfologia', morfologia
    ) AS properties
FROM public."MFV_AP3_FAVELAS_CAT_MORFO";
`;

const getSubAps = `
SELECT
    'Feature' AS type,
    ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb AS geometry,
    jsonb_build_object(
        'fid', fid,
        'área', área,
        'nome', nome,
        'regiao_adm', regiao_adm,
        'area_plane', area_plane,
        'codbairro', codbairro,
        'codra', codra,
        'codbnum', codbnum,
        'rp', rp,
        'cod_rp', cod_rp,
        'codbairro_', codbairro_
    ) AS properties
FROM public."MFV_AP3_BAIRROS_SUBAPS";
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
  getSubAps,
};
