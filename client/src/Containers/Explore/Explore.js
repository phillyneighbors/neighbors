import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
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
            newMarkerAddress: null
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

    // mapRef = null;

    // handleMapMounted = (r) => {
    //     if (!r || this.mapRef) return;
    //     this.mapRef = r;
    //     console.log('Ref set @ ' + Date.now());
    // };

    onMapClick = (event) => {
        console.log(event.Ha.view.google.maps);
        this.setState({
            markerPosition: event.latLng,
            isMarkerShown: true
        })
        // console.log(this.state.markerPosition);
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
            newMarkerAddress: event.target.value,
        })
        console.log(this.state.newMarkerAddress);
    }

    createMarker = () => {
        console.log('Marker created @ ' + Date.now());
        geocodeByAddress(this.state.newMarkerAddress)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState(state => ({
                newMarkerAddress: "",
                markers: state.markers.concat(latLng)
            })))
            .then(() => { console.log(this.state); })
            .catch(error => console.error('Error', error));
    }

    render() {
        return (
            <div className="container-fluid">
                <Modal show={this.state.modal} clicked={this.openModal} closeModal={this.closeModal}>
                    <Button clicked={this.closeModal}>Cancel</Button>
                    <Button type="submit" clicked={this.createMarker}>Create Marker</Button>
                    <br />
                    Enter an address!
                    <form>
                        <TextInput
                            id="autocomplete"
                            type="text"
                            placeholder="Enter event address"
                            name="address"
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
                        // defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
                        defaultCenter={this.state.userLocation}
                        onMapMounted={this.handleMapMounted}
                        onClick={this.onMapClick}>
                        {this.state.markers.map((marker) => {
                            return (<Marker key={marker.lat + ',' + marker.lng} position={marker} />)
                        })}
                        <Marker position={this.state.markerPosition} />
                    </GoogleMapsWrapper> : null
                }
            </div>
        )
    }
}
export default Explore;
