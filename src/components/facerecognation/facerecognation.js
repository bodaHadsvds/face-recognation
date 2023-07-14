import React from "react";
import './facerecognation.css'


const Facerecognation = ( {imageurl ,box}) =>{
    console.log("box",box)
return (
    <div className="center ma "> 
    <div className=" absolute mt2" >  
    <img id="inputimage" alt="nothing here" src={imageurl} width="500px" height="auto"></img> 
    <div className="bounding_box "  style={{top: box.topRow, left: box.leftCol , bottom: box.bottomRow ,right: box.rightCol,}} > </div>
     </div>
    </div>
)
}
export default Facerecognation ;
// style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow ,left: box.leftCol}}