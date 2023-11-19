import React from 'react'
import Doctormapper from './Doctormapper'

function Doctors() {
    let doctors=[{
      name:"Jai",

        years:"100",

        location:[-53,-113],
      description: "hy my name is Jai and im a clicnal physician at uofa "

    },{
        name: "Eryn",
        years: "7",
        location: [-53.2, -113],
      description: "hy my name is xyz and im a doc  at uofa "

        }, {
            name: "Rose",
            years: "7",
            location: [-53.1, -113],
            description:"hy my name is xyz and im a clincial phys at uofa ."
},
       {
        name: " Preet",
        years: "6",
        location: [-53.1, -113],
        description: "hy my name is xyz and im a clincial phys at uofa ."
      }
]
  return (
    <div> 
      <h2 className='doctor-title-main'>Available doctors</h2>
    
    <Doctormapper doctors={doctors}/>
    </div>
  )
}

export default Doctors