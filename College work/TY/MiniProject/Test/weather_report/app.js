const express = require('express')
const https = require('https');
const bodyPar = require('body-parser')

const app= express();
const apikey = "7f01ec904581292daf210392b8058e68"

app.use(bodyPar.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.post("/index.html",(req,res)=>{
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric"
    https.get(url,(response)=>{
        // console.log(response)
        
        response.on("data", (data)=>{
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const desp = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            // console.log(temp)
            // console.log(desp)
            const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>Your City's Weather Report is: <br>Temperature:"+temp+" degree Celcius</h1>");

            res.write("<h2>Description: "+ desp+"</h2>");
            res.write("<img src="+imageurl+">")
            res.send()
        })
})
})
// app.get("/",(req,res) => {

//     const url = "https://api.openweathermap.org/data/2.5/weather?q=Sangli&appid=7f01ec904581292daf210392b8058e68&units=metric"
//     https.get(url,(response)=>{
//         // console.log(response)
        
//         response.on("data", (data)=>{
//             const weather = JSON.parse(data);
//             const temp = weather.main.temp;
//             const desp = weather.weather[0].description;
//             const icon = weather.weather[0].icon;
//             // console.log(temp)
//             // console.log(desp)
//             const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
//             res.write("<h1>Your City's Weather Report is: <br>Temperature:"+temp+" degree Celcius</h1>");

//             res.write("<h2>Description: "+ desp+"</h2>");
//             res.write("<img src="+imageurl+">")
//             res.send()
//         })

//     })
//     // res.sendFile(__dirname+"index.html");
//     // res.send("Server is running!!!")
// })


app.listen(3000, () =>{
    console.log("Welcome to 3000")
})