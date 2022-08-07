export function mergeSort(array){
    const animations =[];  //array to store animations
    if(array.length <=1) return array;  //single element arrays dont need to be sorted
    const auxarray= array.slice();  //Auxilliary array to do the sorting operations
    mergeSortHelper(array,0,array.length-1,auxarray,animations);
    return animations; //Returning the animation array for rendering
}

function mergeSortHelper( //Method to split the array recursively through the middle
    mainarray,
    startidx,
    endidx,
    auxarray,
    animations,
){
    if(startidx=== endidx) return;
    const mididx= Math.floor((startidx+endidx)/2);
    mergeSortHelper(auxarray,startidx,mididx,mainarray,animations);
    mergeSortHelper(auxarray,mididx + 1,endidx,mainarray,animations);
    domerge(mainarray,startidx,mididx,endidx,auxarray,animations);
    
}

function domerge( //Method to sort the splitted arrays and merge them in sorted order
    mainarray,
    startidx,
    mididx,
    endidx,
    auxarray,
    animations,
){
    let i=startidx;
    let j=mididx+1;
    let k=startidx;
    var comparisons = 0;  //No of comparisons

    while(i<= mididx && j<=endidx){ //Comparing elements in the split arrays along with animation
        animations.push([i,j]);
        animations.push([i,j]);
        comparisons++;

        if(auxarray[i]<= auxarray[j]){  //Sorting the elements in the split arrays along with animation
            animations.push([k, auxarray[i]]);
            mainarray[k++]=auxarray[i++];
        }
        else{
            animations.push([k, auxarray[j]]);
            mainarray[k++]=auxarray[j++];
        }
    }

    //Merging the arrays
    while(i<=mididx){
        animations.push([i,i]);
        animations.push([i,i]);
        comparisons++;

        animations.push([k, auxarray[i]]);
        mainarray[k++]=auxarray[i++];
    }

    while(j<=endidx){
        animations.push([j,j]);
        animations.push([j,j]);
        comparisons++;

        animations.push([k, auxarray[j]])
        mainarray[k++]= auxarray[j++];
    }

    animations[-2] = comparisons;   //Pushing comparisons and swaps towards the end of the array
                                    //Remember there are no swaps in mergesort only overwriting
}

