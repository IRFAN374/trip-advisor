import React, { useEffect, useState } from "react";
import  CssBaseline  from "@material-ui/core/CssBaseline";
import  Grid from "@material-ui/core/Grid";

import Header from './component/Header/Header';
import List from './component/List/List';
import Maps from './component/maps/Maps';

import { getPlacesDetails, getWeatherData } from './api'

const App=()=> {
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants")
  const [ rating, setRating] = useState("all");
  const [filteredPlaces, setFilteredPlaces] = useState([])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}})=>{
        setCoordinates({ lat: latitude, lng: longitude })
    })
  },[])

  useEffect(()=>{
    
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);

  },[rating])

  useEffect(()=>{
    //  console.log("Coordinates bounds", coordinates, bounds);
    if(bounds.sw && bounds.ne){
        setIsLoading(true)
        
        getWeatherData(coordinates.lat, coordinates.lng).then((data)=> setWeatherData(data));

        getPlacesDetails(type,bounds.sw, bounds.ne)
        .then((data)=>{
        //  console.log("data receievd :", data);
          setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
          setIsLoading(false);
          setFilteredPlaces([]);
          setRating("");
        })
    }
  },[bounds,type]);

  return (
     <>
     <CssBaseline />
     <Header setCoordinates= {setCoordinates} />
     <Grid container spacing={3} style={{width: '100%'}} >
       <Grid item xs={12} md={4}>
         <List 
            places={ filteredPlaces.length ? filteredPlaces: places}
            childClicked={childClicked}
            isLoading={isLoading}
            type= {type}
            setType = {setType}
            rating = {rating}
            setRating = {setRating}
         />
       </Grid>
       <Grid item xs={12} md={8}>
         <Maps 
           setCoordinates={setCoordinates}
           setBounds={setBounds}
           coordinates={coordinates}
           places={ filteredPlaces.length ? filteredPlaces: places}
           setChildClicked={setChildClicked}
           weatherData = {weatherData}
         />
       </Grid>
     </Grid>
     </>
  );
}

export default App;
