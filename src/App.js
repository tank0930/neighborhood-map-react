import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import axios from 'axios';
import Map from './Map';
import ListLocations from './ListLocations';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const defaultLocation = {
  "ll": "-36.8381372, 174.7158244",
  "query": 'Auckland'
};


class App extends Component {
  state = {
    locations: [],
    keyword: "",
    searchResult: [],
    selectedLocation: {},
    markers: {},
    activeMarker: {},
    showingInfoWindow: false,
    showList: true
  }

  
  componentDidMount(){
    axios.get('https://api.foursquare.com/v2/venues/explore', {
      params: {
        client_id: 'XXP2X4IJSFLVE2SFDPYIZEUHPC1ULIVYBVXO0CVV2J4L1CPL',
        client_secret: '1P5MI2AI3KZC1BHGQFUBJUJNOJGZNHB3HJKV4X5IH0UH5AGY',
        v: 20181128,
        near: defaultLocation.query,
        section: "sights",
        limit: 10
      }}).then((res) => {
      this.setState({ locations: res.data.response.groups[0].items }, () => {
        if (this.state.keyword === "") {
          this.setState({ searchResult: this.state.locations });  
        }
      });
    }).catch((err) => {
      this.setState({ locations: [] });
      console.log(err);
    });

    
  }

  switchList = () => {
    if (this.state.showList === true) {
      this.setState({ showList: false });
    }
    else {
      this.setState({ showList: true });
    }
  }

  updateKeyword = (keyword) => {
    this.setState( {keyword}, () => {
      let searchResult;
      if (this.state.keyword) {
        if (this.state.keyword === "") {
          this.setState( {searchResult: this.state.locations} );
        }
        else {
          const match = new RegExp(escapeRegExp(this.state.keyword), 'i');
          searchResult = this.state.locations.filter((location) => match.test(location.venue.name));
          this.setState(
            { searchResult }
          )
        }
      }
      else {
        this.setState( {searchResult: this.state.locations} );
      }
    });
  } 

  setMarkers = (markerList) => {
    if ( this.state.markers !== markerList) {
     this.setState({ markers: markerList} );
    }
  }

  markerClicked = (props, marker) => {
    for ( let location of this.state.locations) {
      if (location.venue.name === props.name) {
        axios.get(`https://api.foursquare.com/v2/venues/${ location.venue.id }`, {
          params: {
            client_id: 'XXP2X4IJSFLVE2SFDPYIZEUHPC1ULIVYBVXO0CVV2J4L1CPL',
            client_secret: '1P5MI2AI3KZC1BHGQFUBJUJNOJGZNHB3HJKV4X5IH0UH5AGY',
            v: 20181128,
            limit: 1
          }
        }).then((res) => {
          this.setState({selectedLocation: res.data.response.venue}, () => {
            /* this.setState({ activeMarker: this.state.markers[this.state.selectedLocation.name].marker }, () => {
              console.log(marker);
              console.log(this.state.activeMarker);  */
              
              this.setState({
                activeMarker: marker,
                showingInfoWindow: true
              })
            /* }) */
          })
        }).catch((err) => {
          console.log(err)
        });  
      }
    }
  }

  focusLocation = (location) => {
    axios.get(`https://api.foursquare.com/v2/venues/${ location.venue.id }`, {
      params: {
        client_id: 'XXP2X4IJSFLVE2SFDPYIZEUHPC1ULIVYBVXO0CVV2J4L1CPL',
        client_secret: '1P5MI2AI3KZC1BHGQFUBJUJNOJGZNHB3HJKV4X5IH0UH5AGY',
        v: 20181128,
        limit: 1
      }
    }).then((res) => {
      console.log(res);
      this.setState({selectedLocation: res.data.response.venue}/* , () => {
        console.log(this.state.markers[this.state.selectedLocation.name].marker);
        this.setState({ 
          activeMarker: this.state.markers[this.state.selectedLocation.name].marker,
          showingInfoWindow: true 
        }, () => {
          console.log(this.state.markers[this.state.selectedLocation.name]);
          console.log(this.state.activeMarker);

        })
        
      } */)
    }).catch((err) => {
      console.log(err)
    });
    
  }
  
  render() {
     return (
      <div className="App">
				<header>
          <div className="hamToggle" onClick={ this.switchList } aria-label="List Toggle">
            <FontAwesomeIcon icon= { faBars } />
          </div>
          <div className="title">
            <h1> Auckland TOP 10 </h1>
          </div>
        </header>
        
        <ListLocations 
          keyword={ this.state.keyword } 
          searchResult={ this.state.searchResult } 
          showList={ this.state.showList }
          selectedLocation={ this.state.selectedLocation }
          onKeywordChange={ this.updateKeyword } 
          onLocationSelected={ this.focusLocation }
          onToggleClick={ this.switchList }
        />
        <Map 
          center={ {lat:-36.8381372, lng:174.7158244} } 
          marker={ this.state.markers }
          setMarkers={ this.setMarkers }
          activeMarker={ this.state.activeMarker }
          showingInfoWindow={ this.state.showingInfoWindow }
          searchResult={ this.state.searchResult } 
          selectedLocation={ this.state.selectedLocation }
          markerClicked={ this.markerClicked }
        />   
      
      </div>
    );
  }
}

export default App;
