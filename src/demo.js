const triggerLambda = require("../src/index.js").handler;


triggerLambda({
    httpMethod: "POST",
    path: "/custom",
    headers: {
      "content-type": "application/json"
    },
    body: '{"longitude":"-72.06","latitude":"42.55"}'
  }).then(result => console.log(result))
.catch(e => console.log(e));