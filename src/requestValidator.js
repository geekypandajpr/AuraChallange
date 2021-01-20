const validParamList = [
  "zip",
  "type",
  "city",
  "acceptable_cities",
  "unacceptable_cities",
  "state",
  "county",
  "timezone",
  "area_codes",
  "latitude",
  "longitude",
  "country",
  "estimated_population"
];

function isInValidLatLong(lat, long){
  return isNaN(long) ||
    isNaN(lat) || long > 180 || long < -180 || lat > 90 || lat < -90
}

module.exports = async function(event, callback) {
  var serviceData;
  try {
    if (event.httpMethod == "GET") {
      serviceData = event.queryStringParameters;
    } else {
      serviceData = JSON.parse(event.body);
    }

    // Validate the json request for query String parameters for valid input 
    Object.keys(serviceData).forEach(function eachKey(key) {
      if (validParamList.indexOf(key) === -1) {
        callback("Invalid parameter provided: " + key, null);
      }
    });

    if ((serviceData.latitude && serviceData.longitude) && isInValidLatLong(serviceData.latitude, serviceData.longitude)) {
      callback(
        "Latitude[-90 to +90] and Longitude[-180 to +180] must be within range and both should be nemeric",
        null
      );
    }
  } catch (error) {
    callback(error, null);
  }
  callback(null, serviceData);
};


