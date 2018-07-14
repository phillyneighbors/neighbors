import React, {Component} from 'react';
import './Weather.css';
import classes from './Weather.css';
import sunImage from './assets/images/sun.png'

class weatherWidget extends Component {

    async componentDidMount() {

        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&appid=22e0e62f9c400a6d4c6299d5a811c050")
        const json = await response.json() 

        console.log("weather object" + json);

        this.setState({
            temp: json.main.temp,
            humidity: json.main.humidity,
            minTemp: json.main.temp_min,
            maxTemp: json.main.temp_max,
        })
    }


    render() {
        return (

            <div>
                hi
                </div>

             
                
        )}
    
    }

export default weatherWidget;