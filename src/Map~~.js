import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from'google-maps-react';


class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {} 
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props);
    this.props.markerClicked(marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
 
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        zoom = { 12 }
        initialCenter = { this.props.center }
        className="map"
        selectedLocation={ this.props.selectedLocation }
      >
       
        {this.props.searchResult.map((result) => (
          <Marker
            onClick = { this.onMarkerClick }
            title = { result.venue.name }
            position = {{ lat: result.venue.location.lat, lng: result.venue.location.lng}}
            name = { result.venue.id }
            animation={this.props.google.maps.Animation.DROP}
          />
        ))}

        <InfoWindow
          marker = { this.props.activeMarker }
          visible = { this.props.showingInfoWindow }
        >  
          { (this.props.selectedLocation.venue != null || this.props.selectedLocation.venue !== undefined) ? (
            <div className="map-location-info">
              <div className="map-location-name">
                { /* this.props.selectedLocation.venue.name  */}
              </div>
              <div className="map-location-photo">
              </div>
              <div className="map-location-rate">
              </div>
            </div>) : (
            <div className="map-location-info-err"> 
              Sorry, information is not available !
            </div>
          )}

        </InfoWindow>    
      </Map>
    );
  }
}
 
 export default GoogleApiWrapper({
  apiKey: "AIzaSyB7yXRfEkWq5TX3vebF7D9RMw3NbrzExBY"
 })(MapContainer)