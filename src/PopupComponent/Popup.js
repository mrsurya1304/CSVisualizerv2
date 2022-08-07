import React from 'react'
import './Popup.css'


function Popup(props) { //To render a popup to display information or a manual to the screen
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={props.handleclose}>
                Close
            </button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Popup