import React, { Component } from "react";
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from "react-google-maps"

export const Map = withScriptjs(withGoogleMap((props) => {
    return (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={new window.google.maps.LatLng(props.lat, props.lng)}
    >
    <Marker position={new window.google.maps.LatLng(props.lat, props.lng)} />

    </GoogleMap>
    )

}))

class RestaurantMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
          lat : nextProps.lat, 
          lng : nextProps.lng
        })
      }

      render() {
          return (
            <Map lat={this.state.lat} lng={this.state.lng} googleMapURL={this.props.googleMapURL}
            loadingElement={this.props.loadingElement}  containerElement={this.props.containerElement} 
            mapElement={this.props.mapElement}></Map>
          )
      }
}

export default RestaurantMap; 
