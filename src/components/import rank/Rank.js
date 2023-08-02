import React from "react";




const Rank =( {name ,entires})=>{

    
//     const object1 = entires

//    for (const [entires, count] of Object.entries(object1)) {
//     console.log(`${entires}: ${count}`)}

    return (
        <div >

 
  <div className="white f1"       >  {`${name},  your current entry count is ....`}</div>
  
      <div className="white f3">
    {entires}
    
    </div>

    </div>
  
)
}
export default Rank ;