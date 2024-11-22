const getPontos = `
SELECT 
  'Feature' as type,
  json_build_object(
    'type', 'Point',
    'coordinates', 
    json_build_array(
      ST_X(ST_Transform(geom, 4326)),
      ST_Y(ST_Transform(geom, 4326))
    )
  ) as geometry,
  json_build_object(
    'fid', ma.fid,'rp_cod', ma.bairro_c_0, 'rp', ma.bairro_rp , 'ra_cod', ma.bairro_c_1, 'ra', ma.bairro_ra, 'cod_bairro', ma.bairro_c_2, 'bairro', ma.bairro_nom, 'favela', ma.plan_favel,
    'cat_entrada', ma.plan_cat, 'tipo_entrada', ma.plan_tipo, 'grau_entrada', ma.plan_grau
  ) as properties
FROM 
  public."BASE-GERAL_2024_MFV_AP3_INTEGRADOS" ma
WHERE 
  ST_Z(geom) IS NULL OR ST_Z(geom) = 0;
`;

const getCaminhos = `
SELECT
    'Feature' as type,
	ST_AsGeoJSON(ST_Transform(geom, 4326))::jsonb as geometry,
    jsonb_build_object(
        'fid', fid,
        'id_portal', id_portal,
        'plan_comp', plan_comp,
        '_plan_favel', _plan_favel,
        '_plan_cat', _plan_cat,
        '_plan_tipo', _plan_tipo,
        '_plan_grau', _plan_grau,
        '_plan_gsv', _plan_gsv,
        '_plan_ano', _plan_ano
    ) as properties
FROM public."BASE-GERAL_2024_MFV_AP3_CAMINHOS";
`;

const getPontoById =
  'SELECT * FROM "BASE-GERAL_2024_MFV_AP3_INTEGRADOS" WHERE fid = $1';

const checkPontoExists = 'SELECT p FROM "MFV_AP3" p WHERE p.geom = $1';

const addPonto = 'INSERT INTO "MFV_AP3" (geom) VALUES ($1)';

module.exports = {
  getPontos,
  getCaminhos,
  getPontoById,
  checkPontoExists,
  addPonto,
};
