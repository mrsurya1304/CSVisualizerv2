import React,{ Component } from "react";
import './node.css';

export default class node extends Component {  //A node is a single cell in our grid
    constructor(props){
        super(props);
        this.state={};
    }

    render(){ //All properties of our node
        const {
            col,
            isfinish,   //finish node property
            isstart,    //start node property
            iswall= false,  //wall property
            isvisited = false,  //visited node
            onMouseDown,    //mouse events for walls
            onMouseEnter,
            onMouseUp,
            row,}= this.props;

        const extraClassName = isfinish //finish node
            ? 'node-finish'
            : isstart   //start node
            ? 'node-start'
            : iswall    //node which is a wall
            ? 'node-wall'
            :'';

        return(
            <div 
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row,col)} //To draw walls
                onMouseEnter={() => onMouseEnter(row,col)}
                onMouseUp={() => onMouseUp()}></div>
        );
    }
}
