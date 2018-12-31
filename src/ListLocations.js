import React, { Component } from 'react';
 

class ListLocations extends Component {
	
	render(){

		return(
			<div className={ this.props.showList ? 'list-locations' : 'list-locations hidden'}>
				<div className="filter-locations">
					<input 
						type="text" 
						className="filter-keyword" 
						value={this.props.keyword} 
						placeholder="Search the locations" 
						onChange={(event) => (this.props.onKeywordChange(event.target.value))} 
						aria-label="Location Search"
						tabIndex="2"
					/>
				</div>
				<div className="location-results">
					<ol className="location-list">
						{ Array.isArray(this.props.searchResult) ? (this.props.searchResult.map((result) => (
							<li  key={result.venue.id} className="location-item">
								<div 
									className={ (result.venue.id  ===  this.props.selectedLocation.id) ? "location selected" : "location" } 
									onClick={ () => {this.props.onLocationSelected(result)}}
									tabIndex="3"
								>
									{ result.venue.name }
								</div>						
							</li>
						))) : (<li> No result found! </li>) }
					</ol>
				</div>	
			</div>
		);
	}
}
  

export default ListLocations;