import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import classes from './Map.css';

import mapStyles from './mapStyles.json';

export class MapContainer extends Component {
  state = {
    currentHood: '1',
    hoods: [],
    opacity: 0.2,
    color: 'blue',
    visible: false
  }

  componentDidMount() {
    // const polyLinesArr = this.props.geometry.map((hood, i) => {
    //   const geometry = [];
    //   const name = hood.properties.mapname;
    //   hood.geometry.coordinates[0][0].forEach(coordSet => {
    //     geometry.push({lat: coordSet[1], lng: coordSet[0]})
    //   });
    //   return {geometry, name,};
    // })
    // this.setState({hoods: polyLinesArr})
  }

  markerClick = (props, marker, event) => {
    marker.strokeColor = 'blue';
    this.setState({visible: !this.state.visible})
    console.log("props: ", props, "Marker: ", marker, "event: ", event)
    // console.log(event.proto.get('id'))
    // event.setOptions({strokeColor: '#ddd'})

  }

  render() {
    // console.log(this.state.opacity)
    // // console.log('rendering')
    // const polyLineElems = this.props.geometry.map((hood, i) => {
    //   let strokeOpacity = 0.2
    //   // if (i.toString() === this.state.currentHood){
    //   //   console.log(i + ' === ' + this.state.currentHood)
    //   //   strokeOpacity = 0.8
    //   // }
    //   return (
    //     <Polyline
    //       id = {i}
    //       key = {i}
    //       name = {hood.mapname}
    //       path={hood.geometry}
    //       strokeOpacity={this.state.opacity}
    //       strokeColor={this.state.color}
    //       onMouseover={this.showPolyLine}
    //       // visible={this.state.visible}
    //     />
    //   )
    // })

    // console.log(this.props.geometry)
    // we want to offeset the map a little bit so the outlined neighborhood
    // fits nicely next to the chatbox
    // const offSetLat = this.props.lat + .004;
    // const offSetLng = this.props.lng - .008;
    const geometry = this.props.geometry.map(coordSet => {
      return {lat: coordSet[1], lng: coordSet[0]}
    })
    console.log(geometry)
    return (
        <Map
          id="map"
          google={this.props.google}
          className={classes.MapContainer}
          initialCenter={{lat: this.props.lat, lng: this.props.lng}}
          zoom={15}
          data-state={this.state.opacity}
          styles={mapStyles}
          onClick={this.onMapClicked}>
          <Polyline
            path={geometry}
            strokeOpacity={0.7}
            strokeColor={'blue'}
            onMouseover={this.showPolyLine}
          />
          {/* {polyLineElems} */}
          <Marker onClick={this.onMarkerClick}
            position={{lat: this.props.lat, lng: this.props.lng}}
            name={'Current location'}
            color={'red'}
            onClick={this.markerClick}
          />

        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBXYH0-ocvoZnzu1HrgZaBJQ1apvBclUt0')
})(MapContainer)
