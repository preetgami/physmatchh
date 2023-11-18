import React from 'react'
import "./Onboard.css"
import Button from "../shared/formsElement/Button"
import Modal from '../shared/UIelemets/Modal'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
function OnboardCard(props) {
  const [opendescription, setopendescription] = useState(false)
  const closeDesc = () => setopendescription(false);

  const foot = <div style={{ display: "flex", justifyContent: 'space-between' }}>
    <button className="doc-button" onClick={closeDesc}>Close</button>
  </div>
  const openEmotion = () => {
    console.log("openEmotions");
    setopendescription(true);
    fetchData()

  }

  const[data,setData]=useState();
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  console.log(data)
  let emoji = null;
  let text=""
  if (data) {
    if (data.predictions[0] === 1) {
      text = "happy"

      emoji = <div><iframe src="https://giphy.com/embed/chzz1FQgqhytWRWbp3" width="300" height="300"  class="giphy-embed" allowFullScreen></iframe></div>; // Happy emoji
    } else if (data.predictions[0] === -1) {
      text="sad"
      emoji = emoji = <div><iframe src="https://giphy.com/embed/OPU6wzx8JrHna" width="300" height="300" class="giphy-embed" allowFullScreen></iframe></div>; // Sad emoji
    } else if (data.predictions[0] === 0) {
      text="calm"
      emoji = <div><iframe src="https://giphy.com/embed/8ccXcA74ufMBQAR2oq" width="300" height="300" class="giphy-embed" allowFullScreen></iframe></div>; // Neutral emoji
    } else {
      emoji = emoji = <div><iframe src="https://giphy.com/embed/uIJBFZoOaifHf52MER" width="300" height="300" class="giphy-embed" allowFullScreen></iframe></div>;// Loading emoji (Hourglass with Flowing Sand)
    }
  } else {
    emoji = emoji = <div><iframe src="https://giphy.com/embed/uIJBFZoOaifHf52MER" width="300" height="300" class="giphy-embed" allowFullScreen></iframe></div>;// Default emoji if data is not available
  }
  const content = <Modal
    show={opendescription}
    onCancel={closeDesc}
    header="Your current meeting"
    footer={foot}
  > 

    

    <div className='modal-content'>

      
      Your client is currently feeling: <span style={{ fontWeight: 'bold' }}>{text}</span>
      <div style={{ textAlign: 'center' }}>
        {emoji}
      </div>
    </div>
  </Modal>
    console.log(props.name)
  return (
    <div>
       { content}
    <div className='onboardcards'>

          <div className="card-onb">
          <h2>{props.name}</h2>
          <p>Email: {props.email}</p>
          <p>Phone: {props.phone}</p>
          <p>Requested: {props.requested}</p>
          <button className="onboardbutton" onClick={openEmotion} >
                  Start
              </button>
      </div>
          
      </div>
    </div>


  )
}


export default OnboardCard;