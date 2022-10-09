import React, { Component } from 'react';
import ReactBingmaps from 'components/ReactBingmaps';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible : true,
      bingmapKey: "AksOASfzdybmndjlOxhWnhZaNtzG5CMgqUFIgB5Ji8W6Gr748WQL5mijk5w4OmDD", //Don't use this key in your environment.
      infoboxes : [
        {
          "location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: '...' }, "addHandler": {"type" : "click", callback: this.callBackMethod}
        }
      ],
      pushPins : [
        {
          "location":[13.0827, 80.2707], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      regularPolygons:[
        {
          "center":[13.0827, 80.2707],
          "radius":5,
          "points":36,
          "option": {fillColor: "rgba(0,0,0,0.5)", strokeThickness: 2}
        }
      ],
      infoboxesWithPushPins: [
        {
          "location":[13.0827, 80.2707], 
          "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
          "infoboxOption": { title: 'Infobox Title', description: 'Infobox' },
          "pushPinOption":{ title: 'Pushpin Title', description: 'Pushpin' },
          "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
          "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      boundary: {
        "location":['chennai'],
        "option":{
          entityType: 'PopulatedPlace'
        },
        "polygonStyle" :{
          fillColor: 'rgba(161,224,255,0.4)',
          strokeColor: '#a495b2',
          strokeThickness: 2
        }
      },
      searchInput: "",
      getLocationHandledData: "",
      polyline: {
        "location": [[13.0827, 80.2707],[13.0827, 80.1907]],
        "option": { strokeColor: 'blue', strokeThickness: 10, strokeDashArray: [1, 2, 5, 10] }
      },
      directions: {
        "renderOptions": {"itineraryContainer": "itineraryContainer" },
        "requestOptions": {"routeMode": "driving", "maxRoutes": 2},
        "wayPoints": [
              {
                address: 'Chennai, Tamilnadu'
              },
              {
                address: 'Salem, Tamilnadu'
              }
            ]
      }
    }
  }
  changeState(){
    this.setState({
      infoboxes : [
        {
          "location":[13.0827, 80.2707], "option":{ title: 'Chennai', description: 'Tamilnadu' }, "addHandler": {"type" : "click", callback: this.callBackMethod}
        }
      ],
      pushPins : [
        {
          "location":[13.0827, 80.2707], "option":{ color: 'yellow' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        },
        {
          "location":[13.0727, 80.2707], "option":{ color: 'green' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      regularPolygons:[
        { 
       
          "center":[[27.2046, 77.4977]],
          "radius":5,
          "points":6,
          "option": {fillColor: "rgba(0,0,0,0.5)", strokeThickness: 2}
        }
      ],
      infoboxesWithPushPins: [
        {
          "location":[[27.2046, 77.4977]], 
          "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
          "infoboxOption": { title: 'Chennai', description: 'Infobox' },
          "pushPinOption":{ title: 'Chennai', description: 'Pushpin' },
          "infoboxAddHandler": {"type" : "click", callback: this.callBackMethod },
          "pushPinAddHandler": {"type" : "click", callback: this.callBackMethod }
        }
      ],
      boundary: {
        "search" : "636303",
        "polygonStyle" :{
          fillColor: 'rgba(161,224,255,0.4)',
          strokeColor: '#a495b2',
          strokeThickness: 2
        },
        "option":{
          entityType: 'PopulatedPlace'
        }
      },
      polyline: {
        "location": [[13.0827, 80.2707],[13.0527, 80.2707]],
        "option": { strokeColor: 'red', strokeThickness: 10, strokeDashArray: [1, 2, 5, 10] }
      },
      directions: {
        "inputPanel": "inputPanel",
        "renderOptions": {"itineraryContainer": "itineraryContainer" },
        "requestOptions": {"routeMode": "driving", "maxRoutes": 2},
        "wayPoints": [
              {
                address: 'Chennai, Tamilnadu'
              },
              {
                address: 'Salem, Tamilnadu'
              },
              {
                address: 'Coimbatore, Tamilnadu'
              }
            ]
      }
    })
  }
  handleSubmit(event){
    if(this.state.searchInput !== null && this.state.searchInput !== ""){
      this.setState({
        boundary: {
          "search" : this.state.searchInput,
          "polygonStyle" :{
            fillColor: 'rgba(161,224,255,0.4)',
            strokeColor: '#a495b2',
            strokeThickness: 2
          },
          "option":{
            entityType: 'PopulatedPlace'
          }
        }
      })
    }
    event.preventDefault();
  }
  GetLocationHandled(location){
    this.setState({
      getLocationHandledData: JSON.stringify(location)
      
    });
  }
  GetEventHandled(callbackData){
    console.log(this.state.getLocationHandledData);
  }
  render() {
    return (
      <div>
        <div>
          <a target="_blank" href="https://github.com/iniamudhan/react-bingmaps/blob/dev/src/App.js"> </a>
        </div>
        {this.state.isVisible && (<div>

                     
          <div className = "map-one">
         
            <ReactBingmaps
              id = "seven" 
              className = "customClass"
              center = {[12.575831397821048,37.443424787594154]}
              bingmapKey = {this.state.bingmapKey}
              zoom={12}
              getLocation = {
                {addHandler: "click", callback:this.GetLocationHandled.bind(this)}
              }
            > 
            {localStorage.setItem("data",this.state.getLocationHandledData)}
            </ReactBingmaps>
            {/* <u><span>{this.state.getLocationHandledData}</span></u> */}
            {localStorage.setItem("latitude",this.state.getLocationHandledData.substring(12,this.state.getLocationHandledData.indexOf(',')))}
            {localStorage.setItem("longitude",this.state.getLocationHandledData.substring(this.state.getLocationHandledData.indexOf('gitude":')+8,this.state.getLocationHandledData.indexOf(',"alt')))}
        
          <h2>{'Latitude :'+this.state.getLocationHandledData.substring(12,this.state.getLocationHandledData.indexOf(','))}</h2>
          <h2>{'Longitude :'+this.state.getLocationHandledData.substring(this.state.getLocationHandledData.indexOf('gitude":')+8,this.state.getLocationHandledData.indexOf(',"alt'))}</h2>
          
          </div>
        </div>)}
        
         
         

      </div>
    );
  }
}

export default App;
