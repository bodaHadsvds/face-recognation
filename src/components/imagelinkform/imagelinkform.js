import React from "react";
import './imagelinkform.css';



const Imagelinkform =({OnInputChange, OnButtonSubmit})=>{
    return (
        <div>
        <p className="f4 fw5 b">
            {'This magic Brain will detect faces in your pictures . Give it a try !'}
         </p>
         <div className="center"> 
         <div className=" Form center pa4 br3 shadow-5">
         <input  className="f4 pa2 w-70 center " type="tex" onChange={OnInputChange} />
         <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple "
         onClick={ OnButtonSubmit}> Detect </button>
         </div>
         </div>
        </div>
    )
}
export default Imagelinkform ;