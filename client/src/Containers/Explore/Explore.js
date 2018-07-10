import React, { Component } from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => ({
            markerPosition: e.latLng,
            isMarkerShown:true
        })
      }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={8}
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
            }
        };
    }

    render() {
        return (
            <div className="container">
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXYH0-ocvoZnzu1HrgZaBJQ1apvBclUt0"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
  }

