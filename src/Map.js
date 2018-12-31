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

  componentDidUpdate() {
    if ( this.props.markers !== this.refs) {
      this.props.setMarkers(this.refs);
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props
    }, () => {
      this.props.markerClicked(props, marker); 
    });

    console.log(this.props.selectedLocation);
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
        activeMarker={ this.props.activeMarker }
      >
        { this.props.searchResult.map((result) => (
          (this.props.selectedLocation.id === result.venue.id)  ? (
            <Marker
              key={ result.venue.id }
              ref={ result.venue.name }
              onClick = { this.onMarkerClick }
              title = { result.venue.name }
              position = {{ lat: result.venue.location.lat, lng: result.venue.location.lng}}
              name = { result.venue.name }
              animation={this.props.google.maps.Animation.BOUNCE}
              tabIndex="4"
              role="listitem"
            />
          ) : (
            <Marker
              key={ result.venue.id }
              ref={ result.venue.name }
              onClick = { this.onMarkerClick }
              title = { result.venue.name }
              position = {{ lat: result.venue.location.lat, lng: result.venue.location.lng }}
              name = { result.venue.name }
              tabIndex="4"
              role="listitem"
            />
          )

        ))}

        <InfoWindow
          marker = { this.props.activeMarker }
          visible = { this.props.showingInfoWindow }
          tabIndex="5"
        >
        { this.props.selectedLocation ? (
          <div className="map-location-info">
            <div className="map-location-name">
              { this.props.selectedLocation.name }
            </div>
            <div className="map-location-address">
              <p className="label">Address:</p>
              { (this.props.selectedLocation.location) ? (
                (this.props.selectedLocation.location.formattedAddress) ? (
                  this.props.selectedLocation.location.formattedAddress.map((addressLine) => (
                     <p> {addressLine} </p> 
                  ))
                ) : ("Woops, the address of this place is temporary not available!")
              ) : ( "Woops, the address of this place is temporary not available!") }
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

class LoadingContainer extends React.Component {
  state = {
      loadingContent: 'Map is Loading...'
  }
  componentDidMount(){
      this.timer = setTimeout(() => {
          this.setState({content: 'Time out, please check your Internet connection or try again later.'}); 
      }, 3000);
  }
  componentWillUnmount(){
      clearTimeout(this.timer);
  }
  
  render(){
      return (
          this.state.loadingContent
      )
  }
}

 
 export default GoogleApiWrapper({
  apiKey: "AIzaSyB7yXRfEkWq5TX3vebF7D9RMw3NbrzExBY",
  LoadingContainer: LoadingContainer
 })(MapContainer)