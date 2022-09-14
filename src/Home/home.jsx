import React from "react";
import './home.css';
import { useHistory } from 'react-router-dom';

export default function Home(){ //Homepage
    let history = useHistory(); //To append to search bar
    return (
      <div>
      <h1>CS Visualiser</h1>
      <p className="intro">Welcome to the CS visualiser.<br />This tool is aimed to promote visual learning and hopefully 
        give you a deeper insight into the world of algorithms.<br /> "A picture is worth a thousand words" 
        with that being said enjoy, learn and play around with our application <br></br>
      </p>
      <button onClick={() => {history.push('/pathfinding')}}>Path finding visualizer</button>
      <button onClick={() => {history.push('/sorting')}}>Sorting algorithm visualizer</button>

      </div>
    )

    
}