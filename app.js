const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
  const query = req.body.cityName
  const apiKey = "148681d23e88b678995e8f850345ba4e"
  url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric"
  https.get(url,function(response){
    console.log(response)

    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const description = weatherData.weather[0].description
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      console.log(description)
      res.write("<p style=color:blue;font-size:46px>The weather is currently "+description+"<p>")
      res.write("<h1>The temperature in "+query+" is "+temp+" degree Celcius<h1>")
      res.write("<img src="+imgURL+">")
      res.send()

    })
  })


})


app.listen(3000,function(){
  console.log("Server is running on port 3000. ")
})
