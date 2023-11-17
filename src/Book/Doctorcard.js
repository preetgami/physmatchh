import React from 'react'
import "./Maps.css"
import { useState } from 'react'
import Modal from "../shared/UIelemets/Modal"

function Doctorcard(props) {
    const [opendescription, setopendescription] = useState(false)
    const openDesc = () => setopendescription(true);
    const closeDesc = () => setopendescription(false);


    /*book an pointment is here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
    const Bookapt=()=>{
        console.log("bookin");
        setopendescription(false);
    }
    /*book an pointment is here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/



    const foot= <div style={{display:"flex" ,justifyContent:'space-between'}}>
        <button className="doc-button" onClick={closeDesc}>Close</button>
        <button className="doc-button" onClick={Bookapt}>Book a meet</button>
    </div>
    const content = <Modal
        show={opendescription}
        onCancel={closeDesc}
        header={props.name}
        footer={foot}
    >

        <div className='modal-content'>

            
            {props.description}
            
        </div>
    </Modal>
  return (
      <div className='container'>
          {opendescription && content}

          <button className='custom-button' onClick={openDesc}>
              <div className='content'>
                  <h3>Doctor : {props.name}</h3>
                  <p>Years: {props.years}</p>
              </div>
          </button>
      </div>
  )
}

export default Doctorcard