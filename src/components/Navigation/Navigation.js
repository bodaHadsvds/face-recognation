import React from "react";
import './Navigation.css'
// import Signin from "../sign in/signin";


const Navigation =({onRouteChange ,issignedin})=>{
    if(issignedin ){
        return(
            <nav style={{display: 'flex',justifyContent:'flex-end'}}>
    <p  onClick={()=> onRouteChange("signout")} className="f3 link dim purple  pa3  shadow-1 pointer"> signout </p>   </nav>

);
        
    } else {
        return(        <nav style={{display:"flex",justifyContent:"flex-end"}}>
        <p onClick={()=> onRouteChange("signin")} className="f3 link dim purple  pa3  shadow-1 pointer">signin</p>
        <p onClick={()=> onRouteChange("Register")} className="f3 link dim purple  pa3  shadow-1 pointer">Register</p>
        
               </nav> )

       
    }
    


}

export default Navigation ;

