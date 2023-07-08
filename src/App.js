
import './App.css';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/logo';
import 'tachyons';
import Imagelinkform from "./components/imagelinkform/imagelinkform"
import Rank from './components/import rank/Rank';
import ParticlesBg from 'particles-bg'
import Facerecognation from './components/facerecognation/facerecognation';
// import { input } from '@testing-library/user-event/dist/types/event';

const app = new Clarifai.App({
  apiKey: 'b0e40bd0308547e79d0f2c77de5c5b18'
 });

const returnclarfiajsonRequestopition = (imageurl)=>{
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '586712f5710a4d388dada4b14f6f4ab0';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'd8ck7qqftv86';       
const APP_ID = 'fderre';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection'; 
const IMAGE_URL = imageurl;


const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
});



 const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};
return requestOptions
}
    
    


class App extends Component {
  constructor(){
    super()
    this.state={ 
      input :   '' ,
      imageurl:"",
      box :{}
    }

}

calculatefacelocation = (data)=>{
  const Clarifaiface= data.outputs[0].data.regoines[0].region_info.bounding_box;
  const image = document.getElementById("inputimage") ;
  const width = Number(image.width)
  const height = Number(image.height)
 return {

  leftcol:Clarifaiface.leftcol * width ,
  topRow : Clarifaiface.toprow * height,
  rightcol: width - ( Clarifaiface.rightcol*width),
  bottomRow :height - (Clarifaiface.bottomRow*height)


 }

  }   
  displayfacebox =(box)=>{
    this.setState({box:box})
  }

OnInputChange = (event) =>{
  this.setState({input: event.target.value});

  }
  OnButtonSubmit=()=>{
this.setState({imageurl:this.state.input})

  
   
  fetch("https://api.clarifai.com/v2/models/" + "face-detection" , returnclarfiajsonRequestopition(this.state.input))
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(err=> console.log(err))
  // .then(response=>this.displayfacebox(this.calculatefacelocation(response)))
  
  // .then(response=>this.calculatefacelocation(response))
   .then(respone=>{
    console.log( 'HI ' ,respone)
    if(respone) {
      fetch ("https:/localhost:3000/image", {
        method:"put",
        headers:{'content-Type':'application/json'},
        body: JSON.stringify({
            id: this.state.user.id
        })

      })
    
      .then(respone=>respone.JSON)
      .then(count=>{
     this.setState(Object.assign( this.state.user , {entries :count}))
      })
    }
    this.displayfacebox(this.calculatefacelocation('response'))
    })
  .catch(err=> console.log(err))
  }


render(){

       const config = {
        Num: 100,
        life: [1.5, 3],
        v: [2, 3],
        rps: 0.1,
       
        density :{
          enable:true,

       

        },
        onhover: {
        enable :true ,
         
        }
        }
       

  return (
    <div className="App">
       <ParticlesBg  color="#ffffff"  type="cobweb" bg={true} config={config} />


      <Navigation  />
      <Logo />
      <Rank />
      <Imagelinkform  OnInputChange={this.OnInputChange}  OnButtonSubmit={this.OnButtonSubmit} />
      <Facerecognation  imageurl={this.state.imageurl} />
  


     </div>
  );
}
}
export default App;
