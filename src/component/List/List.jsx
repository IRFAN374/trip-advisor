import React, { useState, useEffect, createRef} from 'react';

import CircularProgress  from '@material-ui/core/CircularProgress';
import Grid  from '@material-ui/core/Grid';
import Typography  from '@material-ui/core/Typography';
import InputLabel  from '@material-ui/core/InputLabel';
import MenuItem  from '@material-ui/core/MenuItem';
import FormControl  from '@material-ui/core/FormControl';
import Select  from '@material-ui/core/Select';


import useStyles from './listStyle';
import PlaceDetails from '../placeDetails/PlaceDetails'


const List=({places,childClicked, isLoading,type,setType,rating, setRating})=> {
    
    const classes = useStyles();

    const [ elemRef, setElemRef] = useState([]);

    useEffect(()=>{
        const refs = Array(places?.length).fill().map((_,index)=> elemRef[index] || createRef());
        setElemRef(refs);
    },[places])

    // const places = [ { name: 'Five Star Restaturants'}, { name: 'Chinese Fast Food'}, { name: 'North Indian Food'}, { name: 'Taj Mahal'}, { name: 'Five Star Restaturants'}, { name: 'Chinese Fast Food'}, { name: 'North Indian Food'}, { name: 'Taj Mahal'}, { name: 'Five Star Restaturants'}, { name: 'Chinese Fast Food'}, { name: 'North Indian Food'}, { name: 'Taj Mahal'}, ]
    // console.log("Child Clicked:  ",{childClicked})
    return (
        <div className={classes.container}>
           <Typography variant="h4"> Restaurant, Attraction and Dinning around you. </Typography>
           {
               isLoading ? (
                   <div className={classes.loading}>
                       <CircularProgress size="5rem" />
                   </div>
               ):(
                   <>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="type">Type</InputLabel>
                            <Select id="type" value={type} onChange={(event)=> setType(event.target.value)}>
                                <MenuItem value="restaurants">Restaurants</MenuItem>
                                <MenuItem value="hotels" >Hotels</MenuItem>
                                <MenuItem value="attractions" >Attractions</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="rating">Rating</InputLabel>
                            <Select id="rating" value={rating} onChange={(event)=> setRating(event.target.value)}>
                                <MenuItem value="all" >All</MenuItem>
                                <MenuItem value="3" >Above 3.0</MenuItem>
                                <MenuItem value="4" >Above 4.0</MenuItem>
                                <MenuItem value="4.5" >Above 4.5</MenuItem>
                            </Select>
                        </FormControl>

                        <Grid container spacing={3} className = {classes.list}>
                            { places?.map((place,index)=> (
                                <Grid ref = {elemRef[index]} key={index} item xs={12}>
                                    <PlaceDetails 
                                        place ={place}
                                        selected= { Number(childClicked) === index}
                                        refProp = {elemRef[index]} 
                                    />
                                </Grid>
                            ))}
                        </Grid>
                   </>
               )
           }

        </div>
    )
}

export default List
