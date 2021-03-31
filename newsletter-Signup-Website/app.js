const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const https = require('https');
// const { ESRCH } = require('constants');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))


app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
});


app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/27b149f816";
  // https://server.api.mailchimp.com/3.0/
  const options={
        method:"POST",
        auth:"sahaj1609:78b621361a732c2b9b5e815f01b6d38f-us1"
        
    }
  const request = https.request(url, options, function (response) {

    if(response.statusCode===200){
        res.sendFile(__dirname+'/success.html')
    }else{
        res.sendFile(__dirname+'/faliure.html')
    }
      response.on("data",function(data){
        console.log(JSON.parse(data));
      })
  });


app.post("/faliure",function (req, res){
    res.redirect("/")    
})

  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000")
    
})



// 78b621361a732c2b9b5e815f01b6d38f-us1
// 27b149f816