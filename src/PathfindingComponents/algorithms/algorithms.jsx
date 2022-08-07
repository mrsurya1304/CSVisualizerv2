export function dijkstra(grid, startnode, endnode){ //Dijkstras algorithm
    
    const visitednodesinorder=[]; //Array to store visited nodes in order
    if(!startnode || !endnode || startnode===endnode){  //If no start node or no end node or if both are equal we return from the function
        return false;
    }
    startnode.distance=0; //Initialising start node distance to 0
    const unvisitednodes=getnodes(grid); //Getting all nodes from grid and marking as unvisited
    while(!!unvisitednodes.length){
        sortnode(unvisitednodes);   //Sorting unvisited nodes by distance
        const closestnode=unvisitednodes.shift();   //Getting nearest nodes
        
        if(closestnode.iswall) continue;    //If any nearest node is a wall we skip it
        if(closestnode.distance===Infinity) return visitednodesinorder; //If no posibility for path to end node we return the visited nodes

        closestnode.isvisited=true; //Closest nodes are marked as visited
        visitednodesinorder.push(closestnode);//Pushing into our array
        if(closestnode===endnode) return visitednodesinorder; //If we reach the end node we return the visited nodes
        updateneighbors(closestnode,grid);
    }
}

export function astar(grid, startnode, endnode){    //A* algorithm
    const visitednodesinorder=[];   //Array to store visited nodes in order
    const unvisitednodes=[];    ////Array to store unvisited nodes
    if(!startnode || !endnode || startnode===endnode){  //If no start node or no end node or if both are equal we return from the function  
        return false;
    }
    startnode.distance=0;   //Initialising start node distance to 0
    unvisitednodes.push(startnode);

    while(unvisitednodes.length!==0){
        unvisitednodes.sort((a,b)=> a.totaldistance - b.totaldistance); //Sorting unvisited nodes by distance
        let closestnode = unvisitednodes.shift(); //Getting the closest node
        if(closestnode === endnode) return visitednodesinorder; //If the closest node is the end node we return the visited nodes

        closestnode.isvisited = true;   //We mark the closest node as visited
        visitednodesinorder.push(closestnode);      //We push it into the visited nodes array

        let neighbors = getneighbors(closestnode,grid); //Getting neighboring nodes
        for(let neighbor of neighbors){ //For each neighbor
            let distance = closestnode.distance + 1;    //Updating the distance
            if(notinunvisited(neighbor,unvisitednodes)){    //If neighbor is visited
                unvisitednodes.unshift(neighbor);   //Remove from unvisited nodes array
                neighbor.distance = distance;   //Computing the distance
                neighbor.totaldistance = distance + manhattandistance(neighbor, endnode); //Adding the manhattan distance so we can compute which neighbor goes towards the end node 
                neighbor.previousnode = closestnode; //Setting the previous node to our now computed closest node
            }
        }
    }
    return visitednodesinorder;
    
}

function notinunvisited(neighbor, unvisitednodes){ //Method to check if a node is in the unvisited node array
    for(let node of unvisitednodes){
        if(node.row === neighbor.row && node.col === neighbor.col){
            return false
        }
    }
    return true;
}

function manhattandistance(neighbor, endnode)   //Method to compute manhattan distance
{
    let d = Math.abs(endnode.row-neighbor.row)+Math.abs(endnode.col-neighbor.col);
    return d;
}

function sortnode(unvisitednodes){  //Method to sort the nodes according to their distance
    unvisitednodes.sort((nodeA,nodeB) => nodeA.distance - nodeB.distance);
}

function updateneighbors(node, grid){   //Method to update distances and previous node to each neighbor
    const neighbors= getneighbors(node,grid);
    for(const neighbor of neighbors){
        neighbor.distance=node.distance+1;
        neighbor.previousnode=node;
    }
}

function getneighbors(node, grid){  //Method to retrieve neighboring nodes
    const neighbors =[];
    const {col,row}=node;
    if(row>0) neighbors.push(grid[row-1][col]);
    if(row < grid.length-1) neighbors.push(grid[row+1][col]);
    if(col>0) neighbors.push(grid[row][col-1]);
    if(col < grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighbor => !neighbor.isvisited && !neighbor.iswall);
}

function getnodes(grid){    //Method to get an empty grid
    const nodes=[];
    for(const row of grid){
        for(const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getnodesinshortestpath(endnode){    //Method to get the nodes in the shortest path
    const nodesinshortestpath=[];
    let currentnode = endnode;
    while(currentnode !== null){
        nodesinshortestpath.unshift(currentnode);
        currentnode=currentnode.previousnode;
    }
    return nodesinshortestpath;
}