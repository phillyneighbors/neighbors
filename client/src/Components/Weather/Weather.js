import React, {Component} from 'react';
import moment from 'moment';
import './Weather.css';
import classes from './Weather.css';
import sunImage from './assets/images/sun.png';
import rainyImage from './assets/images/rainy-cloud.png';
import coldImage from './assets/images/009-cold.png';
import superHotImage from './assets/images/005-weather.png';
import humidityImage from './assets/images/002-humidity.png';
import descriptionImage from './assets/images/notepad.png'


class weatherWidget extends Component {

    constructor(){
        super()
        this.state={
            todaysTemp: "",
            todaysHumidity:"" ,
            todaysMinTemp: "",
            todaysMaxTemp: "",
            todaysDescription: "",

            tomorrowTemp: "",
            tomorrowHumidity: "",
            tomorrowMinTemp: "",
            tomorrowMaxTemp: "",
            tomorrowDt: "",
            tomorrowDescription: "",


            followingTemp: "",
            followingHumidity: "",
            followingMinTemp: "",
            followingMaxTemp: "",
            followingDt: "",
            followingDescription: ""
            
        }
    }
 
    async componentDidMount(props) {

            const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Philadelphia&units=imperial&appid=22e0e62f9c400a6d4c6299d5a811c050")
            const json = await response.json() 
    
            console.log("weather object" + json)
            console.log(json.list[1].weather[0].description)
            
            ;

    
            this.setState({
                todaysTemp: json.list[1].main.temp,
                todaysHumidity: json.list[1].main.humidity,
                todaysMinTemp: json.list[1].main.temp_min,
                todaysMaxTemp: json.list[1].main.temp_max,
                todaysDt: json.list[1].dt,
                todaysDescription: json.list[1].weather[0].description,

                tomorrowTemp: json.list[7].main.temp,
                tomorrowHumidity: json.list[7].main.humidity,
                tomorrowMinTemp: json.list[7].main.temp_min,
                tomorrowMaxTemp: json.list[7].main.temp_max,
                tomorrowDt: json.list[7].dt,
                tomorrowDescription: json.list[7].weather[0].description,

                followingTemp: json.list[14].main.temp,
                followingHumidity: json.list[14].main.humidity,
                followingMinTemp: json.list[14].main.temp_min,
                followingMaxTemp: json.list[14].main.temp_max,
                followingDt: json.list[14].dt,
                followingDescription: json.list[14].weather[0].description

            })

        }

    

    render() {

    // utilizing moment to display current and following days

        let today = moment().format("ddd, MMM Do");
        let tomorrow = new moment().add(1, 'day').format("ddd, MMM Do");
        let followingDay = new moment().add(2, 'day').format("ddd, MMM Do");

    //  functions for which icons display depending on weather variables

        let displayTodaysTempImage = "";

            if (this.state.todaysTemp > 70) {
                displayTodaysTempImage = sunImage
            }else {
                displayTodaysTempImage = coldImage
            }


            let displayTomorrowTempImage = "";

            if (this.state.tomorrowTemp > 70) {
                displayTomorrowTempImage = sunImage
            }else {
                displayTomorrowTempImage = coldImage
            }

            let displayFollowingTempImage = "";

            if (this.state.followingTemp > 70) {
                displayFollowingTempImage = sunImage
            }else {
                displayFollowingTempImage = coldImage
            }

        let displayMaxTempImage = "";
           
                displayMaxTempImage = superHotImage

        let displayHumidityImage = "";

            if (this.state.todaysHumidity > 15) {
                displayHumidityImage = humidityImage
            }
        
        let displayDescriptionImage = "";
            
            displayDescriptionImage = descriptionImage;
    

        return (

            <div className="container">
                <div className={classes.weatherWidget}>
                <div className="home-subheroes tiles tiles--desktop">
                    <div className="tile tile--large">
                        <div className={classes.heading}>
                            {today}
                        </div>
                        <table className={classes.Content}>
                                <th><img src={displayDescriptionImage} alt="descImage" /> </th>
                                <td>{this.state.todaysDescription} </td>
                            <tr />
                                <th><img src={displayTodaysTempImage} alt="tempImage" /></th>
                                <td>{this.state.todaysTemp} &#x02109; </td>
                            <tr />
                                {/* <th><img src={displayMaxTempImage} alt="maxTempImage" /></th>
                                <td>{this.state.todaysMaxTemp} &#x02109;   </td> */}
                            <tr />
                                <th><img src={displayHumidityImage} alt="humidityImage" /></th>
                                    <td>{this.state.todaysHumidity}% humid  </td>
                                <tr />
                        </table>            
                     </div>
                </div>

                <div className="home-subheroes tiles tiles--desktop">
                    <div className="tile tile--large">
                        <div className={classes.heading}>
                            {tomorrow}
                        </div>
                        <table className={classes.Content}>

                                <th><img src={displayDescriptionImage} alt="descImage" /> </th>
                                <td>{this.state.tomorrowDescription} </td>

                            <tr />
                                <th><img src={displayTomorrowTempImage} alt="tempImage" /></th>
                                <td>{this.state.tomorrowTemp} &#x02109; </td>
                            <tr />
                                {/* <th><img src={displayMaxTempImage} alt="maxTempImage" /></th>
                                <td>{this.state.tomorrowMaxTemp} &#x02109;   </td> */}
                            <tr />
                                <th><img src={displayHumidityImage} alt="humidityImage" /></th>
                                    <td>{this.state.tomorrowHumidity}% humid </td>
                                <tr />
                        </table>            
                     </div>
                </div>

                <div className="home-subheroes tiles tiles--desktop">
                    <div className="tile tile--large">
                        <div className={classes.heading}>
                            {followingDay}
                        </div>
                        <table className={classes.Content}>

                                <th><img src={displayDescriptionImage} alt="descImage" /> </th>
                                <td>{this.state.followingDescription} </td>
                            <tr />
                                <th><img src={displayFollowingTempImage} alt="tempImage" /></th>
                                <td>{this.state.followingTemp} &#x02109; </td>
                            <tr />
                                {/* <th><img src={displayMaxTempImage} alt="maxTempImage" /></th>
                                <td>{this.state.followingMaxTemp} &#x02109;   </td> */}
                            <tr />
                                <th><img src={displayHumidityImage} alt="humidityImage" /></th>
                                    <td>{this.state.followingHumidity}% humid  </td>
                                <tr />
                        </table>            
                     </div>
                </div>              
                </div>
                </div>             
        )}
    
    }

export default weatherWidget;