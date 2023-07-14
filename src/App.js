
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
import Signin from './components/sign in/signin';
import Regsiter from './components/Register/Register';
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
      box :{},
      route: "home",
      issignedin:false,
      user:{
        id :  "",
        name : '',
        email: '',
        entires : 0,
        joined :""

        
      }
    }

}
loaduser=(data)=>{
  this.setState({user:{
    id :  data.id,
    name : data.name,
    email: data.email,
    entires : data.entires,
    joined :  data.joined
}})

}
// componentDidMount(){
// fetch('http://localhost:3000/')
// .then(response=>response.json())
// .then(console.log)
// }
  

 calculatefacelocation = (data)=>{
  const Clarifaiface= data.outputs[0].data.regions[0].region_info.bounding_box
  ;
  const image = document.getElementById("inputimage") ;
  const width = Number(image.width)
  const height = Number(image.height)
 return {

  leftCol:Clarifaiface.left_col * width ,
  topRow : Clarifaiface.top_row * height,
  rightCol: width - ( Clarifaiface.right_col*width),
  bottomRow :height - (Clarifaiface.bottom_row*height)


 }

  }   
  displayFaceBox =(box)=>{
    this.setState({box:box})
    console.log("box",box);
  }

OnInputChange = (event) =>{
  this.setState({input: event.target.value});

  }
  OnButtonSubmit=()=>{
this.setState({imageurl:this.state.input})

  
   
  fetch(
    "https://api.clarifai.com/v2/models/" + "face-detection/outputs", 
  returnclarfiajsonRequestopition(this.state.input))
  .then(response => response.json())
   .then(respone=>{
    console.log( 'HI ' ,respone)
    // if(respone) {
    //   fetch ("https:/localhost:3000/image", {
    //     method:"put",
    //     headers:{'content-Type':'application/json'},
    //     body: JSON.stringify({
    //         id: this.state.user.id
    //     })

    //   })
    
    //   .then(respone=>respone.JSON)
    //   .then(count=>{
    //  this.setState(Object.assign( this.state.user , {entries :count}))
    //   })
    // }
    this.displayFaceBox(this.calculatefacelocation(respone))
    })
  .catch(err=> console.log(err))
  }

  onRouteChange =(route)=>{
    if(route==="signout"){
      this.setState({issignedin:false})
    } else if (route === "home")  {
      this.setState({issignedin : true});
    }
    this.setState({route : route})
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
       console.log(this.state)
       

  return (
    <div className="App">
       <ParticlesBg  color="#ffffff"  type="cobweb" bg={true} config={config} />


      <Navigation  issignedin={this.state.issignedin} onRouteChange={this.onRouteChange} />
      {this.state.route === "home" ?  <div> <Logo />
      <Rank />
      <Imagelinkform  OnInputChange={this.OnInputChange}  OnButtonSubmit={this.OnButtonSubmit} />
      <Facerecognation box={this.state.box} imageurl={this.state.imageurl} />
  </div> :
          (  this.state.route==="signin"
           ?   <Signin onsubmitsignin={this.onsubmitsignin} onRouteChange={this.onRouteChange} />
            :   <Regsiter loaduser={this.loaduser} onRouteChange={this.onRouteChange} /> )
     
      
    
      }


     </div>
  );
}
}
export default App;
