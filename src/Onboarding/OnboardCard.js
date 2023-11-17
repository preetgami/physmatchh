import React from 'react'
import "./Onboard.css"
import Button from "../shared/formsElement/Button"
function OnboardCard(props) {
    console.log(props.name)
  return (
    <div className='onboardcards'>

          <div className="card-onb">
          <h2>{props.name}</h2>
          <p>Email: {props.email}</p>
          <p>Phone: {props.phone}</p>
          <p>Requested: {props.requested}</p>
              <button className="onboardbutton">
                  Start
              </button>
      </div>
          
      </div>

  )
}

export default OnboardCard