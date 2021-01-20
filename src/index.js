var fs = require("fs");
var JSONStream = require("JSONStream");
var es = require("event-stream");
var vaidateRequest = require("./requestValidator.js");
var locationService = require("./locationService.js");
var attrFilterService = require("./attributeFilterService.js");

// lambda-like handler function
var logger = require("./logger.js");

exports.handler = async function(event) {
  const promise = new Promise(function(resolve, reject) {
    try {
      resolve(handler(event));
    } catch (err) {
      reject(Error(err));
    }
  });
  logger().info("Lambda invokation completed");
  return promise;
};


const handler = async function(event) {
  var serviceData;
  await vaidateRequest(event, function(err, result) {
    if (err != null || err != undefined) {
      throw err;
    } else {
      serviceData = result;
    }
  });
  const data = await handleRequest(serviceData, event);
  return data;
};

function handleRequest(serviceData, event){
  return new Promise((resolve, reject) => {
    try {
      var dataList = [];
      var jsonData = "./src/data.json",
        stream = fs.createReadStream(jsonData, {
          encoding: "utf8"
      });

      stream.pipe(JSONStream.parse("*")).pipe(
        es.through(function(data) {

        
          if (event.httpMethod == "GET") {
            attrFilterService.filterByAttribute(serviceData, data, function(err, result) {
              if (err) {
                reject(err);
              } else {
                dataList.push(result);
              }
            });
          } else if (event.httpMethod == "POST") {
            locationService.findNearestLocation(dataList, serviceData, data, function(err,result) {
              if (err) {
                reject(err);
              } else {
                dataList = result;
              }
            });
          }
        })
      );
      stream.on("end", function() {
        resolve(dataList);
      });
    } catch (err) {
      reject(err);
    }
  });
} 




