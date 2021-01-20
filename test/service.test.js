const triggerLambda = require("../src/index.js").handler;
var noParamLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {}
};

var invalidAttributeLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    someInvalidAttr: "invalidValue"
  }
};

var singleparamLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    area_codes: "978"
  }
};

var moreThanOneParamLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    state: "MA",
    area_codes: "978"
  }
};

var invalidParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    county: "xyz"
  }
};

var cityParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    city: "Amherst"
  }
};

var partialCityParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    city: "Otis"
  }
};

var cityWithOtherParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    city: "Monson",
    area_codes: "413"
  }
};

var partialCityWithOtherParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    city: "onso",
    area_codes: "413"
  }
};

var zipParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    zip: "01242"
  }
};

var partialZipParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    zip: "468"
  }
};

var zipWithParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    zip: "02898",
    acceptable_cities: "Richmond"
  }
};
var partialZipWithOtherParamValueLoad = {
  httpMethod: "GET",
  path: "/custom",
  headers: {},
  queryStringParameters: {
    zip: "0289",
    acceptable_cities: "Richmond"
  }
};

var validLongLat = {
  httpMethod: "POST",
  path: "/custom",
  headers: {
    "content-type": "application/json"
  },
  body: '{"longitude":"-72.06","latitude":"42.55"}'
};

var invalidLongLat = {
  httpMethod: "POST",
  path: "/custom",
  headers: {
    "content-type": "application/json"
  },
  body: '{"longitude":"10000","latitude":"100000"}'
};

var missingLat = {
  httpMethod: "POST",
  path: "/custom",
  headers: {
    "content-type": "application/json"
  },
  body: '{"longitude":"10000"}'
};

describe("Custom-Filter-Service", () => {
  test("Find-By-No-Attribute", async function() {
    await triggerLambda(noParamLoad).catch(err => {
      expect(err).toEqual("No parameter specified");
    });
  });

  test("Find-By-No-Attribute", async function() {
    await triggerLambda(invalidAttributeLoad).catch(err => {
      expect(err).toEqual("Invalid parameter provided: someInvalidAttr");
    });
  });

  test("Find-By-One-Attribute", async function() {
    var dataList = await triggerLambda(singleparamLoad);
    expect(dataList.length).toBe(66);
  });

  test("Find-By-Two-Attribute", async function() {
    var dataList = await triggerLambda(moreThanOneParamLoad);
    expect(dataList.length).toBe(694);
  });

  test("Find-By-Invalid-Attribute", async function() {
    var dataList = await triggerLambda(invalidParamValueLoad);
    expect(dataList.length).toBe(0);
  });

  test("Find-By-Only-City-Param", async function() {
    var dataList = await triggerLambda(cityParamValueLoad);
    expect(dataList.length).toBe(5);
  });

  test("Find-By-Only-Partial-City-Param", async function() {
    var dataList = await triggerLambda(partialCityParamValueLoad);
    expect(dataList.length).toBe(2);
  });

  test("Find-By-City-With-Other-Param", async function() {
    var dataList = await triggerLambda(cityWithOtherParamValueLoad);
    expect(dataList.length).toBe(148);
  });

  test("Find-By-Partial-City-With-Other-Param", async function() {
    var dataList = await triggerLambda(partialCityWithOtherParamValueLoad);
    expect(dataList.length).toBe(149);
  });

  test("Find-By-Only-Zip-Param", async function() {
    var dataList = await triggerLambda(zipParamValueLoad);
    expect(dataList.length).toBe(1);
  });

  test("Find-By-Only-Partial-Zip-Param", async function() {
    var dataList = await triggerLambda(partialZipParamValueLoad);
    expect(dataList.length).toBe(12);
  });
  test("Find-By-Zip-With-Other-Param", async function() {
    var dataList = await triggerLambda(zipWithParamValueLoad);
    expect(dataList.length).toBe(7);
  });
  test("Find-By-Partial-Zip-With-Other-Param", async function() {
    var dataList = await triggerLambda(partialZipWithOtherParamValueLoad);
    expect(dataList.length).toBe(12);
  });


  test("Find-Nearest-Location-By-Invalid-Long-Lat", async function() {
    await triggerLambda(invalidLongLat).catch(e => {
      expect(e).toEqual(
        "Latitude[-90 to +90] and Longitude[-180 to +180] must be within range and both should be nemeric"
      );
    });
  });

  test("Find-Nearest-Location-By-Valid-Long-Lat", async function() {
    var dataList = await triggerLambda(validLongLat);
    expect(dataList.length).toBe(1);
  });
});
