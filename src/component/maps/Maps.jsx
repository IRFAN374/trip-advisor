import React from 'react';

import GoogleMapReact from 'google-map-react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import  LocationOnOutlinedIcon  from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './mapStyle';
import mapStyle from './styles';


const Maps=({coordinates, setCoordinates,setBounds,places,setChildClicked, weatherData})=> {
    const isDesktop = useMediaQuery('(min-width: 600px)');
    const classes = useStyles();

    
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
             bootstrapURLKeys = {{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
             defaultCenter={coordinates}
             center={coordinates}
             defaultZoom={14}
             margin={[50,50,50,50]}
             options={ {disableDefaultUI: true, zoomControl: true, styles: mapStyle}}
             onChange={(event)=>{
                 //console.log("Coordinates are:", event);
                 setCoordinates({ lat: event.center.lat, lng: event.center.lng});
                 setBounds({ ne: event.marginBounds.ne, nw: event.marginBounds.nw, se: event.marginBounds.se, sw: event.marginBounds.sw });

             }}
             onChildClick={(child)=> setChildClicked(child)}
            >
             {places?.length && places?.map((place, index) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={index}
          >
            {!isDesktop
              ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}

              {weatherData?.list?.length && weatherData.list.map((data, index) => (
                <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
                  <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt="today weather" />
                </div>
              ))}
            </GoogleMapReact>
        </div>
    )
}

export default Maps
