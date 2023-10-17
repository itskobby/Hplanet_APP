'use strict'
let log=console.log;

//requiring the csv-parse package downloaded
import {parse} from 'csv-parse';
// requiring the file system from node modules
import fs from 'fs';

// creating an array to store incoming data
const habitablePlanets=[];


// creating a funtion to find habitable planets
function isHabittablePlanet(planet){
    return planet['koi_disposition']==='CONFIRMED'
    && planet['koi_insol']>0.36 && planet['koi_insol']<1.11
   && planet['koi_prad']>1.6;   
};

// passing in the kepler_data file
fs.createReadStream('cumulative_2023.10.16_18.58.12.csv')
/* calling the .pipe function to connect the readablestream source
   to a writeablestream destination. the pipe function is on the csv-parse
   pacakage
*/ 
.pipe(parse({
    Comment: '#',
    columns: true,
}))
//this gives us access to fs event emiter which we can react to
// reacting to the data event by placing the data in results array
.on('data',(data)=>{
    if(isHabittablePlanet(data)){
        habitablePlanets.push(data);
    };
    
})
// listening for an error event and decribing the error
.on('error',(err)=>{
    log(err); 
})
// listenin for the end event, logging the results array
.on('end',()=>{
   log(`${habitablePlanets.length} habitable planets found.`);
   log('done');
});

