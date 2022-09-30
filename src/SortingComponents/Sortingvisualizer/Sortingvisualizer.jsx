import React from 'react'; //imports
import './Sortingvisualizer.css';
import {mergeSort} from '../Algorithm-files/mergesort'; 
import { bubbleSort } from '../Algorithm-files/bubblesort';
import Popup from '../../PopupComponent/Popup';
var bubblesorted = 0;
var mergesorted = 0;

export default class Sortingvis extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array:[],           //main array of bars
            duparray:[],        //Duplicate array to revert changes
            popupstate:false,   //the state of our popup for the user manual
        };
    }

    componentDidMount(){
        this.resetArray(); //Generating a new array for first time load
        document.getElementById('ogarr').disabled = true; //Disabling the get original array button initially
    }

    getoriginalArray() //Method to get the original unsorted array and render onto the screen
    {
        if(mergesorted === 1)   //If we have already used mergesort we are only allowed to bubble sort
            document.getElementById("bbsort").disabled = false;

        if(bubblesorted === 1)  //If we have already used bubble sort we are only allowed to use mergesort
            document.getElementById("mesort").disabled = false;
        
       const array = this.state.duparray;   //Changing state of sorted array to our original unsorted array
       var style,height; //Rendering onto screen by setting the appropriate height in the style component
       this.setState({array:array});
       const arraybars= document.getElementsByClassName("array-bar");
       for(let i=0;i<180;i++){
           style = arraybars[i].style;
           height = array[i];
           style.height= `${height/8.5}vh`;
       }

    }

    resetArray() //Method to create array of 180 bars with random sizes between range 5-550 pixels
    {
        const array =[];
        var duparray = []; //To revert back any changes made from swapping
        for(let i=0;i<180;i++)
        {
            var num = randomint(5,550);
            array.push(num);
            duparray.push(num)
        }
        this.setState({array:array,duparray:duparray}); //Setting the state to the created array
    }


    changestate =() => //Method to change the state of the user manual popup
    {
        this.setState({popupstate: !this.state.popupstate});
    }

    disablebutton(buttonid) //Method to disable a button by its id
    {
        document.getElementById(buttonid).disabled = true;
    }
    
    mergeSort(){

    this.disablebutton('mesort');   //Disabling buttons during sorting
    this.disablebutton('bbsort');
    this.disablebutton('ogarr');
    this.disablebutton('man');


    const animations = mergeSort(this.state.array);  //Getting an sorted array of animations

    document.getElementById('mscomp').innerHTML = animations[-2]; //Setting no of comparisons and swaps
    document.getElementById('msswap').innerHTML = "NIL";

    if(mergesorted !==1 && bubblesorted!==1) //Enabling buttons after the completion of the animations
        setTimeout(function () { document.getElementById("ogarr").disabled = false; }, (animations.length-2)*7);
    setTimeout(function () { document.getElementById("man").disabled = false; }, (animations.length-2)*7);
    

    mergesorted = 1; //Indicates mergesort has been performed

    //The animations are in triplets 1- Comparison 2-Turn off previous animation 3-Swap

    for(let i=0; i<animations.length-2; i++){  //Iterating through animation array
        const arraybars= document.getElementsByClassName("array-bar");
        const colorchange = i%3 !==2; //If we are not required to swap (compsrison)
        
        if(colorchange){
            const[bar1idx, bar2idx]= animations[i];
            const bar1style= arraybars[bar1idx].style;
            const bar2style= arraybars[bar2idx].style;
            const color= i%3===0 ? 'red': 'black';  //Logic to change first animation to a different color then back
            setTimeout(() => {  //Changing color with a timout decided based on the index (No swap)
                bar1style.backgroundColor = color;
                bar2style.backgroundColor = color;
            } ,i * 7)
        }
        else    //Swapping logic with a timeout based on index
        {
            setTimeout(() => {
                const [bar1idx, height] = animations[i];
                const bar1style= arraybars[bar1idx].style;
                bar1style.height= `${height/8.5}vh`;
            }, i * 7);
        }
    }

   }

    bubbleSort() {
        
        this.disablebutton('mesort');   //Disabling buttons during sorting
        this.disablebutton('bbsort');
        this.disablebutton('ogarr');
        this.disablebutton('man');
    
        const animations = bubbleSort(this.state.array); //Getting an sorted array of animations

        document.getElementById('bscomp').innerHTML = animations[-2];   //Setting no of comparisons and swaps
        document.getElementById('bsswap').innerHTML = animations[-1];


        if(mergesorted !==1 && bubblesorted!==1)    //Enabling buttons after the completion of the animations
            setTimeout(function () { document.getElementById("ogarr").disabled = false; }, (animations.length-2)*3);
        setTimeout(function () { document.getElementById("man").disabled = false; }, (animations.length-2)*3);


        bubblesorted = 1 //Indicates bubble sort has been performed
        
        //The animations are in triplets 1- Comparison 2-Turn off previous animation 3-Swap
        //The last two elements contain the number of comparisons and swaps

        for(let i=0;i<animations.length-2; i++){  //Iterating through animation array
            const arraybars= document.getElementsByClassName("array-bar");
            const colorchange = i%3!==2;//If we are not required to swap

            if(colorchange){
                const[bar1idx, bar2idx]= animations[i];
                const bar1style= arraybars[bar1idx].style;
                const bar2style= arraybars[bar2idx].style;
                const color = i%3 === 0? 'red': 'black';    //Logic to change first animation to a different color then back
                setTimeout(() => {  //Changing color with a timout decided based on the index (No swap)
                    bar1style.backgroundColor = color;
                    bar2style.backgroundColor = color;
                } ,i * 3);
            }
            else{   //Swapping logic with a timeout based on index
                const[bar1idx, bar2idx]= animations[i];
                const bar1style= arraybars[bar1idx].style;
                const bar2style= arraybars[bar2idx].style;
                if(bar1idx!==bar2idx){  //If compared values are different
                    setTimeout(() => {  //Changing the heights of the bars to show they are sorted
                        const tempheight = bar1style.height;
                        bar1style.height= bar2style.height;
                        bar2style.height= tempheight;
                    }, i * 3);
                }
                else{
                    continue;
                }
            }
    }
}

