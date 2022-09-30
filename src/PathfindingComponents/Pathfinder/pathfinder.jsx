import React,{ Component } from "react";
import Node from './Node/node';
import './pathfinder.css';
import {dijkstra, astar, getnodesinshortestpath} from '../algorithms/algorithms';
import Popup from "../../PopupComponent/Popup";

const snr= randomint(0,19); //Getting a random start node
const snc=randomint(0,49);
const enr=randomint(0,19);  //Getting a random end node
const enc=randomint(0,49);

var allowwalls = true;
var dijkstravisited= [];  //Dijkstras algorithm visited nodes and shortest path
var dijkstrashortestpath = [];  
var astarvisited = [];  //A* algorithm visited nodes and shortest path
var astarshortestpath = [];

export default class pathfinder extends Component {
    constructor(){
        super();
        this.state={
            grid: [],
            mouseispressed: false,
            popupstate: false,
        };
        
    }

    componentDidMount(){    //Setting grid and getting results of both algorithms after first load
        const grid = getgrid();
        this.setState({grid});
        this.disablebutton('astar');
        this.disablebutton('dijkstra');
        this.disablebutton('clear');
    }

    getresults(grid){   //Method to run algorithms and get visited nodes and shortest path
        const startnode = grid[snr][snc];
        const endnode = grid[enr][enc];

        astarvisited = astar(grid,startnode,endnode);
        astarvisited.push(endnode);
        astarshortestpath = getnodesinshortestpath(endnode);
        dijkstravisited = dijkstra(grid,startnode,endnode);
        dijkstrashortestpath = getnodesinshortestpath(endnode);
    }

    fixwalls(){
        const grid = this.state.grid;
        this.getresults(grid);
        allowwalls = false;
        this.disablebutton('fix');

        document.getElementById('astar').disabled = false;
        document.getElementById('dijkstra').disabled = false;
        document.getElementById('clear').disabled = false;
    }

    cleargrid() //Method to clear the grid (Doesnt clear the wall so algorithms can be compared fairly)
    {
        document.getElementById("dijkstra").disabled = false;
        document.getElementById("astar").disabled = false;
        for(let row=0; row<20;row++){
            for(let col=0; col<50;col++){
                if(document.getElementById(`node-${row}-${col}`).className==='node node-visited' || document.getElementById(`node-${row}-${col}`).className==='node node-shortestpath'){
                    document.getElementById(`node-${row}-${col}`).className='node';
                }
            }
        }
    }

    disablebutton(buttonid) //Method to disable a button by its id
    {
        document.getElementById(buttonid).disabled = true;
    }

    handlemousedown(row,col){   //Method to handle mouse click
        if(allowwalls){
            const newgrid = gridwithwalltoggled(this.state.grid,row,col);
            this.setState({grid: newgrid, mouseispressed: true});
        }
    }

    handlemouseenter(row,col){  //Method to draw wall when mouse is over a node
        if(!this.state.mouseispressed || !allowwalls) return;
        const newgrid = gridwithwalltoggled(this.state.grid,row,col);
        this.setState({grid: newgrid});
    }

    handlemouseup() //Method to handle after mouse click
    {
        this.setState({mouseispressed: false});
    }

    changestate =() =>  //Method to handle the closing of a popup
    {
        this.setState({popupstate: !this.state.popupstate});
    }

    animate(visitednodesinorder,nodesinshortestpath){   //Method to animate visited nodes in order and shortest path
        for(let i=1; i<=visitednodesinorder.length-1;i++){
            if(i=== visitednodesinorder.length-1){//After visited nodes in order animation
                setTimeout(() => {  //Shortest path animation with timeout of 10 * index
                    this.animateshortestpath(nodesinshortestpath);
                },20*i)
                return;
            }
            setTimeout(() => {  //Visited nodes animation with timeout of 50 * index
                const node=visitednodesinorder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
            }, i*20);
        }
    }

    animateshortestpath(nodesinshortestpath){   //Method to animate the shortest path (Backtracking)
        for(let i=1; i<nodesinshortestpath.length-1;i++){
            setTimeout(() => {//Shortest path nodes set to a different classname to give different styling
                const node= nodesinshortestpath[i];
                document.getElementById(`node-${node.row}-${node.col}`).className='node node-shortestpath';
            }, 50*i);
        }
    }

    visualizedijkstra(){    //Method to visualize Dijkstra's algorithm
        this.disablebutton('astar');    //Disabling buttons
        this.disablebutton('dijkstra');
        this.disablebutton('clear');

        this.animate(dijkstravisited,dijkstrashortestpath); //Animating visited nodes and shortest path

        document.getElementById('dijkstravisited').innerHTML = dijkstravisited.length-2;    //Setting no of nodes visited and no of nodes in shortest path onto the screen
        document.getElementById('sizeofpath').innerHTML = dijkstrashortestpath.length-2;

        setTimeout(function () { document.getElementById("clear").disabled = false; }, ((dijkstravisited.length)*20+(dijkstrashortestpath.length)*50)); //Enabling the clear grid button after all animations
    }

