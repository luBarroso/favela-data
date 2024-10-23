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
    'fid', ma.fid, 'rp_cod', ma.bairro_rp_cod, 'rp', ma.bairro_rp , 'ra_cod', ma.bairro_ra_cod, 'ra', ma.bairro_ra, 'cod_bairro', ma.bairro_cod, 'bairro', ma.bairro_nom, 'favela', ma.plan_favel,
    'cat_entrada', ma.plan_cat, 'tipo_entrada', ma.plan_tipo_, 'grau_entrada', ma.plan_grau_
  ) as properties
FROM 
  public."MFV_AP3" ma
WHERE 
  ST_Z(geom) IS NULL OR ST_Z(geom) = 0;
`;

const getPontoById = 'SELECT * FROM "MFV_AP3" WHERE fid = $1';

const checkEmailExists = 'SELECT p FROM "MFV_AP3" p WHERE p.geom = $1';

const addPonto = 'INSERT INTO "MFV_AP3" (geom) VALUES ($1)';

module.exports = {
  getPontos,
  getPontoById,
  checkEmailExists,
  addPonto,
};
