// const properties = require('./json/properties.json');
// const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'nikai',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE users.email = $1
  `, [email])
  .then(res => {
    if(res.rows){
      console.log(res.rows);
      return res.rows[0]
    }
    return null;
  })
  .catch(err =>{
    if (!res.rows[0].user){
      return null;
    }
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE users.id = $1
  `, [id])
  .then(res => {
    if(res.rows){
      console.log(res.rows)
      return res.rows[0]
    }
    return null;
  })
  .catch(err =>{
    console.log('getUserWithId Error',err)
    return null;
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, password, email)
  values($1,$2, $3)
  RETURNING *;
  `, [user.name, user.password, user.email])
  .then(res => {
    console.log(res.rows)
    return res.rows
  })
  .catch(err =>{
    return null;
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT *, properties.* 
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  WHERE reservations.guest_id = $1
  LIMIT $2
  `, [guest_id, limit])
  .then(res => {
    console.log(res.rows)
    return res.rows
  })
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }

// const getAllProperties = function(options, limit = 10) {
//   return pool.query(`
//   SELECT * FROM properties
//   LIMIT $1
//   `, [limit])
//   .then(res => {
//     console.log(res.rows)
//     return res.rows

//   });
// }
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  console.log('options',options);
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT OUTER JOIN property_reviews ON properties.id = property_id
  WHERE TRUE `;

  // 

  ///IF owener ID is passed
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  ///range
  //min
  if (options.minimum_price_per_night){
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }
  //max
  if(options.maximum_price_per_night){
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  };

  //minumun rating
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND property_reviews.rating >= $${queryParams.length} `;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log('tring and params=',queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
  return res.rows[0]
}

exports.getAllProperties = getAllProperties;




/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

//  {
//   owner_id: int,
//   title: string,
//   description: string,
//   thumbnail_photo_url: string,
//   cover_photo_url: string,
//   cost_per_night: string,
//   street: string,
//   city: string,
//   province: string,
//   post_code: string,
//   country: string,
//   parking_spaces: int,
//   number_of_bathrooms: int,
//   number_of_bedrooms: int
// }

const addProperty = function(property) {
  
  // console.log('property',property);

  let queryString = `
  INSERT INTO properties (
    owner_id, 
    title, 
    description, 
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms)
  values($1,$2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
  RETURNING *;
  `;
  const queryParams = [
    property.owner_id, 
    property.title, 
    property.description, 
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  return pool.query(queryString, queryParams)
  .then(res => {
    console.log(res.rows)
    return res.rows
  })
  .catch(err =>{
    console.log('getUserWithId Error',err)
    return null;
  });
}
exports.addProperty = addProperty;
