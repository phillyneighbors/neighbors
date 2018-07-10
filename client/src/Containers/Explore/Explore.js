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
            }
        };
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
                            <div class="card">
                                <div class="card-body">
                                    row 2 column 1 CARD
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div class="card">
                                <div class="card-body">
                                    row 2 column 2 CARD
                                        </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div class="card">
                                <div class="card-body">
                                    row 2 column 3 CARD
                                        </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    {/* <div className="row">
                                <div className="col-md">
                                    <p className="row-two">
                                        row 3 column 1
                                    </p>
                                </div>
                            </div>   */}


                </div>
            </div>

        );
    }
}

