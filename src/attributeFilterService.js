

exports.filterByAttribute = async function (params, data, callback) {
    try {
      var objectMatches = [];
      Object.keys(params).forEach(function eachKey(key) {
        if (key == "zip" || key == "city") {
          if (data.primary_city.includes(params.city) || data.zip.includes(params.zip)) {
            objectMatches.push(true);
          } else {
            objectMatches.push(false);
          }
        } else {
          var value = params[key];
          if (data[key] == value) {
            objectMatches.push(true);
          } else {
            objectMatches.push(false);
          }
        }
      });
    } catch (error) {
      logger.info(error);
      callback(error, null);
    }
    if (objectMatches.includes(true)) {
      callback(null, data);
    }
  }