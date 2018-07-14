import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import './Explore.css';
import classes from './Explore.css';

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
    const { onMapMounted, ...otherProps } = props;
    return <GoogleMap {...otherProps} ref={c => {
        onMapMounted && onMapMounted(c)
    }}>{props.children}</GoogleMap>
}));

class Explore extends Component {

    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            isMarkerShown: false,
            markerPosition: null,
            locationLoaded: false,
            userLocation: {
                lat: 32,
                lng: 32
            }
        };
        this.getGeoLocation = this.getGeoLocation.bind(this);
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

        console.log('Mounted @ ' + Date.now());
        this.getGeoLocation();
        console.log(this.state);
      }

    getGeoLocation = () => {
        console.log("1")
        if (navigator.geolocation) {
            console.log("2")
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                    this.setState({
                        userLocation: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        locationLoaded: true
                    })
                }
            )
        } else {
            error => console.log(error)
        }
    }

    onMapClick = (event) => {
        this.setState({
            markerPosition: event.latLng,
            isMarkerShown: true
        })
    }

    mapRef = null;

    handleMapMounted = (c) => {
        if (!c || this.mapRef) return;
        this.mapRef = c;
        console.log('Ref set @ ' + Date.now());
    };

    render() {
        return (
            <div className="container-fluid">
                <div className={classes.weatherWidget}>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Explore the Current Weather</h3>
                        </div>
                        <div className="panel-body">
                            <p> Temp: {this.state.temp} </p>
                            <p> Humidity: {this.state.humidity} </p>
                            <p> Today's High: {this.state.maxTemp} </p>
                            <p> Today's Low: {this.state.minTemp} </p>
                        </div>

                        
                    <h3 className="map-title">       
                        Explore the City below!         
                    </h3>

                    </div>
                </div>
                {this.state.locationLoaded ?
                    <GoogleMapsWrapper
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXYH0-ocvoZnzu1HrgZaBJQ1apvBclUt0"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `300px`, width: `100%`, marginBottom: `200px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        defaultZoom={15}
                        // defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
                        defaultCenter={this.state.userLocation}
                        onMapMounted={this.handleMapMounted}
                        onClick={this.onMapClick}>
                        <Marker position={this.state.markerPosition} />
                    </GoogleMapsWrapper> : null
                }
            </div>
        )
    }
}
export default Explore;
