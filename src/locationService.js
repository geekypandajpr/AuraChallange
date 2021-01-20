
var requiredDistance;
exports.findNearestLocation = async function(dataList, requestBody, data, callback) {
    try {
      var srcLat = data.latitude;
      var srcLong = data.longitude;
      var destLat = requestBody.latitude;
      var destLong = requestBody.longitude;
      var distance = Math.abs(
        calculateHaversineDistance(srcLat, srcLong, destLat, destLong)
      );
      if (
        requiredDistance == undefined ||
        requiredDistance == null ||
        requiredDistance > distance
      ) {
        requiredDistance = distance;
        dataList.splice(0, dataList.length);
        dataList.push(data);
      } else if (requiredDistance == distance) {
        dataList.push(data);
      }
    } catch (err) {
      callback(err, null);
    }
    callback(null, dataList);
}

function calculateHaversineDistance(srcLat, srcLong, destLat, destLong) {
    try {
      var R = 3958.8;
      var rlat1 = srcLat * (Math.PI / 180);
      var rlat2 = destLat * (Math.PI / 180);
      var difflat = rlat2 - rlat1;
      var difflon = (srcLong - destLong) * (Math.PI / 180);
      var d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        );
      return d;
    } catch (error) {
      throw error;
    }
  }