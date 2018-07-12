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
          humidity: json.main.humidity
        })
      }

    render() {
        return (
            <div className={classes.explore}>
                <div className="container">
                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXYH0-ocvoZnzu1HrgZaBJQ1apvBclUt0"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `300px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                    <div className="row">
                    </div>

                    <br />
                    <div className="row">
                        <div className="col-md">
                            <div className="card">
                                <div className="card-body">
                                    {this.state.temp}
                              
                             
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card">
                                <div className="card-body">
                                {this.state.humidity}
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="card">
                                <div className="card-body">
                                    row 2 column 3 CARD
                                        </div>
                            </div>
                        </div>
                    </div>

                    <br />


</div>
                </div>
            

        );
    }
}