render() {
        const {array,duparray,popupstate}= this.state;   //setting initial states

        return (
            <div className="array-container">
                <div className='array'>
                <h2>Sorting Visualizer<br></br></h2>
                {array.map((value,idx) =>(      //Mapping the generated random array values onto the screen
                    <div 
                     className="array-bar"
                     key={idx} 
                     style={{       //Styles to create the bars
                        backgroundColor: 'black',
                        height: `${value/8.5}vh` ,
                        }}></div>
                
                ))} 
                </div>
                
                <br></br><br></br>
                <button id='bbsort' onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button id='mesort' onClick={() => this.mergeSort()}>Merge Sort</button>
                <button id='ogarr' onClick={()=> this.getoriginalArray()}>Get Original Array</button>
                <button id='reset' onClick={() => window.location.reload(false)}>Reset Array</button>
                <button id='man' onClick={this.changestate}>User manual</button>

                <br/><br/>
                <div className='sorting-metrics'>
                    <table cellPadding={10}>
                        <tr>
                            <th>Bubble Sort</th>
                            <td>Comparisons: </td><br/><br/>
                            <td id='bscomp'></td><br/><br/>
                            <td>Swaps: </td><br/><br/>
                            <td id='bsswap'></td><br/><br/>
                        </tr>
                        <tr>
                            <th>Merge Sort</th>
                            <td>Comparisons: </td><br/><br/>
                            <td id='mscomp'></td><br/><br/>
                            <td>Swaps: </td><br/><br/>
                            <td id='msswap'></td><br/><br/>
                        </tr>
                    </table>
                </div>
                
                {this.state.popupstate ?        //Popup for the user manual
                <Popup trigger={popupstate} handleclose = {this.changestate}>
                    <div className='sortingpopup'>
                    <h2>Sorting Visualizer Manual</h2>
                    <p>Welcome, This is the sorting visualizer.<br></br>
                    You have bars of various heights covering your screen.<br></br>
                    They can be seen as an array with different numbers in them.<br></br>
                    By clicking the Reset Array button you can generate a new random combination of bars.<br></br>
                    Get Original Array button reverts to the original unsorted array so you can visualize and compare other algorithms on the same array.<br/>
                    When you click any of the algorithm buttons you see how the algorithm works visually.<br></br>
                    The bars arrange themselves in sorted order by using the algorihm you picked.<br></br>
                    Observe and learn how each algorithm works in depth.<br></br>Enjoy</p>
                    </div>
                </Popup>
                :null}
                
            </div>
        );
    }
}

function randomint(min, max)  //Method to generate a random integer within an interval
{
    return Math.floor(Math.random()*(max-min+1)+min);
}