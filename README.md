# CS Visualizer
## Description
An algorithm visualizer made in React js which attempts to show how various algorithms across Computer Science and related domains work internally. It brings in clarity of what an algorithm does internally using visualizations and animations. This project aims to help students struggling to understand how complex algorithms really work. 

## How to run on a computer from Github
1. Create a folder in a path convinient to you
2. Git bash into the folder you created (You can also use command prompt or powershell) and change directory to your folder
3. Copy the repository link from Github under the Code section
4. Type the command git clone https://github.com/mrsurya1304/CSVisualizerv2.git and hit enter
5. Check that the repository has been cloned on the folder you created
6. Open Visual Studio Code
7. Click on File -> Open Folder -> Your cloned repository folder -> CSVisualizerV2 and click select folder
8. Click on Terminal -> New terminal to launch a new terminal and type the command npm i
9. Type the command npm start to start the app

CSVisualizer loads up and will be ready to use Enjoy

## How to use CSVisualizer
- Entering the app you will be greeted with ah home page, a welcome message and various topics you may be interested in
- You can click a topic (Example : Pathfinding algorithms) which leads you to a page consisting of prevelent algorithms from that topic which you may visualize
- Each topic's page has a user manual to help you use the page and visualize algorithms
- There may also be metrics calculated from the algorithm execution which you may use to compare the various algorithms and gain deeper insights on the topic you chose

## Features of CSVisualizer
There are two topics with 2 algorithms each which have been developed and is ready for use

### Pathfinding Visualizer
- Consists of a grid of nodes with a start node and end node selected at random while loading
- Ability to draw walls by dragging mouse across nodes in a grid turning them into walls (black). During shortest path computation the path cant pass through walls
- Ability to reset grid which picks a new set of start and end node and erases any walls
- 2 Algorithm buttons to compute shortest path
  1. Dijkstra's Algorithm
  2. A* algorithm
- We also have metrics like number of nodes visited and number of nodes in the shortest path
- There is also a button to clear grid which wipes out any shortest path computation so you can compare algorithms on the same start, end nodes and walls

### Sorting Visualizer
- We have various bars of random sizes arranged next to each other which constitutes an array with random numbers. (The numbers may even be equal).
- There is a button to reset the array which gives another array of bars of random varying heights
- There are 2 algorithm buttons to sort the elements (bars) in ascending order
  1. Bubble Sort
  2. Mergesort
- There are metrics like number of comparisons and number of swaps which can be used to calculate complexity
- There is also a button to get original array which reverts the sorting operation to get the array you initially had which can be used to compare algorithms.

## Concepts used in CSVisualizer

## How the app looks like

## Demo

## Link to use CSVisualizer

## Future ideas

## Acknowledgements
