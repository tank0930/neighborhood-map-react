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

  /* componentWillReceiveProps(nextProps) {
    if ( nextProps.selectedLocation !== this.props.selectedLocation) {
       
    }
  } */

  onMarkerClick = (props, marker, e) => {
    console.log(props);
    this.setState({
      selectedPlace: props
    }, () => {
      this.props.markerClicked(props, marker); 
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
        activeMarker={ this.state.activeMarker }
        showingInfoWindow={ this.state.showingInfoWindow }
      >
        { this.props.searchResult.map((result) => (
          (this.props.selectedLocation.id === result.venue.id)  ? (
            <Marker
              key={ result.venue.id }
              onClick = { this.onMarkerClick }
              title = { result.venue.name }
              position = {{ lat: result.venue.location.lat, lng: result.venue.location.lng}}
              name = { result.venue.name }
              animation={this.props.google.maps.Animation.BOUNCE}
            />
          ) : (
            <Marker
              key={ result.venue.id }
              onClick = { this.onMarkerClick }
              title = { result.venue.name }
              position = {{ lat: result.venue.location.lat, lng: result.venue.location.lng}}
              name = { result.venue.name }
            />
          )

        ))}

        <InfoWindow
          marker = { this.props.activeMarker }
          visible = { this.props.showingInfoWindow }
        >
        { this.props.selectedLocation ? (
          <div className="map-location-info">
            <div className="map-location-name">
              { this.props.selectedLocation.name }
            </div>
            <div className="map-location-address">
              Address:{ this.props.selectedLocation.address }
            </div>
            <div className="map-location-photo">
              { this.props.selectedLocation.name }
            </div> 
          </div>
        ) : (
          <div> Sorry, the information is temporary not available.</div>
        )}  
          
        </InfoWindow>    
      </Map>
    );
  }
}
 
 export default GoogleApiWrapper({
  apiKey: "AIzaSyB7yXRfEkWq5TX3vebF7D9RMw3NbrzExBY"
 })(MapContainer)