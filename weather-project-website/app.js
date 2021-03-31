
const express  = require('express');
const https = require("https")
const bodyParser = require("body-parser");
app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname+"/index.html");

})

app.post('/', function(req, res) {
  console.log("Post Request received");

   const query = req.body.cityName;
   const apiKey = "b82504c2c3fcfcf07625b5f47f0d7d2e";
   const units = "metric";
   const url =
     "https://api.openweathermap.org/data/2.5/weather?q=" +
     query +
     "&appid=" +
     apiKey +
     "&units=" +
     units;

   https.get(url, function (response) {
     console.log(response.statusCode);

     response.on("data", function (data) {
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const description = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageURL =
         "http://openweathermap.org/img/wn/" + icon + "@2x.png";

       res.write(
         "<h1>The Temperature in "+query+" is " +
           temp +
           " degrees Celcius.</h1><br>"
       );
       res.write("<p>The weather is currently " + description + "</p>");
       res.write("<img src=" + imageURL + ">");
       res.send();
     });
   });
})





app.listen(3000, function(){
    console.log("Server started")
})