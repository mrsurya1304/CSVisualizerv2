export function bubbleSort(array){
    var swaps = 0;  //No of swaps
    var comparisons = 0;  //No of comparisons

    const animations = [];  //Animations array
    if(array.length<=1)return array;  //Single element array doesnt need to be sorted

    for(let i=0 ; i<array.length; i++){ //Bubble sort
        for(let j=0; j<array.length-i-1; j++){
            animations.push([j,j+1]);   //Comparison animations
            animations.push([j,j+1]);
            comparisons ++;

            if(array[j]>array[j+1]){ //Sorting along with animation
                animations.push([j,j+1]);
                swaps++;

                const temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
            else{
                animations.push([j,j]);
            }
        } 
    }

    animations[-2] = comparisons;   //Pushing comparisons and swaps towards the end of the array
    animations[-1] = swaps;
    return animations;
}