    visualizeastar(){   //Method to visualize A* algorithm

        this.disablebutton('dijkstra'); //Disabling buttons
        this.disablebutton('astar');
        this.disablebutton('clear');

        this.animate(astarvisited,astarshortestpath);   //Animating visited nodes and shortest path

        document.getElementById('astarvisited').innerHTML = astarvisited.length-2;  //Setting no of nodes visited and no of nodes in shortest path onto the screen
        document.getElementById('sizeofpath').innerHTML = astarshortestpath.length-2;
        
        setTimeout(function () { document.getElementById("clear").disabled = false; }, ((astarvisited.length)*20+(astarshortestpath.length)*50));//Enabling the clear grid button after all animations
    }

    render(){
        const {grid, mouseispressed, popupstate}= this.state; //Setting initial states

        return( //Grid with random start and end node and buttons for resetting, clearing, manuals and algorithms
                //We also have ability to draw walls
                //There are also metrics for the algorithms in the bottom
          <>
            <div className="grid">
                <h2>Pathfinding Visualizer<br></br></h2>
                {grid.map((row,rowidx)=> {
                    return (
                        <div key={rowidx}>
                        {row.map((node,nodeidx)=>{
                            const {row,col,isfinish, isstart,iswall,isvisited}=node;
                            return (    //Single node in grid with all its properties
                            <Node
                                key={nodeidx}
                                col={col}
                                isfinish={isfinish}
                                isvisited={isvisited}
                                isstart={isstart}
                                iswall={iswall}
                                mouseispressed={mouseispressed}
                                popupstate={popupstate}
                                onMouseDown={(row,col)=> this.handlemousedown(row,col)}
                                onMouseEnter={(row,col)=> this.handlemouseenter(row,col)}
                                onMouseUp= {()=> this.handlemouseup()}
                                row={row}
                            ></Node>
                        );
                        })}
                    </div>
                    );
                })}
            </div>
            <br></br>
            <button id="fix" title="Fix walls" onClick={()=> this.fixwalls()}>Fix walls</button>
            <button id="dijkstra" title="Dijkstra's Algorithm" onClick={() => this.visualizedijkstra()}>
                Dijkstra's Algorithm
            </button>
            <button id="astar" title="A* Algorithm" onClick={() => this.visualizeastar()}>
                A* Algorithm
            </button>
            <button id="clear" title="Clear grid" onClick={this.cleargrid}>Clear grid</button>
            <button id="reset" title="Reset grid" onClick={() => window.location.reload(false)}>Reset grid</button>
            <button id="man" title="User manual" onClick={this.changestate}>User manual</button>

            <div className='sorting-metrics'>
                    <table cellPadding={10}>
                        <tr>
                            <th>Dijkstra's</th>
                            <td>Nodes visited:  </td><br/><br/>
                            <td id='dijkstravisited'></td><br/><br/>
                        </tr>
                        <tr>
                            <th>A*</th>
                            <td>Nodes visited: </td><br/><br/>
                            <td id='astarvisited'></td><br/><br/>
                        </tr>
                        <tr>
                            <th></th>
                            <td>Nodes in shortest path: </td>
                            <td id="sizeofpath"></td>
                        </tr>
                    </table>
                </div>

            {this.state.popupstate ? //Popup for the user manual
            <Popup trigger={popupstate} handleclose = {this.changestate}>
                <div className="pathfindingpopup">
                <h2>Path finding visualizer tutorial</h2>
                <p>Welcome, This is the path finding visualizer.<br></br>
                The start node is highlighted in green.<br></br>
                The end node is highlighted in red.<br></br>
                You have a button to reset the grid which generates random start and end nodes.<br></br>
                There is also a button to clear the grid which erases everything apart from the walls so you can compare algorithms.<br/>
                You have the ability to draw walls which turns nodes black (optional).<br />
                We cant pass through walls.<br />
                Once you are done drawing the walls click the fix walls button to enable the algorithm buttons.<br />
                You have algorithm buttons when clicked tries to find the shortest path to the end node.<br></br>
                When clicked the nodes that the algorithm visits are colored brown.<br></br>
                The shortest path is colored yellow.<br></br>
                Observe and learn how each algorithm computes the shortest path.<br></br>Enjoy
                </p>
                </div>
            </Popup>
            :null}
            </>
        );
    }
}

const getgrid=() => {   //Method to get a new empty grid
    const grid=[];
    for(let row=0; row<20;row++){
        const currentrow=[];
        for(let col=0;col<50;col++){
            currentrow.push(createnode(col,row));
        }
        grid.push(currentrow);
    }
    return grid;
};

const createnode =(col,row) =>{ //Method to create a single node with the required properties
    return{
        col,
        row,
        isstart: row===snr && col===snc,
        isfinish: row===enr && col===enc,
        distance: Infinity,
        totaldistance: Infinity,
        isshortest: false,
        isvisited: false,
        iswall: false,
        previousnode: null,
        
    };
};

function randomint(min, max)    //Method to get a random value within a range
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

const gridwithwalltoggled=(grid,row,col)=> {    //Method to get a grid with walls drawm
    const newgrid = grid.slice();
    const node= newgrid[row][col];
    const newnode= {
        ...node,
        iswall: !node.iswall,
    };
    newgrid[row][col]=newnode;
    return newgrid;
};