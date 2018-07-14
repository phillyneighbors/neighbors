import React, { Component } from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import './Explore.css';
import classes from './Explore.css';

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
    }), {
            onMapClick: ({ isMarkerShown }) => (e) => ({
                markerPosition: e.latLng,
                isMarkerShown: true
            })
        }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 39.9532, lng: -75.1677 }}
            onClick={props.onMapClick}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} />}

        </GoogleMap>
    )

export default class Explore extends Component {
    constructor(props) {
        super(props)

        this.state = {
            /// defaulted to center city
            userLocation: {
                lat: 39.9532,
                lng: -75.1677
            },
            weatherData: ""
        };
    }


    async componentDidMount() {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&appid=22e0e62f9c400a6d4c6299d5a811c050")
        const json = await response.json() 
        console.log(json);
    
        this.setState({
          temp: json.main.temp,
          humidity: json.main.humidity,
          minTemp: json.main.temp_min,
          maxTemp: json.main.temp_max,

        })
      }

    render() {
        return (
                <div className="container-fluid">
                <div className={classes.weatherWidget}>
                
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">current weather</h3>
                        </div>
                        <div className="panel-body">
                            <p> Temp: {this.state.temp} </p>
                            <p> Humidity: {this.state.humidity} </p>
                            <p> Today's High: {this.state.maxTemp} </p>
                            <p> Today's Low: {this.state.minTemp} </p>
                            
                        </div>
                        </div>


                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">current weather</h3>
                        </div>
                        <div className="panel-body">
                            <p> Temp: {this.state.temp} </p>
                            <p> Humidity: {this.state.humidity} </p>
                            <p> Today's High: {this.state.maxTemp} </p>
                            <p> Today's Low: {this.state.minTemp} </p>
                            
                        </div>
                        </div>


                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">current weather</h3>
                        </div>
                        <div className="panel-body">
                            <p> Temp: {this.state.temp} </p>
                            <p> Humidity: {this.state.humidity} </p>
                            <p> Today's High: {this.state.maxTemp} </p>
                            <p> Today's Low: {this.state.minTemp} </p>
                            
                        </div>
                        </div>                                            
                </div>

                    <h3 className="map-title"> 
            
                    Explore the City below! 
                    
                    </h3>

                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXYH0-ocvoZnzu1HrgZaBJQ1apvBclUt0"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `300px`, width: `100%`, marginBottom: `200px`  }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />

            </div>

                

                        
        )
        
    }
}

