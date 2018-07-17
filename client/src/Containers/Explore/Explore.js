import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import classes from './Explore.css';
import Button from '../../Components/UI/Button/Button'
import Modal from '../../Components/UI/Modal/Modal'
import TextInput from '../../Components/UI/TextInput/TextInput'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

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
            modal: false,
            isMarkerShown: false,
            markerPosition: null,
            locationLoaded: false,
            userLocation: {
                lat: 32,
                lng: 32
            },
            newMarkerAddress: null,
            isOpen: false,
            markerName: null,
            markerType: null,
            openMarkerKeys: new Set()
        };
        this.getGeoLocation = this.getGeoLocation.bind(this);
    }

    componentDidMount = () => {
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
        console.log(event.Ha.view.google.maps);
        this.setState({
            markerPosition: event.latLng,
            isMarkerShown: true
        })
    }

    openModal = () => {
        console.log('Opening modal')
        this.setState({
            modal: true
        })
    }

    closeModal = () => {
        console.log('Closing modal')
        this.setState({
            modal: false
        })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    createMarker = () => {
        console.log('Marker created @ ' + Date.now());
        geocodeByAddress(this.state.newMarkerAddress)
        .then(results => {
            console.log('RESULTS:', results);
            return getLatLng(results[0])
        })
        .then(latLng => {
            const marker = {
                key: latLng.lat + ',' + latLng.lng,
                latLng,
                markerName: this.state.markerName,
                markerType: this.state.markerType
            };  
            this.setState(state => ({
                newMarkerAddress: "",
                markers: state.markers.concat(marker)
            }))
            // save marker to server HERE - postMarker(marker)
        })
        .then(() => { 
            console.log(this.state);
            this.closeModal(); 
        })
        .catch(error => console.error('Error', error));
    }

    onMarkerClick = (marker) => {
        const key = marker.key;
        this.setState(state => {
            const openMarkerKeys = state.openMarkerKeys;

            if (openMarkerKeys.has(key)) openMarkerKeys.delete(key)
            else openMarkerKeys.add(key)

            return { openMarkerKeys };
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <Modal show={this.state.modal} clicked={this.openModal} closeModal={this.closeModal}>
                    <Button clicked={this.closeModal}>Cancel</Button>
                    <Button type="submit" clicked={this.createMarker}>Create Marker</Button>
                    <br />
                    
                    <form>
                    Enter an address!
                        <TextInput
                            type="text"
                            placeholder="Enter event address"
                            name="newMarkerAddress"
                            changeHandler={this.changeHandler}
                        />
                    Name:
                        <TextInput
                            type="text"
                            placeholder="Name"
                            name="markerName"
                            changeHandler={this.changeHandler}
                        />
                    Type:
                        <TextInput
                            type="text"
                            placeholder="Type"
                            name="markerType"
                            changeHandler={this.changeHandler}
                        />
                    </form>
                </Modal>
                <div className={classes.weatherWidget}>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Explore the Current Weather</h3>
                        </div>
                        <div className="panel-body">
                            <p> Temperature: {this.state.temp} </p>
                            <p> Humidity: {this.state.humidity} </p>
                        </div>
                    </div>
                </div>
                <div>
                    <Button clicked={this.openModal}>Custom Marker</Button>
                </div>
                {this.state.locationLoaded ?
                    <GoogleMapsWrapper
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXYH0-ocvoZnzu1HrgZaBJQ1apvBclUt0&libraries=places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `300px`, width: `100%`, marginBottom: `200px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        defaultZoom={15}
                        defaultCenter={this.state.userLocation}
                        onMapMounted={this.handleMapMounted}
                        onClick={this.onMapClick}>
                        {this.state.markers.map((marker) => {
                            return (
                                <Marker key={marker.key} position={marker.latLng} name={marker.markerName} type={marker.markerType} onClick={() => this.onMarkerClick(marker)}>
                                {this.state.openMarkerKeys.has(marker.key) ? (
                                    <InfoWindow>
                                        <div>
                                            <p>Name: {marker.markerName}</p>
                                            <p>Type: {marker.markerType}</p>
                                        </div>
                                    </InfoWindow>
                                ) : null}
                                </Marker>
                            )
                        })}
                        <Marker position={this.state.markerPosition} />
                    </GoogleMapsWrapper> : null
                }
            </div>
        )
    }
}
export default Explore;


// ToDo:
// Push the markers to the database
// Code to push saved markers from db to state on start
// Job that runs on the server:
// Like button with onClick handler that calls the server
//  Look at markers
//  Look their likes
//  Delete markers that haven't been "liked" within the last 48 hours

