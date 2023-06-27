import logo from './logo.svg';
import './App.css';
import Sunny from './Cliff.jpg'
// import {useState} from 'React'
import { useState, useEffect } from "react";

function App() {

  const [loc, set_loc] = useState({
    city:"hyderabad",
    state:"telangana",
    country:"india",
})

const [response, set_response] = useState({main: 'Haze', desc: 'haze', feels_like: 302.71, temp: 300.34, humidity: 74});

const call_for_data = ()=>{

    console.log(loc);
    fetch('/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({city:loc.city, state:loc.state, country:loc.country})
  })
  .then(data=>data.json())
  .then(data=>{
    set_response(data);
  });

}

  const [date, set_date] = useState("00:00")
  const [sub_date, set_subdate] = useState("Monday, 2 June 2023")
  useEffect(() => {
    setInterval(() => {
      const dt = new Date();
      var day_index = dt.getDay();
      var month_index = dt.getMonth();

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const date = dt.getDate();
      const year = dt.getFullYear();

      // var hours_and_minutes = dt.getHours() + "" + dt.getMinutes();
      var textual = days[day_index] + ", " + date + " " + months[month_index] + " " + year;


      // var dt = new Date();
      var hours = dt.getHours() ; // gives the value in 24 hours format
      var AmOrPm = hours >= 12 ? 'pm' : 'am';
      hours = (hours % 12) || 12;
      var minutes = dt.getMinutes() ;
      var finalTime = hours + ":" + minutes + " " + AmOrPm; 

      set_date(finalTime)
      set_subdate(textual)


    }, 1);
  },)

  return (
    <div
      style={{
        // height: '100vh',
        backgroundImage: "url(" + Sunny + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
      className="App">
      <div className='upper'>
      <h1 
      style={{
        padding:0,
        margin:0,
      }}
      >
        Weather App
      </h1>
      <p> powered by OpenWeatherAPi</p>
      <div className='input'>
        <input
          placeholder='City, State, Country'
          onChange={(val) => {
            const arr = val.target.value.split(",");
            set_loc({
              city:arr[0],
              state:arr[1],
              country:arr[2],
            })
            console.log("1st");

          }}
        />
        <button
          onClick={() => {
            
            // console.log("2st");
            call_for_data();
            // console.log("3st");

            }
            }
        
        
        >Enter</button>
      </div>  
      </div>
      {/* <img src={Sunny}/> */} 
      <div
        className="main"
      >
          <div className='datecls'>
            <p className='date'>{date}</p>
            <p className='subdate'>{sub_date}</p>
            
            <div className='weather'>
            <p style={{
              fontSize:'20px',
            }}>{response.main}</p>
            {/* <p>{response.desc}</p> */}
            </div>
          </div>
          
          <div className='loccls'>
            <p className='city'>{loc.city}</p>
            <p className='country'>{loc.country}</p>
          </div>
  
          <div className="bottom">
            <h3>Temp<br />{parseInt(response.temp)-273} &deg;C</h3>
            <h3>Feels Like<br />{parseInt(response.feels_like)-273} &deg;C</h3>
            <h3>Humidity<br />{response.humidity}%</h3>
          </div>
        
      </div>

    </div>
  );
}

export default App;
