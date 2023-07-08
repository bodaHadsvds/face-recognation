import React from "react";
import './facerecognation.css'


const Facerecognation = ( {imageurl ,box}) =>{
return (
    <div className="center ma "> 
    <div className="absloute mt2">  <img id="inputimage" alt="nothing here" src={imageurl} width="500px" height="auto"></img>  </div>
   <div className="bounding_box"  > </div>
    </div>
)
}
export default Facerecognation ;
// style={{top: box.leftcol, right: box.topRow , bottom: box.rightcol ,left: box.bottomRow }}