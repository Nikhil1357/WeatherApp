const API = "af070d581b96ea157ba00a5232448822"

const bp = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(bp.json());


app.post('/',(req, res)=>{

    var ans={};
    // console.log(req.body);
    const city = req.body.city;
    const country = req.body.country;
    const state = req.body.state;

    console.log(city,country,state);
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API}`)
    .then(data=>data.json())
    .then((data)=>{
        console.log(data);
        var lat = data[0]["lat"];
        var lon = data[0]["lon"];
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`)
        .then(data=>data.json())
        .then((data)=>{
        
            console.log(data);
            ans["main"]=data['weather'][0]["main"];
            ans["desc"]=data['weather'][0]["description"];
            ans["feels_like"] = data["main"]["feels_like"];
            ans["temp"] = data["main"]["temp"];
            ans["humidity"]=data["main"]["humidity"]; 
            res.status(200).json(ans);
        })
    })
    .catch(()=>{
        res.status(404);
    })
    

})


app.listen(8000,()=>{
    console.log("Hi");
})