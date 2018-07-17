import React, {Component} from 'react';
import moment from 'moment';
import './Weather.css';
import classes from './Weather.css';
import sunImage from './assets/images/sun.png'
import rainyImage from './assets/images/rainy-cloud.png'
import coldImage from './assets/images/009-cold.png'
import superHotImage from './assets/images/005-weather.png'
import humidityImage from './assets/images/001-humidity-1.png'

class weatherWidget extends Component {

    constructor(){
        super()
        this.state={
            temp: "",
            humidity:"" ,
            minTemp: "",
            maxTemp: "",
        }
    }

    

        async componentDidMount(props) {

            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&appid=22e0e62f9c400a6d4c6299d5a811c050")
            const json = await response.json() 
    
            console.log("weather object" + json);

    
            this.setState({
                temp: json.main.temp,
                humidity: json.main.humidity,
                minTemp: json.main.temp_min,
                maxTemp: json.main.temp_max,
                dt: json.dt
                
            })
        }


    render() {


        let today = moment().format("ddd, MMM Do");
        let tomorrow = new moment().add(1, 'day').format("ddd, MMM Do");
        let followingDay = new moment().add(2, 'day').format("ddd, MMM Do");




        let displayTempImage = "";

            if (this.state.temp > 80) {
                displayTempImage = sunImage
            }else {
                displayTempImage = coldImage
            }

        let displayMaxTempImage = "";

            if (this.state.maxTemp > 80) {
                displayMaxTempImage = superHotImage
            }

        let displayHumidityImage = "";

            if (this.state.humidity > 45) {
                displayHumidityImage = humidityImage
            }
        



        return (

            <div className="container">
                <div className={classes.weatherWidget}>
                <div className="home-subheroes tiles tiles--desktop">
                    <div className="tile tile--large">
                        <div className={classes.heading}>
                            {today}
                        </div>
                        <table className="content">  
                            <tr />
                                <th><img src={displayTempImage} alt="tempImage" /></th>
                                <td>{this.state.temp} &#x02109; </td>
                            <tr />
                                <th><img src={displayMaxTempImage} alt="maxTempImage" /></th>
                                <td>{this.state.maxTemp} &#x02109;   </td>
                            <tr />
                                <th><img src={displayHumidityImage} alt="humidityImage" /></th>
                                    <td>{this.state.humidity}  </td>
                                <tr />
                        </table>            
                     </div>
                </div>

                <div className="home-subheroes tiles tiles--desktop">
                    <div className="tile tile--large">
                        <div className={classes.heading}>
                            {tomorrow}
                        </div>
                        <table className="content">  
                            <tr />
                                <th><img src={displayTempImage} alt="tempImage" /></th>
                                <td>{this.state.temp} &#x02109; </td>
                            <tr />
                                <th><img src={displayMaxTempImage} alt="maxTempImage" /></th>
                                <td>{this.state.maxTemp} &#x02109;   </td>
                            <tr />
                                <th><img src={displayHumidityImage} alt="humidityImage" /></th>
                                    <td>{this.state.humidity}  </td>
                                <tr />
                        </table>            
                     </div>
                </div>

                <div className="home-subheroes tiles tiles--desktop">
                    <div className="tile tile--large">
                        <div className={classes.heading}>
                            {followingDay}
                        </div>
                        <table className="content">  
                            <tr />
                                <th><img src={displayTempImage} alt="tempImage" /></th>
                                <td>{this.state.temp} &#x02109; </td>
                            <tr />
                                <th><img src={displayMaxTempImage} alt="maxTempImage" /></th>
                                <td>{this.state.maxTemp} &#x02109;   </td>
                            <tr />
                                <th><img src={displayHumidityImage} alt="humidityImage" /></th>
                                    <td>{this.state.humidity}  </td>
                                <tr />
                        </table>            
                     </div>
                </div>               


                </div>
                </div>             
        )}
    
    }

export default weatherWidget;