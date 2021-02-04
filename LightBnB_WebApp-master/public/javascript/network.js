function getMyDetails() {
  console.log("getMyDetails");
  return $.ajax({
    url: "/users/me",
  });
}

function logOut() {
  return $.ajax({
    method: "POST",
    url: "/users/logout",
  })
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/users/login",
    data
  });
}

function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/users",
    data
  });
}

const getAllProperties = function(options, limit = 10) {
  pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => {
    console.log(res.rows)
  });
}

function getAllListings(params) {
  let url = "/api/properties";
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
}

function getAllReservations() {
  let url = "/api/reservations";
  return $.ajax({
    url,
  });
}

const submitProperty = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/properties",
    data,
  });
}