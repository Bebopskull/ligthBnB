const getAllProperties = function(options, limit = 10) {
  pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => {
    console.log(res.rows)
  });
}